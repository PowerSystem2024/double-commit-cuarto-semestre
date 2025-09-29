import { neon } from "@neondatabase/serverless";
import path from "path";
import { CREATE_USER, GET_USER_BY_ID } from "../src/controllers/constants.js";
import { compare, hash } from "bcrypt";

process.loadEnvFile(path.join(process.cwd(), "/.env"));
const { PGUSER, PGPASSWORD, PGHOST, PGDATABASE } = process.env;

export const serverNeonDB = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require&channel_binding=require`
);

const getUserById = async () => {
  const id = 11
  const password = "admin1234"
  const result = await serverNeonDB.query(GET_USER_BY_ID, [id])
  const hashedPass = result[0].user_password
  const comparedPassword = await compare(password, hashedPass)
  
  console.log("Las contraseñas coinciden", comparedPassword)
}

const createUser = async () => {
  const user = { user_name: "Ale", user_email: "ale_meza@gmail.com", user_password: "admin1234"  }
  const hashedPassword = await hash(user.user_password, 10)
  const resutl = await serverNeonDB.query(CREATE_USER, [user.user_name, user.user_email, hashedPassword])
  console.log(resutl)
}

getUserById()