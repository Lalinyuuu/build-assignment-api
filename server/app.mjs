import express from "express";
import connectionPool from "./utils/db.mjs";

const app = express();
const port = process.env.PORT ?? 4000;

app.use(express.json());

app.post("/assignments", async (req, res) => {
  try {
    const { title, content, category } = req.body || {};
    if (!title || !content || !category) {
      return res.status(400).json({
        message:
          "Server could not create assignment because there are missing data from client",
      });
    }

    await connectionPool.query(
      `INSERT INTO assignments (title, content, category, created_at)
       VALUES ($1, $2, $3, NOW())`,
      [title, content, category]
    );

    return res.status(201).json({ message: "Created assignment sucessfully" });
  } catch (_e) {
    return res.status(500).json({
      message:
        "Server could not create assignment because database connection",
    });
  }
});

app.listen(port, () => console.log(`Server is running at ${port}`));