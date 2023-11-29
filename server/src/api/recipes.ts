import pool from "../db.js";
import e, { Request, Response } from "express";

const errorMessage = "サーバーエラー";

export async function getRecipes(_req: Request, res: Response) {
  try {
    const { rows } = await pool.query("SELECT * FROM recipes");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(errorMessage);
  }
}

export async function getRecipeById(req: Request, res: Response) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM recipes WHERE recipe_index = $1",
      [req.params.id]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).send("レシピが見つかりません");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(errorMessage);
  }
}
