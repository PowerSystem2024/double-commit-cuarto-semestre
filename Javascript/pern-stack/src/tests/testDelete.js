(async () => {
  const id = 9;
  await fetch(`http://localhost:5000/api/delete/user/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
})();
