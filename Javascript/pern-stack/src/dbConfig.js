import { Pool } from "pg";

export const pool = new Pool({
  database: "pern",
  port: 5432,
  host: "localhost",
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "32088028..mGc",
});

pool.on("connect", () => {
  console.log("Conectado a la base de de datos");
});
