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
    document
      .getElementById("registrationForm")
      .addEventListener("submit", (event) => {
        event.preventDefault(); 
        const formData = new FormData(event.target);
  
        fetch("http://localhost:4000/auth/signup", {
          method: "POST",
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
          })
          .catch((error) => console.error("Error during registration:", error));
      });
  });
  