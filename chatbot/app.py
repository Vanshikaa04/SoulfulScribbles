from dotenv import load_dotenv
from fastapi import HTTPException,FastAPI,Query
import os
import uvicorn

from pydantic import BaseModel
from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_huggingface import HuggingFaceEmbeddings, HuggingFaceEndpoint
from langchain_openai import ChatOpenAI
from langchain.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()

app = FastAPI()

origins = [
    "http://localhost:5173",  
    "https://www.soulfulscribble.in/",
   " https://soulfulscribblechatbot.vercel.app/",
    "http://localhost", 
    "http://127.0.0.1", 
    "https://soulful-scribbles-backend.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,  
    allow_methods=["*"],      
    allow_headers=["*"],
)

FAISS_DB_DIR = "faiss_indexes"
# AUDIO_OUTPUT_FOLDER = "audio_responses"
os.makedirs(FAISS_DB_DIR, exist_ok= True)
# os.makedirs(AUDIO_OUTPUT_FOLDER, exist_ok=True)

ELEVENLABS_API_KEY = os.environ.get("ELEVENLABS_API_KEY")


embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

llm_model = HuggingFaceEndpoint(
    repo_id="mistralai/Mistral-7B-Instruct-v0.3",
        temperature=0.5,
        model_kwargs={
            "max_length":"512"
        },
        task="text-generation",
        huggingfacehub_api_token=os.environ.get("HUGGINGFACEHUB_API_TOKEN")
)

# llm_model2 = ChatOpenAI(model="gpt-3.5-turbo")

# Prompt Template
prompt_template = """
You are an expert in handcrafted art and business. Use the following context to provide relevant answers about Soulful Scribbles. 
Base your response **only on the provided context** and do not generate information outside of it.

### Context:
{context}

### Question:
{question}

### Response:
"""

prompt = PromptTemplate(
    template=prompt_template,
    input_variables=["context","question"]
)

def load_faiss_embeddings():
    print(FAISS_DB_DIR + " in load faiss embeddings")
    if os.path.exists(FAISS_DB_DIR):
        return FAISS.load_local(FAISS_DB_DIR, embedding_model, allow_dangerous_deserialization=True)
    return None

def create_memory():
    print("In create memory!")
    loader = PyPDFLoader('Soulful-Scribbles.pdf')
    documents = loader.load()

    print("Length of PDF is ",len(documents))

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size = 1000,
        chunk_overlap = 200
    )
    final_documents = text_splitter.split_documents(documents)

    vector_store = FAISS.from_documents(
        final_documents,embedding_model
    )

    vector_store.save_local(FAISS_DB_DIR)
    print("Vector Store Created!")

class QueryRequest(BaseModel):
    question : str

@app.post("/query")
def get_answer(query_request : QueryRequest):
    print("in query")
    print(query_request)

    vector_store = load_faiss_embeddings()

    if vector_store is None:
        print("Failed Fetching Embeddings of pdf!")
        return None
    
    retriever = vector_store.as_retriever(
        search_type = "similarity",
        search_kwargs = {
            "k":3
        }
    )

    retrieverQA = RetrievalQA.from_chain_type(
        llm = llm_model,
        chain_type = "stuff",
        retriever = retriever,
        return_source_documents = True,
        chain_type_kwargs = {
            "prompt": prompt
        }
    )

    result = retrieverQA.invoke({"query": query_request.question})
    
    answer = result["result"]
    
    print("Question =", query_request.question)
    print("Answer = ", answer)

    return {
        "answer": answer
    }


# Run FastAPI Server
# if __name__ == "__main__":
#     uvicorn.run("app:app", host="localhost", port=8089, reload=True)

# create_memory()
# get_answer("Give me some ideas for customizable gifts.")