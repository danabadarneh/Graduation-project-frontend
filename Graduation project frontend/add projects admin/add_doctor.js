document.addEventListener("DOMContentLoaded", () => {
  const collegeSelect = document.getElementById("college");
  const departmentSelect = document.getElementById("department");
  const form = document.getElementById("addDoctorForm");

  const authToken = localStorage.getItem("token");

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

  // Handle form submission for adding a doctor
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const doctorData = {
      supervisorName: document.getElementById("DoctortName").value,
      collegeId: collegeSelect.value,
      departmentId: departmentSelect.value,
      email: document.getElementById("DoctorEmail").value,
      password: document.getElementById("password").value,
    };
    console.log(doctorData)

    fetch("http://localhost:4000/Supervisor/AddSupervisor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Seraj__${authToken}`,
      },
      body: JSON.stringify(doctorData),
    })
      .then(async (response) => {
        const text = await response.text();
        console.log("Server Response:", text);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return JSON.parse(text); // Parse as JSON
      })
      .then((data) => {
        alert("Doctor added successfully!");
        console.log(data);
      })
      .catch((error) => {
        console.error("Error adding doctor:", error);
        alert("Error adding doctor. Please try again.");
      });
  });
});
