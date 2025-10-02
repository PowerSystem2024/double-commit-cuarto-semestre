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
      name: "Rolando Esquiavi",
      email: "rolando_elflaco@yahoo.es",
      password: "laAlmeja123",
    };
    const id = 13;
    await fetch(`http://localhost:5000/api/user/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  updateUser();
})();
