(async () => {
  async function getTaskById() {
    const id = 10;
    await fetch(`http://localhost:5000/api/tarea/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  getTaskById()
})();
