document.addEventListener("DOMContentLoaded", () => {
    const collegeSelect = document.getElementById("college");
    const departmentSelect = document.getElementById("department");
    const form = document.getElementById("addDoctorForm");

    const authToken = localStorage.getItem("token");

    // Fetch colleges on page load
    fetch("http://localhost:4000/College/getColleges", {
        headers: {
            Authorization: `Seraj__${authToken}`,
        },
    })
        .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch colleges");
            return response.json();
        })
        .then((data) => {
            collegeSelect.innerHTML = '<option value="" disabled selected>Select College</option>';
            data.forEach((college) => {
                const option = document.createElement("option");
                option.value = college._id;
                option.textContent = college.collegeName;
                collegeSelect.appendChild(option);
            });
        })
        .catch((error) => {
            console.error("Error fetching colleges:", error);
            alert("Failed to load colleges. Please try again.");
        });

    // Update departments when a college is selected
    collegeSelect.addEventListener("change", (event) => {
        const collegeId = event.target.value;
        departmentSelect.innerHTML = '<option value="" disabled selected>Select Department</option>';

        if (!collegeId) {
            alert("Please select a valid college.");
            return;
        }

        fetch(`http://localhost:4000/College/getDepartmentsByCollege/${collegeId}`, {
            headers: {
                Authorization: `Seraj__${authToken}`,
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to fetch departments");
                return response.json();
            })
            .then((data) => {
                console.log("API Response for departments:", data);

                // Assuming the response is { departments: { departments: [...] } }
                const departments = data.departments?.departments;

                if (!departments || !Array.isArray(departments)) {
                    throw new Error("Invalid departments structure");
                }

                departments.forEach((department) => {
                    const option = document.createElement("option");
                    option.value = department._id;
                    option.textContent = department.departmentName;
                    departmentSelect.appendChild(option);
                });
            })
            .catch((error) => {
                console.error("Error fetching departments:", error);
                alert("Failed to load departments. Please try again.");
            });
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

        fetch("http://localhost:4000/College/AddSupervisor", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer Seraj__${authToken}`,
            },
            body: JSON.stringify(doctorData),
        })
            .then(async (response) => {
                const text = await response.text(); // قراءة الاستجابة كـ نص
                console.log("Server Response:", text); // طباعة الاستجابة
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return JSON.parse(text); // تحويل النص إلى JSON إذا كانت الاستجابة صالحة
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