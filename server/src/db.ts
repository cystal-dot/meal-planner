import pg from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "meal_planner",
  password: "postgres", //TODO:外部定義化
  port: 5432,
});

export default pool;
