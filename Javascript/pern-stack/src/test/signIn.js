(async () => {
  const user = { user_email: "gabriel.calcagni86@gmail.com", user_password: "" }
  await fetch("http://localhost:5000/api/signin", {
    method: "POST",
    body: JSON.stringify(user),
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err.message))
})();
