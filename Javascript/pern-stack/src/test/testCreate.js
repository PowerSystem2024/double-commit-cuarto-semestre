const task = {
  titulo: "Prueba del Create",
  descripcion: "Esta es la descripción de la prueba createTask.",
};
(async () => {
  await fetch("http://localhost:5000/api/tarea", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
})();
