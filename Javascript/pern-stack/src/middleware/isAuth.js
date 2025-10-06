export const isAuth = async (req, res, next) => {
    try {
      const headerAuthorization = req.headers['authorization']
  
      if (!headerAuthorization) res.status(403).json({ message: 'Prohibido es necesario el token de autorización' })
  
      next()
    } catch (error) {
      res.status(500).json({ message: 'Error en el middleware: ' + error.message })
    }
  }
  