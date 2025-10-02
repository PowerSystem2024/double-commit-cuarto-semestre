import { compare, hash } from "bcrypt";
import { CREATE_USER, DELETE_USER, GET_ALL_USERS, GET_USER_BY_EMAIL, GET_USER_BY_ID, UPDATE_USER } from "./constants.js";
import { request } from "express";

export class ControladorUsuarios {
  // se crea el constructor para pasarle la prop e inyectar en la instancia la DB en su posterior uso
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
      const userResult = result?.rows[0] || result[0]
      
      if (!userResult) res.status(400).json({ message: "Usuario inexistente", id })
      res.status(200).json({ message: "Usuario encontrado:", user: userResult })
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor: " + error.message })
    }
  }

  ingresoUsuario = async (req = request, res) => {
    try {
      const password = req.body.password;
      const email = req.body.email;

      const userExist = await this.authDb.query(GET_USER_BY_EMAIL, [email]);
      const userResultExist = userExist?.rows?.[0] || userExist[0]

      if (!userResultExist) res.status(404).json({ message: "El correo electrónico no está registrado", email })
      
      const isValidatedUser = await compare(password, userResultExist.user_password)
     
      if (isValidatedUser) {
        res.status(200).json({ message: "Todo bien! Al parecer el usuario ha ingresado.", user: userResultExist })
      } else {
        res.status(403).json({ message: "La contraseña es incorrecta!" })
      }
     
    } catch (error) { 
      res.status(500).json({ message: "Error en el login del usuario: " + error.message });
    }
  }

  crearUsuario = async (req, res) => {
    try {
      const { name, email, password } = req.body
      const hashedPassword = await hash(password, 10);
      const userExist = await this.authDb.query(GET_USER_BY_EMAIL, [email])
      const userExistResult = userExist?.rows?.[0] || userExist[0]

      if (userExistResult) res.status(400).json({ message: "El usuario ya existe, regístrese con otro correo", user: userExistResult });

      const result = await this.authDb.query(CREATE_USER, [
        name,
        email,
        hashedPassword,
      ]);
      const createdUser = result?.rows?.[0] || result[0]

      if (!userExistResult) {
        res.status(200).json({ message: "Usuario creado correctamente", user: createdUser });
      } 
      
    } catch (error) {
      res.status(500).json({ message: "Error al crear usuario: " + error.message });
    }
  }

  actualizarUsuario = async (req, res) => {
    try {
      const id = req.params.id
      const result = await this.authDb.query(GET_USER_BY_ID, [id])
      const userResult = result?.rows?.[0] || result[0]

      if (!userResult) res.status(404).json({ message: "Usuario no encontrado" });

      const hashedPassword = await hash(req.body.password, 10);
      const updatedUser = await this.authDb.query(UPDATE_USER, [
        id,
        req.body.name,
        req.body.email,
        hashedPassword,
      ]);
      const updatedUserResult = updatedUser?.rows?.[0] || updatedUser[0]

      res.status(200).json({ message: "Usuario actualizado", user: updatedUserResult });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar usuario: " + error.message });
    }
  }

  eliminarUsuario = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await this.authDb.query(DELETE_USER, [id]);
      const userResult = result?.rows?.[0] || result[0]

      if (!userResult) res.status(404).json({ message: "Usuario no encontrado:" });
      
      res.status(200).json({ message: "Usuario eliminado", user: userResult });
    } catch (error) {
      res.status(500).json({ message: "Error al borrar usuario: " + error.message });
    }
  }
}
