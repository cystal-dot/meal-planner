import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT as unknown as number | 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
