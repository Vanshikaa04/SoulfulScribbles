import express from "express"
import cors from "cors"
import "dotenv/config"  //supports from dot env
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import router from "./routes/UserRoutes.js"
import productrouter from "./routes/ProductRoutes.js"
import cartRouter from "./routes/CartRoutes.js"
import orderrouter from "./routes/OrderRoutes.js"
import workshoprouter from "./routes/WorkshopRoutes.js"
import otprouter from "./routes/OtpRoutes.js"

//App Config
const app =express()
const port = process.env.PORT || 3080

connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
// app.use(cors())


const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',

      "http://localhost:3080",
    'https://soulful-scribblesfrontend-git-main-vanshikas-projects-e45855e4.vercel.app',
   "https://soulful-scribblesadmin.vercel.app",

    'https://www.soulfulscribble.in',
    'https://www.soulfulscribble.in/'
  ];
  
  const corsOptions = {
    origin: function (origin, callback) {
      // Allow non-browser tools like Postman
      if (!origin) return callback(null, true);
  
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error('❌ CORS blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // if using cookies or Authorization headers
  };
  
  app.use(cors(corsOptions));
  
// //api endpoints
app.use('/api/user',router)
app.use('/api/product',productrouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderrouter)
app.use('/api/workshop',workshoprouter)
app.use('/api/otp',otprouter)


app.get ('/',(req,res)=>{
    res.send("API WORKING")
})

app.listen(port ,()=> console.log("Server Started on port :"+port ))