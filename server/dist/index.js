import express from "express";
import { getRecipes } from "./api/recipes.js";
var app = express();
var port = 3001;
app.get("/", function (req, res) {
    return res.send("Hello World!");
});
app.get("/api/get", getRecipes);
app.listen(port, function () {
    return console.log(`Example app listening on port ${port}!`);
});
