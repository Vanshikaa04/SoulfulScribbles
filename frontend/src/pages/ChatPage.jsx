// import { useState, useRef, useEffect, useContext } from "react";
// import axios from "axios";
// import Title from "../components/Title";
// import { Button, Card, Container } from "react-bootstrap";
// import { IoIosSend } from "react-icons/io";
// import { ShopContext } from "../context/ShopContext";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function ChatPage() {
//   const {token}= useContext(ShopContext)
//   const navigate= useNavigate();
//   const [question, setQuestion] = useState("");
//   const [messages, setMessages] = useState(()=>{
//   const saved = localStorage.getItem("chat_messages");
//   return saved ? JSON.parse(saved) : [];
// });
//   const [loading, setLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const askQuestion = async () => {
//     if (!question.trim()) return;

//     const userMessage = { sender: "user", text: question };
//     const typingMsg = { sender: "bot", text: "Typing...", temp: true };

//     setMessages((prev) => [...prev, userMessage,typingMsg]);
//     setQuestion("");
//     setLoading(true);

//     try {


//       const res = await axios.post("http://localhost:8089/query", { question });
//       const botMessage = { sender: "bot", text: res.data.answer };

//        // Remove typing and add real message
//        setMessages((prev) => {
//         const updated = [...prev.filter((m) => !m.temp), botMessage];
//         localStorage.setItem("chat_messages", JSON.stringify(updated));
//         return updated;
//       });
//     //   setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error(error);
//       const errorMsg = {
//         sender: "bot",
//         text: "Oops! Something went wrong. Please try again.",  
//       };
//       setMessages((prev) => {
//         const updated = [...prev.filter((m) => !m.temp), errorMsg];
//         localStorage.setItem("chat_messages", JSON.stringify(updated));
//         return updated;
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearChat = () => {

//     localStorage.removeItem("chat_messages");
//     setMessages([
//       {
//         sender: "bot",
//         text: "Hi! How can I help you today?",
//       },
//     ]);
//   };
//   useEffect(() => {
//     if(token) {
//       clearChat();
//     if (messages.length === 0) {
//       const welcomeMsg = {
//         sender: "bot",
//         text: "Hi! How can I help you today?",
//       };
//       setMessages([welcomeMsg]);
//     }
//   }
//   else{
//     navigate("/login");
//     toast.error("You Are Not Logged In!");
//   }
//   }, [token]);
 
//   useEffect(() => {
//     console.log("Updated messages:", messages);
//   }, [messages]);
  

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) {   
//       e.preventDefault();
//       askQuestion();
//     }
//   };

//   return (
// <>
//     <Title text1="Your" text2="Chat Assistant" />

//     <div className="flex flex-col h-screen bg-gray-100  justify-content-center " style={{ position: "relative", minHeight:"50vh"}}>

//   {/* Chat History Area */}
//   <Container
//     className="overflow-y-auto px-4 py-6  my-3 h-fitcontent "
//     style={{ minHeight: "50vh",height:"fit-content", scrollBehavior: "smooth", marginBottom:"30rem" ,scrollbarColor:"black"}}
//   >
//     {messages.map((msg, index) => (
//       <div
//         key={index}
//         className={`flex mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
//       >
//         <div
//           style={{
//             width:"fit-content",
//             backgroundColor: msg.sender === "user" ? "#2563EB" : "#ffffff", // Tailwind blue-600
//             color: msg.sender === "user" ? "#ffffff" : "#1f2937", // Tailwind gray-900
//             borderRadius: "1rem",
//             padding: "0.75rem 1rem",
//             maxWidth: "75%",
//             boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
//             alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
//             // position:"absolute",
//             // right:msg.sender === "user" ? "0" : "100px",
//             marginBottom: "1rem"
//           }}
//         >
//           {msg.text.split('\n').map((line, i) => (
//   <p key={i} style={{ margin: 0 }}>{line}</p>
// ))}

//         </div>
//       </div>
//     ))}
//     <div ref={messagesEndRef} />
//   </Container>

//   {/* Fixed Chat Input Area */}
//   {/* <div className="bg-white p-2     w-100 justify-content-center" style={{ position: "absolute", bottom: "0" , marginTop:"10rem"}}> */}
//     <Card className="max-w-3xl  mx-auto  flex items-end gap-2 relative w-75  justify-content-center" style={{   marginTop:"2rem"}}>
//       <textarea
//         className="flex-1 p-3 rounded-xl resize-none w-75"
//         rows={2}
//         placeholder="Ask something about Soulful Scribbles..."
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//         onKeyDown={handleKeyDown}
//         style={{ width: "65%", border: "none" }}
//       ></textarea>
//       <Button
//         onClick={askQuestion}
//         disabled={loading}
//         className="bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md flex items-center justify-center"
//         style={{
//           width: "fit-content",
//           height: "fit-content",
//           position: "absolute",
//           bottom: "15px",
//           right: "10rem",
//           padding: 10,
//           textAlign: "center",
//         }}
//       >
//         {loading ? "..." : <IoIosSend style={{ fontSize: "24px" }} />}
//       </Button>
//       <Button
//   onClick={clearChat}
//   className="mb-3"
//   style={{
//     width: "fit-content",
//     height: "fit-content",
//     position: "absolute",
//     bottom: "3px",
//     right: "3rem",
//     padding: 10,
//     textAlign: "center",
// backgroundColor:"red",
// color:"white",
//   }}
// >
//   Clear Chat
// </Button>

//     </Card>
//   </div>
// {/* </div> */}
// </>
//   );
// }

import { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import Title from "../components/Title";
import { Button,  Container, Row, Col } from "react-bootstrap";
import { IoIosSend } from "react-icons/io";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ChatPage() {
  const { token } = useContext(ShopContext);
  const navigate = useNavigate();
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("chat_messages");
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const userMessage = { sender: "user", text: question };
    const typingMsg = { sender: "bot", text: "Typing...", temp: true };

    setMessages((prev) => [...prev, userMessage, typingMsg]);
    setQuestion("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:8089/query", { question });
      const botMessage = { sender: "bot", text: res.data.answer };

      setMessages((prev) => {
        const updated = [...prev.filter((m) => !m.temp), botMessage];
        localStorage.setItem("chat_messages", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error(error);
      const errorMsg = {
        sender: "bot",
        text: "Oops! Something went wrong. Please try again.",
      };
      setMessages((prev) => {
        const updated = [...prev.filter((m) => !m.temp), errorMsg];
        localStorage.setItem("chat_messages", JSON.stringify(updated));
        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    localStorage.removeItem("chat_messages");
    setMessages([
      {
        sender: "bot",
        text: "Hi! How can I help you today?",
      },
    ]);
  };

  useEffect(() => {
    if (token) {
      clearChat();
      if (messages.length === 0) {
        const welcomeMsg = {
          sender: "bot",
          text: "Hi! How can I help you today?",
        };
        setMessages([welcomeMsg]);
      }
    } else {
      navigate("/login");
      toast.error("You Are Not Logged In!");
    }
  }, [token]);

  useEffect(() => {
    console.log("Updated messages:", messages);
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      askQuestion();
    }
  };

  return (
    <>
      <Title text1="Your" text2="Chat Assistant" />

      <div className="flex flex-col min-h-screen bg-gray-100">
        <Container className="flex-grow overflow-auto py-4" style={{ maxHeight: "70vh" }}>
          {messages.map((msg, index) => (
            <Row key={index} className={`mb-3 ${msg.sender === "user" ? "justify-content-end" : "justify-content-start"}`}>
              <Col xs="auto" className="px-2">
                <div
                  className={`p-3 rounded-3 shadow-sm ${
                    msg.sender === "user" ? "bg-primary text-white" : "bg-white text-dark"
                  }`}
                  style={{ maxWidth: "80vw", wordBreak: "break-word" }}
                >
                  {msg.text.split("\n").map((line, i) => (
                    <p key={i} className="m-0">
                      {line}
                    </p>
                  ))}
                </div>
              </Col>
            </Row>
          ))}
          <div ref={messagesEndRef} />
        </Container>

        {/* Chat Input Area */}
        <Container className="py-3 bg-white border-top">
          <Row className="align-items-end">
            <Col xs={12} md={9}>
              <textarea
                className="form-control rounded-3"
                rows={2}
                placeholder="Ask something about Soulful Scribbles..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Col>
            <Col xs={6} md={2} className="mt-2 mt-md-0">
              <Button
                onClick={askQuestion}
                disabled={loading}
                className="w-100 d-flex align-items-center justify-content-center"
                variant="primary"
              >
                {loading ? "..." : <IoIosSend size={24} />}
              </Button>
            </Col>
            <Col xs={6} md={1} className="mt-2 mt-md-0">
              <Button
                onClick={clearChat}
                variant="danger"
                className="w-100 text-white"
              >
                Clear
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
