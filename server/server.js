import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from './routes/upload.js';
import cloudinary from "./config/cloudinary.js";

const app = express();
const port = process.env.PORT || 5000;

connectDB();


// Middlewares
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5000",
  "https://soulful-scribbles-backend.vercel.app",
  "https://soulful-scribblesfrontend-git-main-vanshikas-projects-e45855e4.vercel.app",
  "https://soulful-scribblesadmin.vercel.app",
  "https://www.soulfulscribble.in",
  "https://soulful-scribbles-backend.vercel.app/api",
 

];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      // console.log("✅ CORS allowed origin:", origin);
      callback(null, true);
    } else {
      console.error("❌ CORS blocked origin:", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS",  "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use('/api/auth', authRoutes);
// app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/settings', settingRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log("Server Started on port :" + port));