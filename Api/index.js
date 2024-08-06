import express from "express";
const app = express();
import userRoutes from "./route/users.js"
import postRoutes from "./route/posts.js"
import likeRoutes from "./route/likes.js"
import commentRoutes from "./route/comments.js"
import authRoutes from "./route/auth.js"
import cors from "cors";
import multer from "multer";
import cookieParser from "cookie-parser";

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

  
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/likes", likeRoutes);
app.use("/api/comments", commentRoutes);

app.listen(8800, ()=>{
    console.log("Api working..");
})