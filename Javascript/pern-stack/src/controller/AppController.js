class AppController {
  static async home(req, res) {
    try {
      res.status(200).json({ message: "Hola perro!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error en el servidor: " + error.message });
    }
  }

  static async validation(req, res) {
    const jsonWebToken = req.body.jwToken;
    if (!jsonWebToken) {
      return res.status(400).json({ message: "Es necesario el JWT" });
    }
    try {
      res.status(200).json({ message: jsonWebToken });
    } catch (error) {
      res
        .status(500)
        .json({ mesage: "Error en el servidor: " + error.message });
    }
  }
}

export { AppController };
