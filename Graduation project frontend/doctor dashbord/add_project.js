document.addEventListener("DOMContentLoaded", () => {
    const collegeSelect = document.getElementById("college");
    const departmentSelect = document.getElementById("department");
    const addSugProjForm = document.getElementById("addSugProjForm");
    const successMessage = document.getElementById("successMessage");
    
    // Get token from localStorage and check it
    const token = localStorage.getItem("token");
    console.log("Current token:", token); // للتحقق من وجود التوكن

    // التحقق من وجود التوكن
    if (!token) {
        alert("You need to login first!");
        window.location.href = "./login.html";
        return;
    }

    // Fetch colleges with token check
    fetch("http://localhost:4000/College/getColleges", {
        headers: {
            "Authorization": `Seraj__ ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Authorization failed");
        }
        return response.json();
    })
    .then(data => {
        collegeSelect.innerHTML = '<option value="">Select a College</option>';
        data.forEach(college => {
            const option = document.createElement("option");
            option.value = college._id;
            option.textContent = college.collegeName;
            collegeSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error("Error fetching colleges:", error);
        if (error.message === "Authorization failed") {
            alert("Session expired. Please login again.");
            window.location.href = "./login.html";
        }
    });

    // Update departments when college is selected
    collegeSelect.addEventListener("change", (event) => {
        const collegeId = event.target.value;
        departmentSelect.innerHTML = '<option value="">Select a Department</option>';

        if (collegeId) {
            fetch(`http://localhost:4000/College/getDepartmentsByCollege/${collegeId}`, {
                headers: {
                    "Authorization": `Seraj__ ${token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                data.departments.departments.forEach(department => {
                    const option = document.createElement("option");
                    option.value = department._id;
                    option.textContent = department.departmentName;
                    departmentSelect.appendChild(option);
                });
            })
            .catch(error => console.error("Error fetching departments:", error));
        }
    });

    // Handle form submission
    addSugProjForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const projectData = {
            projectName: document.getElementById("projectName").value,
            supervisor: document.getElementById("supervisor").value,
            collegeId: document.getElementById("college").value,
            departmentId: document.getElementById("department").value,
            projectIdea: document.getElementById("projectIdea").value
        };

        // Validate form data
        if (!projectData.projectName || !projectData.supervisor || !projectData.collegeId || 
            !projectData.departmentId || !projectData.projectIdea) {
            alert("Please fill in all fields");
            return;
        }

        try {
            console.log("Sending request with token:", `Seraj__ ${token}`); // للتحقق من التوكن المرسل
            console.log("Project data:", projectData); // للتحقق من البيانات المرسلة

            const response = await fetch("http://localhost:4000/SuggestedProjects/AddSuggestedProjects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Seraj__ ${token}`
                },
                body: JSON.stringify(projectData)
            });

            const responseData = await response.json();
            console.log("Full response data:", responseData); // للتحقق من كامل الاستجابة

            if (!response.ok) {
                if (responseData.message === "Authorization failed") {
                    alert("Session expired or insufficient permissions. Please login again.");
                    window.location.href = "./login.html";
                    return;
                }
                throw new Error(responseData.message || "Failed to add the project. Please try again.");
            }

            // Show success message
            successMessage.style.display = "block";
            
            // Reset form and selects
            addSugProjForm.reset();
            collegeSelect.value = "";
            departmentSelect.innerHTML = '<option value="">Select a Department</option>';
            
            setTimeout(() => {
                window.location.href = "./index.html";
            }, 2000);

        } catch (error) {
            console.error("Error:", error.message);
            alert(error.message);
        }
    });
});