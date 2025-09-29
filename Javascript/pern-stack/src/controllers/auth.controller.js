import { compare, hash } from "bcrypt";
import { CREATE_USER, DELETE_USER, GET_ALL_USERS, GET_TASK_BY_ID, GET_USER, GET_USER_BY_ID, UPDATE_USER } from "./constants.js";

export class AuthController {
  constructor({ authDb }) {
    this.authDb = authDb;
  }

  getAllUsers = async (req, res) => {
    try {
      const password = req.query
      
      const validPassword = compare(password, )

      res.status(200).json({ users: result });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios: " + error.message });
    }
  }

  getUserById = async (req, res) => {
    try {
      const id = req.params.id

      if (!id) res.status(400).json({ message: "Debe proporcionar el ID del usuario" })

      const result = this.authDb.query(GET_USER_BY_ID, [id])
      console.log(result)
      res.status(200).json({ message: "Usuario encontrado:", user: result })
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor: " + error.message })
    }
  }

  loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email) res.status(400).json({ message: "Debe proporcionar el parámetro '/email'" })

      const userResult = await this.authDb.query(GET_USER, [email]);
      

      console.log(userResult)

      res.status(200).json({ message: "Usuario logueado exitosamente", user });
    } catch (error) {
      res.status(500).json({ message: "Error en el login del usuario: " + error.message });
    }
  }

  createUser = async (req, res) => {
    try {
      const password = req.body.password;
      const hashedPassword = await hash(password, 10);
      const result = await this.authDb.query(CREATE_USER, [
        req.body.username,
        req.body.email,
        hashedPassword,
      ]);

      res.status(200).json({ message: "Usuario creado correctamente", user: result.rows[0] });
    } catch (error) {
      res.status(500).json({ message: "Error al crear usuario: " + error.message });
    }
  }

  updateUser = async (req, res) => {
    try {
      const hashedPassword = await hash(req.body.password, 10);
      const result = await this.authDb.query(UPDATE_USER, [
        req.body.username,
        req.body.email,
        hashedPassword,
      ]);

      if (result.rows.length === 0) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }

      res.status(200).json({ message: "Usuario actualizado", user: result.rows[0] });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar usuario: " + error.message });
    }
  }

  deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
      const result = await this.authDb.query(DELETE_USER, [id]);
      if (result.rows.length === 0) {
        return res.status(400).json({ message: "Usuario no encontrado" });
      }

      res.status(200).json({ message: "Usuario eliminado", user: result.rows[0] });
    } catch (error) {
      res.status(500).json({ message: "Error al borrar usuario: " + error.message });
    }
  }
}
