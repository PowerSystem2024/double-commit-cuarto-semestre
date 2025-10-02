import { compare, hash } from "bcrypt";
import { CREATE_USER, DELETE_USER, GET_ALL_USERS, GET_USER, GET_USER_BY_ID, UPDATE_USER } from "./constants.js";
import { request } from "express";

export class ControladorUsuarios {
  // Le pasamos la prop en el contructor para cambio de DB en local o server
  constructor({ authDb }) {
    this.authDb = authDb;
  }

  obtenerTodosLosUsuarios = async (req, res) => {
    try {
     const result = await this.authDb.query(GET_ALL_USERS)
     const usersResult = result?.rows || result

      res.status(200).json({ users: usersResult });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios: " + error.message });
    }
  }

  obtenerUsuarioPorId = async (req, res) => {
    try {
      const id = req.params.id
      const result = await this.authDb.query(GET_USER_BY_ID, [id])
      const userResult = result?.rows[0] || result
      
      if (userResult.length === 0) res.status(400).json({ message: "Usuario inexistente", id })
      res.status(200).json({ message: "Usuario encontrado:", user: userResult })
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor: " + error.message })
    }
  }

  ingresoUsuario = async (req = request, res) => {
    try {
     const user_email = req.body?.user_email
     const user_password = req.body?.user_password

      const userExist = await this.authDb.query(GET_USER, [user_email]);
      res.status(200).json({ message: "Todo bien!" })
    } catch (error) { 
      res.status(500).json({ message: "Error en el login del usuario: " + error.message });
    }
  }

  crearUsuario = async (req, res) => {
    try {
      const password = req.body.user_password;
      const hashedPassword = await hash(password, 10);
      const result = await this.authDb.query(CREATE_USER, [
        req.body.user_name,
        req.body.user_email,
        hashedPassword,
      ]);
      const createdUser = result?.rows?.[0] || result

      res.status(200).json({ message: "Usuario creado correctamente", user: createdUser });
    } catch (error) {
      res.status(500).json({ message: "Error al crear usuario: " + error.message });
    }
  }

  actualizarUsuario = async (req, res) => {
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

  eliminarUsuario = async (req, res) => {
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
