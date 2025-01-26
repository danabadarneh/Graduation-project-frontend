document.addEventListener("DOMContentLoaded", () => {
    const collegeSelect = document.getElementById("college");
    const departmentSelect = document.getElementById("department");
    const addSugProjForm = document.getElementById("addSugProjForm");
    const successMessage = document.getElementById("successMessage");
    
    const token = localStorage.getItem("token");
    console.log("Current token:", token);

    // التحقق من التوكن
    if (!token) {
        Swal.fire({
            icon: "error",
            title: "Unauthorized",
            text: "You need to log in first!",
        }).then(() => {
            window.location.href = "./login.html";
        });
        return;
    }

    // جلب الكليات
    fetch("http://localhost:4000/College/getColleges", {
        headers: { "Authorization": `Seraj__ ${token}` }
    })
    .then(response => {
        if (!response.ok) throw new Error("Authorization failed");
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
        Swal.fire({
            icon: "error",
            title: "Error",
            text: error.message,
        }).then(() => {
            if (error.message === "Authorization failed") {
                window.location.href = "./login.html";
            }
        });
    });

    // تحديث الأقسام بناءً على الكلية
    collegeSelect.addEventListener("change", event => {
        const collegeId = event.target.value;
        departmentSelect.innerHTML = '<option value="">Select a Department</option>';

        if (collegeId) {
            fetch(`http://localhost:4000/College/getDepartmentsByCollege/${collegeId}`, {
                headers: { "Authorization": `Seraj__ ${token}` }
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
            .catch(error => {
                console.error("Error fetching departments:", error);
            });
        }
    });

    // إرسال البيانات
    addSugProjForm.addEventListener("submit", async event => {
        event.preventDefault();

        const projectData = {
            projectName: document.getElementById("projectName").value,
            supervisor: document.getElementById("supervisor").value,
            collegeId: document.getElementById("college").value,
            departmentId: document.getElementById("department").value,
            projectIdea: document.getElementById("projectIdea").value
        };

        // التحقق من صحة البيانات
        if (!projectData.projectName || !projectData.supervisor || 
            !projectData.collegeId || !projectData.departmentId || !projectData.projectIdea) {
            Swal.fire({
                icon: "warning",
                title: "Missing Fields",
                text: "Please fill in all fields.",
            });
            return;
        }

        try {
            Swal.fire({
                title: "Saving...",
                text: "Please wait while the project is being added.",
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                },
            });

            const response = await fetch("http://localhost:4000/SuggestedProjects/AddSuggestedProjects", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Seraj__ ${token}`
                },
                body: JSON.stringify(projectData)
            });

            const responseData = await response.json();

            if (!response.ok) {
                if (responseData.message === "Authorization failed") {
                    Swal.fire({
                        icon: "error",
                        title: "Authorization Failed",
                        text: "Session expired. Please log in again.",
                    }).then(() => {
                        window.location.href = "./login.html";
                    });
                    return;
                }
                throw new Error(responseData.message || "Failed to add the project.");
            }

            Swal.fire({
                icon: "success",
                title: "Project Added",
                text: "The project has been successfully added!",
            }).then(() => {
                addSugProjForm.reset();
                collegeSelect.value = "";
                departmentSelect.innerHTML = '<option value="">Select a Department</option>';
                window.location.href = "./index.html";
            });

        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: error.message,
            });
        }
    });
});
