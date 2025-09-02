import express from "express";
import dotenv from "dotenv";
import { router as assignmentsRouter } from "./routes/assignments.mjs";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get("/test", (_req, res) => {
  return res.json("Server API is working 🚀");
});

app.use("/assignments", assignmentsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});