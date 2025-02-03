document.addEventListener("DOMContentLoaded", () => {
  const collegeSelect = document.getElementById("college");
  const departmentSelect = document.getElementById("department");

  // Fetch colleges
  fetch("http://localhost:4000/College/getColleges")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((college) => {
        const option = document.createElement("option");
        option.value = college._id;
        option.textContent = college.collegeName;
        collegeSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching colleges:", error));

  // Update departments when a college is selected
  collegeSelect.addEventListener("change", (event) => {
    const collegeId = event.target.value;
    // في حال كنت مختار كلية وغيرتها لازم يسوي ريسيت لليست تبعت القسم على اساس يجيب اقسام جديدة بناء على الكلية
    departmentSelect.innerHTML =
      '<option value="" disabled selected>Select your department</option>';

    fetch(`http://localhost:4000/College/getDepartmentsByCollege/${collegeId}`)
      .then((response) => response.json())
      .then((data) => {
        data.departments.departments.forEach((department) => {
          const option = document.createElement("option");
          option.value = department._id;
          option.textContent = department.departmentName;
          departmentSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching departments:", error));
  });

  // Handle form submission
  document.getElementById("registrationForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("Name").trim();
    const password = formData.get("password").trim();
    const email = formData.get("email").trim();

    // Validation Error
    if (!name || !password) {
      alert("Please fill out all required fields.");
      return;
    }

    if (!email.includes("@") || email.length < 10) {
      Swal.fire({
        text: "check your email",
        icon: "warning"
      });
      return;
    }

    if (name.length < 3) {
      Swal.fire({
        text: "Name must be at least 3 characters long",
        icon: "warning"
      });
      return;
    }

    if (password.length < 5) {
      Swal.fire({
        text: "Password must be at least 5 characters long",
        icon: "warning"
      });
      return;
    }
    // Send the form data to the server
    try {
      const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to log in.");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);

      const role = data.role;
      if (role === "Student") {
        window.location.href = "../Home Page/index.html"
      }
      else {
        window.location.href = "../doctor dashbord/index.html"
      }
    } catch (error) {
      Swal.fire({
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
        customClass: {
          confirmButton: 'custom-confirm-button'
        },
      });
    }
  });
});