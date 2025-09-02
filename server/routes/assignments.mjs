import express from "express";
import { pool } from "../utils/db.mjs";

export const router = express.Router();


router.get("/", async (_req, res) => {
  try {
    const result = await pool.query(
      "select * from assignments order by created_at desc"
    );
    return res.status(200).json({ data: result.rows });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message:
        "Server could not read assignment because database connection",
    });
  }
});


router.get("/:assignmentId", async (req, res) => {
  const id = Number(req.params.assignmentId);
  if (!Number.isInteger(id)) {
    return res.status(404).json({
      message: "Server could not find a requested assignment",
    });
  }
  try {
    const result = await pool.query(
      "select * from assignments where assignment_id = $1 limit 1",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Server could not find a requested assignment",
      });
    }
    return res.status(200).json({ data: result.rows[0] });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message:
        "Server could not read assignment because database connection",
    });
  }
});


router.post("/", async (req, res) => {
  const { title, content, category, length, status, published_at, user_id } =
    req.body || {};
  if (!title || typeof title !== "string") {
    return res.status(400).json({ message: "title is required" });
  }
  if (!content || typeof content !== "string") {
    return res.status(400).json({ message: "content is required" });
  }
  if (!category || typeof category !== "string") {
    return res.status(400).json({ message: "category is required" });
  }

  try {
    const result = await pool.query(
      `insert into assignments
         (title, content, category, length, status, published_at, user_id, updated_at)
       values ($1,$2,$3,$4,$5,$6,$7, now())
       returning *`,
      [
        title,
        content,
        category,
        length ?? null,
        status ?? "draft",
        published_at ?? null,
        user_id ?? null, 
      ]
    );
    return res.status(201).json({ data: result.rows[0] });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message:
        "Server could not update assignment because database connection",
    });
  }
});


router.put("/:assignmentId", async (req, res) => {
  const id = Number(req.params.assignmentId);
  const { title, content, category, length, status, published_at } =
    req.body || {};

  try {
    const result = await pool.query(
      `update assignments
       set title        = coalesce($1, title),
           content      = coalesce($2, content),
           category     = coalesce($3, category),
           length       = coalesce($4, length),
           status       = coalesce($5, status),
           published_at = coalesce($6, published_at),
           updated_at   = now()
       where assignment_id = $7`,
      [title ?? null, content ?? null, category ?? null, length ?? null, status ?? null, published_at ?? null, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Server could not find a requested assignment to update",
      });
    }
    return res.status(200).json({ message: "Updated assignment sucessfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message:
        "Server could not update assignment because database connection",
    });
  }
});


router.delete("/:assignmentId", async (req, res) => {
  const id = Number(req.params.assignmentId);
  try {
    const result = await pool.query(
      "delete from assignments where assignment_id = $1",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        message: "Server could not find a requested assignment to delete",
      });
    }
    return res.status(200).json({ message: "Deleted assignment sucessfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message:
        "Server could not delete assignment because database connection",
    });
  }
});