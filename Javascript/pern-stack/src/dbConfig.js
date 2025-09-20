import { Pool } from "pg";

process.loadEnvFile(".env");

export const pool = new Pool({
  database: "pern",
  port: 5432,
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
  console.log("Conectado a la base de de datos");
});
