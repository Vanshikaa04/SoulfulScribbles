import mongoose  from "mongoose";
const uri = "mongodb+srv://wadhwanivanshika86:62915297@cluster0.cbjlglh.mongodb.net/test?retryWrites=true&w=majority'";


mongoose.connect(uri)
  .then(() => console.log('✅ MongoDB Connected!'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));
