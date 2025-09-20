const task = {
  titulo: "Esto es un título",
  descripcion: "Esta es la descripción de la tarea.",
};
(async () => {
  const id = 7;
  await fetch(`http://localhost:5000/api/tarea/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
})();
