import jwt from "jsonwebtoken"

process.loadEnvFile(".env")
export const isAuth = async (req, res, next) => {
    try {
      const token = req.cookies.token

      if (!token) return res.status(401).json({ message: 'No estás autorizado' })
  
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) res.status(401).json({ message: "No estas autorizado" })
        req.userId = decoded.id
        next()
      })
    } catch (error) {
      res.status(500).json({ message: 'Error en el middleware: ' + error.message })
    }
  }
  