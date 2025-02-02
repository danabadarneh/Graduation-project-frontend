document.getElementById("loginButton")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!email || !password) {
      Swal.fire({
        text: "Please fill both the email and password",
        icon: "warning",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: 'custom-confirm-button',
        },
      });
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in.");
      }

      const data = await response.json();

      const role = data.role;
      if (role === "Admin") {
        window.location.href = "../add projects admin/index.html"
      }
      else if (role === "Student") {
        window.location.href = "../Home Page/index.html"
      }
      else {
        window.location.href = "../doctor dashbord/index.html"
      }
      localStorage.setItem("token", data.token);
    } catch (error) {
      Swal.fire({
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: 'custom-confirm-button',
        },
      });
    }
  });