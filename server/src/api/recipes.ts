import pool from "../db.js";
import { Request, Response } from "express";
import { Recipe } from "../model/recipe.js";
import { errorMessage } from "../common/const.js";

// レシピ一覧を取得する
// curl http://localhost:3001/api/getRecipes
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
// 複数のIDでも取得を可能に(例: /api/getRecipeById/1-2-3)
// TODO:他のカラムの情報でも取得できるようにする
// curl http://localhost:3001/api/getRecipeById/1-2
export async function getRecipeById(req: Request, res: Response) {
  try {
    const ids = req.params.id.split("-");

    // IDのフォーマットチェック
    if (!ids.every((id) => /^\d+$/.test(id))) {
      return res.status(400).send("無効なIDフォーマットです");
    }
    const placeHolders = ids.map((_, index) => `$${index + 1}`).join(",");
    const { rows } = await pool.query(
      "SELECT * FROM recipes WHERE recipe_index IN (" + placeHolders + ")",
      ids
    );

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).send("レシピが見つかりません");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(errorMessage);
  }
}

// レシピを登録する
// curl -X POST -H "Content-Type: application/json" -d '{"create_user_id":1,"recipe_name":"test_name","description":"test_description","cooking_time":"60","ingredients":"test"}' http://localhost:3001/api/createRecipe
export async function createRecipe(req: Request, res: Response) {
  try {
    const recipe: Recipe = req.body;
    // created_at, updated_atに日時を設定
    const now = new Date();
    recipe.created_at = now;
    recipe.updated_at = now;

    // recipe_indexは自動採番
    const { recipe_index, ...recipeData } = recipe;

    const recipeDataKeys = Object.keys(recipeData);
    const recipeDataValues = Object.values(recipeData);
    const placeHolders = recipeDataKeys
      .map((_, index) => `$${index + 1}`)
      .join(",");

    const insertColumns = recipeDataKeys.join(",");
    const { rows } = await pool.query(
      `INSERT INTO recipes (${insertColumns}) VALUES (${placeHolders}) RETURNING *`,
      recipeDataValues
    );
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send(errorMessage);
  }
}

// レシピを更新する
// 変更可能な項目はrecipe_name, description, cooking_time, ingredientsのみ
// curl -X PUT -H "Content-Type: application/json" -d '{"recipe_index": 1, "recipe_name": "test_name", "description": "test_description", "cooking_time": 60, "ingredients": "test"}' http://localhost:3001/api/updateRecipe
export async function updateRecipe(req: Request, res: Response) {
  try {
    const recipe: Recipe = req.body;
    recipe.updated_at = new Date();
    const recipeIndex = recipe.recipe_index;

    // recipe_indexが存在するかチェック
    const { rows } = await pool.query(
      "SELECT * FROM recipes WHERE recipe_index = $1",
      [recipeIndex]
    );
    if (rows.length === 0) {
      return res.status(404).send("レシピが見つかりません");
    }

    // 更新可能な項目のみ更新
    const updateColumns = [
      "recipe_name",
      "description",
      "cooking_time",
      "ingredients",
      "updated_at",
    ];
    const placeHoldersForSet = updateColumns
      .filter((column) => recipe[column as keyof Recipe])
      .map((column, index) => `${column} = $${index + 1}`)
      .join(",");
    // recipeの項目から、更新可能な項目のみを抽出
    const updateData = updateColumns.map(
      (column) => recipe[column as keyof Recipe]
    );

    const updateDataValues = Object.values(updateData);

    await pool.query(
      `UPDATE recipes SET ${placeHoldersForSet} WHERE recipe_index = $${
        updateColumns.length + 1
      }`,
      [...updateDataValues, recipeIndex]
    );
    res.json("レシピを更新しました");
  } catch (err) {
    console.error(err);
    res.status(500).send(errorMessage);
  }
}
