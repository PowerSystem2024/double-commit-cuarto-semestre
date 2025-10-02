(async () => {
  async function updateTask() {
    const task = {
      titulo: "Esto es un título",
      descripcion: "Esta es la descripción de la tarea.",
    };
    const id = 7;
    await fetch(`http://localhost:5000/api/tarea/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }

  async function updateUser() {
    const updatedUser = {
      name: "Mario Meza",
      email: "meza.mario@yahoo.es",
      password: "laAlmeja123",
    };
    const id = 1;
    await fetch(`http://localhost:5000/api/update/user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  updateUser();
})();
