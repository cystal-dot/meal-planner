import pool from "../db.js";
import { Request, Response } from "express";
import { errorMessage } from "../common/const.js";

// お気に入り操作API
// curl -X POST -H "Content-Type: application/json" -d '{"user_id":1,"recipe_index":1, "operation_type":"update" }' http://localhost:3001/api/createFavorite
// curl -X POST -H "Content-Type: application/json" -d '{"user_id":1,"recipe_index":1, "operation_type":"delete" }' http://localhost:3001/api/createFavorite
export async function createFavorite(req: Request, res: Response) {
  try {
    const { user_id, recipe_index, operation_type } = req.body;
    // お気に入り登録済みかチェック
    const { rows } = await pool.query(
      "SELECT favorites FROM users WHERE user_id = $1",
      [user_id]
    );

    const updateFavorite = async (
      user_id: number,
      recipe_index: number,
      rows: any,
      res: Response
    ) => {
      const favorites: Array<number> = rows[0].favorites;
      if (favorites && favorites.includes(recipe_index)) {
        return res.status(400).send("お気に入り登録済みです");
      } else {
        // お気に入り登録済みでなければ、お気に入り登録
        // favoritesはinteger[]型なので、ARRAY[1,2,3]のように文字列で渡す
        favorites.push(recipe_index);
        await pool.query("UPDATE users SET favorites = $1 WHERE user_id = $2", [
          favorites,
          user_id,
        ]);
      }
    };

    const deleteFavorite = async (
      user_id: number,
      recipe_index: number,
      rows: any,
      res: Response
    ) => {
      const favorites: Array<number> = rows[0].favorites;
      if (!favorites || !favorites.includes(recipe_index)) {
        return res.status(400).send("お気に入り登録されていません");
      } else {
        // お気に入り登録済みであれば、お気に入り削除
        const newFavorites = favorites.filter(
          (id: number) => id !== recipe_index
        );
        await pool.query("UPDATE users SET favorites = $1 WHERE user_id = $2", [
          newFavorites,
          user_id,
        ]);
      }
    };

    // 操作に応じてお気に入り登録・削除を実施
    switch (operation_type) {
      case "update":
        await updateFavorite(user_id, recipe_index, rows, res);
        break;
      case "delete":
        await deleteFavorite(user_id, recipe_index, rows, res);
        break;
      default:
        res.status(400).send("無効な操作です");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(errorMessage);
  }
}
