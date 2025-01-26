document.addEventListener("DOMContentLoaded", async () => {
    const collegeSelect = document.getElementById("college");
    const departmentSelect = document.getElementById("department");
    const supervisorSelect = document.getElementById("supervisor"); 

    fetch("http://localhost:4000/Supervisor/GetSupervisors")
    .then((response) => response.json())
    .then((data) => {
      data.supervisors.forEach((supervisor) => {
        const option = document.createElement("option");
        option.value = supervisor._id;
        option.textContent = supervisor.supervisorName;
        supervisorSelect.appendChild(option);
      });
    })
    .catch((error) => console.error("Error fetching supervisors:", error));

    // Fetch the token from localStorage
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
});

// Handle form submission
document.getElementById("form").addEventListener("submit", async function (e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    // Get form data
    const projectName = document.getElementById("projectName").value.trim();
    const supervisor = document.getElementById("supervisor").value.trim();
    const college = document.getElementById("college").value;
    const department = document.getElementById("department").value;
    const projectIdea = document.getElementById("projectIdea").value.trim();

    // Validation
    if (!projectName || !supervisor || !college || !department || !projectIdea) {
        alert("All fields are required!");
        return;
    }

    // API payload
    const payload = {
        projectName,
        supervisor,
        college,
        department,
        projectIdea,
    };

    try {
        const response = await fetch("http://localhost:4000/SuggestedProjects/AddSuggestedProjects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Seraj__${token}`,
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json();
            Swal.fire({
                text: errorData.message,
                icon: "error",
                customClass: {
                  confirmButton: "custom-confirm-button",
                },
              });;
        }

        document.getElementById("form").reset();
        Swal.fire({
            text: " Project added successfully",
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          });
    } catch (error) {
        Swal.fire({
            text: error.message,
            icon: "error",
            customClass: {
              confirmButton: "custom-confirm-button",
            },
          });
    }
});
