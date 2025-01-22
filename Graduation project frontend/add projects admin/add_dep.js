document.addEventListener("DOMContentLoaded", () => {
    const collegeSelect = document.getElementById("college");
    const departmentsSelect = document.getElementById("departments");
    const addDepartmentForm = document.getElementById("form");

    const authToken = localStorage.getItem("token");

    // جلب الكليات عند تحميل الصفحة
    fetch("http://localhost:4000/College/getColleges", {
        headers: {
            "Authorization": `Seraj__${authToken}`
        }
    })
        .then(response => {
            if (!response.ok) throw new Error('Failed to fetch colleges');
            return response.json();
        })
        .then(colleges => {
            collegeSelect.innerHTML = '<option value="">Select a College</option>';
            colleges.forEach(college => {
                const option = document.createElement("option");
                option.value = college._id;
                option.textContent = college.collegeName;
                collegeSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error fetching colleges:", error);
        });

    // تحديث الأقسام عند اختيار كلية
    collegeSelect.addEventListener("change", () => {
        const collegeId = collegeSelect.value;
        departmentsSelect.innerHTML = '<option value="">Loading departments...</option>';

        if (!collegeId) {
            departmentsSelect.innerHTML = '<option value="">Select a college first</option>';
            return;
        }

        fetch(`http://localhost:4000/College/getDepartmentsByCollege/${collegeId}`, {
            headers: {
                "Authorization": `Seraj__${authToken}`
            }
        })
            .then(response => {
                if (!response.ok) throw new Error('Failed to fetch departments');
                return response.json();
            })
            .then(data => {
                departmentsSelect.innerHTML = '<option value="">Select Department</option>';
                const departments = data.departments.departments;
                departments.forEach(department => {
                    const option = document.createElement("option");
                    option.value = department._id;
                    option.textContent = department.departmentName;
                    departmentsSelect.appendChild(option);
                });
            })
            .catch(error => {
                console.error("Error fetching departments:", error);
                departmentsSelect.innerHTML = '<option value="">Error loading departments</option>';
            });
    });

    // معالجة إضافة قسم جديد
    addDepartmentForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        const collegeId = collegeSelect.value;
        const departmentName = document.getElementById("collegename").value.trim();

        if (!collegeId || !departmentName) {
            alert("Please fill out all required fields.");
            return;
        }

        const requestData = {
            collegeId: collegeId,
            departmentName: departmentName
        };


        fetch("http://localhost:4000/College/AddDepartment", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Seraj__${authToken}`
            },
            body: JSON.stringify(requestData)
        })
            .then(async response => {
                const responseData = await response.json();
                
                if (!response.ok) {
                    throw new Error(responseData.message || 'Failed to add department');
                }
                
                console.log("Success response:", responseData);
                Swal.fire({
                    text: "department added successfully", 
                    customClass: {
                      confirmButton: "custom-confirm-button",
                    },
                  });
                document.getElementById("collegename").value = "";
                
                // تحديث قائمة الأقسام
                collegeSelect.dispatchEvent(new Event('change'));
            })
            .catch(error => {
                Swal.fire({
                    text: error.message,
                    customClass: {
                      confirmButton: "custom-confirm-button",
                    },
                  });
            });
    });
});