(async () => {
  async function createTask() {
    const task = {
      titulo: "Prueba del Create",
      descripcion: "Esta es la descripción de la prueba createTask.",
    };
    await fetch("http://localhost:5000/api/tarea", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }


  async function createUser() {
    const newUser = {
      user_name: "Mario",
      user_email: "mario.calcagni@yahoo.es",
      user_password: "administrador123",
    };
    await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => console.log(data.user))
      .catch((err) => console.error(err.message));
  }

  createUser()
})();
