document.addEventListener("DOMContentLoaded", () => {
    const collegeSelect = document.getElementById("college");
    const departmentSelect = document.getElementById("department");
    const supervisorSelect = document.getElementById("supervisor");
    const form = document.getElementById("form");
  
    const authToken = localStorage.getItem("token");
  
    // Fetch colleges and populate the college dropdown
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

      departmentSelect.addEventListener("change", (event) => {
        const departmentId = event.target.value;
        // في حال كنت مختار كلية وغيرتها لازم يسوي ريسيت لليست تبعت القسم على اساس يجيب اقسام جديدة بناء على الكلية
        supervisorSelect.innerHTML =
      '<option value="" disabled selected>Select your supervisor</option>';

    fetch(`http://localhost:4000/Supervisor/GetSupervisors/${departmentId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch supervisors");
        }
        return response.json();
      })
      .then((data) => {
        data.supervisors.forEach((supervisor) => {
          const option = document.createElement("option");
          option.value = supervisor._id;
          option.textContent = supervisor.supervisorName;
          supervisorSelect.appendChild(option);
        });
      })
      .catch((error) => console.error("Error fetching supervisors:", error));
  });
  
    // Handle form submission
    form.addEventListener("submit", (event) => {
        event.preventDefault();
      
        const formData = new FormData();
        formData.append("projectName", document.getElementById("projectName").value);
        formData.append("supervisor", document.getElementById("supervisor").value);
        formData.append("college", collegeSelect.value);
        formData.append("department", departmentSelect.value);
        formData.append("projectIdea", document.getElementById("projectIdea").value);
        formData.append("projectFile", document.getElementById("projectFile").files[0]);
      
        fetch("http://localhost:4000/Projects/AddProjects", {
          method: "POST",
          headers: {
            Authorization: `Seraj__${authToken}`, // Don't set Content-Type for FormData
          },
          body: formData,
        })
          .then(async (response) => {
            const text = await response.text();
            console.log(text)
            console.log("Server Response:", text);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return JSON.parse(text);
          })
          .then((data) => {
            alert("Project added successfully!");
            console.log(data);
          })
          .catch((error) => {
            console.error("Error adding project:", error);
            alert("Error adding project. Please try again.");
          });
      });
  });
  