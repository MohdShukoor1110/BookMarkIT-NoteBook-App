import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRoute from "./routes/NotesRoute.js"
import { connectDB } from "./config/db.js";
import rateLimiter from './middleware/rateLimit.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4001;

// middleware
app.use(
  cors({
    origin: "http://localhost:3000"
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});