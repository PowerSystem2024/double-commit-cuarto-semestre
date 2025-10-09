import jwt from "jsonwebtoken";

process.loadEnvFile(".env");

export const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({ message: "No estás autorizado (falta token)" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};
