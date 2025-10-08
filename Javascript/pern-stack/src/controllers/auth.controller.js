import { compare, hash } from "bcrypt";
import { CREATE_USER, DELETE_USER, GET_ALL_USERS, GET_USER_BY_EMAIL, GET_USER_BY_ID, UPDATE_USER } from "./constants.js";
import { createAccessToken } from "../lib/jwt.js";

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
      const userResult = result?.rows?.[0] || result[0]
      
      if (!userResult) res.status(400).json({ message: "Usuario inexistente", id })
      res.status(200).json({ message: "Usuario encontrado:", user: userResult })
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor: " + error.message })
    }
  }

  ingresoUsuario = async (req, res) => {
    try {
      const password = req.body.password;
      const email = req.body.email;

      const userExist = await this.authDb.query(GET_USER_BY_EMAIL, [email]);
      const userResultExist = userExist?.rows?.[0] || userExist[0]

      if (!userResultExist) res.status(404).json({ message: "El correo electrónico no está registrado", email })
      
      const validatedUser = await compare(password, userResultExist.user_password)
     
      if (!validatedUser) res.status(403).json({ message: "La contraseña es incorrecta!" })

      const payload = { id: userResultExist.user_id }
      const token = await createAccessToken({ payload })

      res.cookie("user_token_task_app", token, { httpOnly: true, sameSite: "none", maxAge: 60 * 60 * 24 * 1000 })
      res.status(200).json({ message: "Ingreso de usuario", user: userResultExist })
     
    } catch (error) { 
      res.status(500).json({ message: "Error en el login del usuario: " + error.message });
    }
  }

  crearUsuario = async (req, res) => {
    try {
      const { name, email, password } = req.body

      if (!name || !email || !password) res.status(400).json({ message: "Campos vacíos" })
      
      const hashedPassword = await hash(password, 10);
      const userExist = await this.authDb.query(GET_USER_BY_EMAIL, [email])
      const userExistent = userExist?.rows?.[0] || userExist[0]
      
      if (!userExistent) {
        const result = await this.authDb.query(CREATE_USER, [
          name,
          email,
          hashedPassword,
        ]);
        const createdUser = result?.rows?.[0] || result[0]
        const payload = { id: createdUser.user_id }
        const token = await createAccessToken({ payload })

        res.cookie("user_token_task_app", token, { httpOnly: true, sameSite: "none", maxAge: 60 * 60 * 24 * 1000 })
        res.status(201).json({ message: "Usuario creado correctamente", user: createdUser });
      } else {
        res.status(409).json({ message: `El correo ${email} ya está registrado.` })
      }
      
    } catch (error) {
      res.status(500).json({ message: "Error al crear usuario: " + error.message });
    }
  }

  actualizarUsuario = async (req, res) => {
    try {
      const id = req.params.id
      const { name, email } = req.body

      if (!name || !email) res.status(400).json({ message: "Campos vacíos" })

      const result = await this.authDb.query(GET_USER_BY_ID, [id])
      const userResult = result?.rows?.[0] || result[0]

      if (!userResult) res.status(404).json({ message: "Usuario no encontrado" });

      const hashedPassword = await hash(req.body.password, 10);
      const updatedUser = await this.authDb.query(UPDATE_USER, [
        id,
        name,
        email,
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
