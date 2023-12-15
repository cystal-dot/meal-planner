import express from "express";
import {
  getRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
} from "./api/recipes.js";
import bodyParser from "body-parser";

var app = express();
var port = 3001;

app.use(bodyParser.json());
app.get("/", function (req, res) {
  return res.send("Hello World!");
});

// レシピ一覧取得
app.get("/api/getRecipes", getRecipes);
// レシピIdで取得
app.get("/api/getRecipeById/:id", getRecipeById);

// レシピ登録
app.post("/api/createRecipe", createRecipe);
// レシピ更新
app.put("/api/updateRecipe", updateRecipe);

app.listen(port, function () {
  return console.log(`Example app listening on port ${port}!`);
});
