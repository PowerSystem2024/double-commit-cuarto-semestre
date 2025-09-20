(async () => {
  await fetch("http://localhost:5000/api/tareas")
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
})();
