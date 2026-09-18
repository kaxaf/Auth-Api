fetch("http://localhost:3000/auth/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: "admin@gmail.com", password: "12345678" })
})
.then(r => r.json())
.then(data => {
  console.log("Here's the token:");
  console.log(data.access_token);
})