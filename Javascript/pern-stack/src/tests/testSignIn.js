(async () => {
  const user = { email: "gabriel86@gmail.com", password: "admin1234" }
  await fetch("http://localhost:5000/api/signin", {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    method: "POST",
    body: JSON.stringify(user),
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err.message))
})();
