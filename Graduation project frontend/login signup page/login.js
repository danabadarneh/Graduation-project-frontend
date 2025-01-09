document
  .getElementById("loginButton")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Failed to log in. Please check your credentials.");
      }

      const data = await response.json();
      const role = data.role;
      if(role === "Admin"){
        window.location.href = "../add projects admin/index.html"
      }
      else if (role === "Student"){
        window.location.href = "../Home Page/index.html"
      }
      else{
        window.location.href = "../doctor dashbord/index.html"
      }
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  });
