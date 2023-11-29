import express from "express";
import { getRecipes, getRecipeById } from "./api/recipes.js";

var app = express();
var port = 3001;
app.get("/", function (req, res) {
  return res.send("Hello World!");
});

app.get("/api/getRecipes", getRecipes);
app.get("/api/getRecipeById/:id", getRecipeById);

app.listen(port, function () {
  return console.log(`Example app listening on port ${port}!`);
});
