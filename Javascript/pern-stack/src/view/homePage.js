import path from "path";

export const homePage = (req, res) => {
  const filePath = path.join(
    process.cwd(),
    "..",
    "pern-stack",
    "src",
    "view",
    "index.html"
  );
  try {
    return res.sendFile(filePath);
  } catch (error) {
    return res.status(500).send(`
        <h1>Error al cargar archivo index.html</h1>
        <p>No se encontró la ruta específica: ${filePath}</p>    
    `);
  }
};
