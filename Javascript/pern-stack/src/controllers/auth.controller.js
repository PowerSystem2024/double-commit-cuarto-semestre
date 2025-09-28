import { compare, hash } from "bcrypt";
import { CREATE_USER, DELETE_USER, GET_ALL_USERS, GET_USER, UPDATE_USER } from "./constants.js";

export class AuthController {
  constructor({ authDb = pool }) {
    this.authDb = authDb;
  }

  async getAllUsers(req, res) {
    try {
      const result = await this.authDb.query(GET_ALL_USERS);
      if (result.rows.lenght === 0) res.status(400).json({ message: "No hay usuarios registrados." });

      res.status(200).json({ result: result[0] });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al obtener usuarios: " + error.message });
    }
  }

  async loginUser(req, res) {
    try {
        const id = req.params.id
        const email = req.body.email
        const password = req.body.password
        const userResult = await this.authDb.query(GET_USER, [id])
        const comparedPassword = compare(password, userResult[0].user_password)
        const result = await this.authDb.query(GET_USER, [email, comparedPassword])
        if (!result) res.status(400).json({ message: "Error en el login" })
        res.status(200).json({ message: "Usuario logeado exitosamente", user: result[0] })
    } catch (error) {
        res.status(500).json({ message: "Error en el login del usuario: " + error.message })
    }
  }

  async createUser(req, res) {
    try {
      const password = req.body.password;
      const saltRounds = 10;
      const hashedPassword = await hash(password, saltRounds);
      const result = await this.authDb.query(CREATE_USER, [
        req.body.username,
        req.body.email,
        hashedPassword,
      ]);
      res
        .status(200)
        .json({ message: "Usuario creado correctamente: ", user: result[0] });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error al crear usuario: " + error.message });
    }
  }

  async updateUser(req, res) {
    const hashedPassword = await hash(req.body.password, 10)
    try {
        const result = await this.authDb.query(UPDATE_USER, [req.body.username, req.body.email, hashedPassword]);
        if (result.rows.lenght === 0) res.status(400).json({ message: "No hay usuarios registrados." });
  
        res.status(200).json({ result: result[0] });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error al obtener usuarios: " + error.message });
      }
  }

  async deleteUser(req, res) {
    const id = req.params.id
    try {
        const result = await this.authDb.query(DELETE_USER, [id]);
        if (result.rows.lenght === 0) res.status(400).json({ message: "No hay usuarios registrados." });
  
        res.status(200).json({ result: result[0] });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error al obtener usuarios: " + error.message });
      }
  }
}
