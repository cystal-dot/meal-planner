import express from "express";
import { getRecipes, getRecipeById, createRecipe } from "./api/recipes.js";
import bodyParser from "body-parser";

var app = express();
var port = 3001;

app.use(bodyParser.json());
app.get("/", function (req, res) {
  return res.send("Hello World!");
});

app.get("/api/getRecipes", getRecipes);
app.get("/api/getRecipeById/:id", getRecipeById);

app.post("/api/createRecipe", createRecipe);

app.listen(port, function () {
  return console.log(`Example app listening on port ${port}!`);
});
