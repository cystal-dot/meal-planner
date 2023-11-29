import pool from "../db.js";
import { Request, Response } from "express";
import { Recipe } from "../model/recipe.js";

const errorMessage = "サーバーエラー";

// レシピ一覧を取得する
export async function getRecipes(_req: Request, res: Response) {
  try {
    const { rows } = await pool.query("SELECT * FROM recipes");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(errorMessage);
  }
}

// レシピをIDで取得する
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

// レシピを登録する
export async function createRecipe(req: Request, res: Response) {
  try {
    const recipe: Recipe = req.body;

    // TODO:$のハードコードをなくす
    const { rows } = await pool.query(
      "INSERT INTO recipes (create_user_id, recipe_name, description, cooking_time, created_at, updated_at, ingredients) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        recipe.create_user_id,
        recipe.recipe_name,
        recipe.description,
        recipe.cooking_time,
        recipe.created_at,
        recipe.updated_at,
        recipe.ingredients,
      ]
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(errorMessage);
  }
}
