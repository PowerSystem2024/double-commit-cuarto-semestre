import { Pool } from "pg";

export const pool = new Pool({
  port: 5432,
  host: "localhost",
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD,
});

pool.on("connect", () => {
  console.log("Conectado a la base de de datos");
});
