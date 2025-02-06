document.addEventListener("DOMContentLoaded", () => {
    const collegeDropdown = document.getElementById("college-list");
    const departmentDropdown = document.getElementById("department-list");
    const searchButton = document.querySelector(".search-button");
    const searchInput = document.getElementById("search-input");
    const projectsTableBody = document.getElementById("projectsTableBody");

    let selectedCollegeId = null;
    let selectedDepartmentId = null;

    // جلب الكليات وإضافتها إلى القائمة
    fetch("http://localhost:4000/College/getColleges")
        .then(response => response.json())
        .then(data => {
            data.forEach(college => {
                const listItem = document.createElement("li");
                listItem.textContent = college.collegeName;
                listItem.dataset.id = college._id;

                listItem.addEventListener("click", () => {
                    selectedCollegeId = college._id;
                    document.getElementById("college-span").textContent = college.collegeName;
                    document.getElementById("college-span").dataset.id = college._id;

                    // إعادة تعيين الأقسام عند اختيار كلية جديدة
                    departmentDropdown.innerHTML = "";
                    document.getElementById("department-span").textContent = "Department";

                    // جلب الأقسام بناءً على الكلية المختارة
                    fetch(`http://localhost:4000/College/getDepartmentsByCollege/${college._id}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.departments && data.departments.departments) {
                                data.departments.departments.forEach(department => {
                                    const listItem = document.createElement("li");
                                    listItem.textContent = department.departmentName;
                                    listItem.dataset.id = department._id;

                                    listItem.addEventListener("click", () => {
                                        selectedDepartmentId = department._id;
                                        document.getElementById("department-span").textContent = department.departmentName;
                                        document.getElementById("department-span").dataset.id = department._id;

                                        // عرض المشاريع الافتراضية للقسم (100% similarity)
                                        fetchProjects(selectedDepartmentId, null);
                                    });
                                    departmentDropdown.appendChild(listItem);
                                });
                            } else {
                                console.log("No departments found for this college.");
                            }
                        })
                        .catch(error => console.error("Error fetching departments:", error));
                });
                collegeDropdown.appendChild(listItem);
            });
        })
        .catch(error => console.error("Error fetching colleges:", error));

    // البحث عن المشاريع وعرضها في الجدول
    searchButton.addEventListener("click", () => {
        if (!selectedDepartmentId) {
            alert("Please select a department first!");
            return;
        }
        const description = searchInput.value.trim();
        if (description) {
            fetchSimilarityScore(description)
                .then(similarityScore => {
                    fetchProjects(selectedDepartmentId, description, similarityScore);
                })
                .catch(error => {
                    console.error("Error fetching similarity score:", error);
                });
        } else {
            fetchProjects(selectedDepartmentId, null);
        }
    });
    // وظيفة لجلب المشاريع وعرضها في الجدول
    function fetchProjects(departmentId, description, similarityScore = null) {
        const url = description
            ? `http://localhost:4000/Projects/getProjectsByDepartment/${departmentId}?description=${encodeURIComponent(description)}`
            : `http://localhost:4000/Projects/getProjectsByDepartment/${departmentId}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                projectsTableBody.innerHTML = ""; // تفريغ الجدول قبل إعادة التعبئة

                data.projects.forEach(project => {
                    const similarity = similarityScore ? project.similarity : "100%";
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${project.supervisor?.supervisorName || "N/A"}</td>
                        <td>${project.college?.collegeName || "N/A"}</td>
                        <td>${project.department?.departmentName || "N/A"}</td>
                        <td>${similarity}</td>
                        <td>
                            <button class="btn-icon show" onclick="showProjectDetails('${project._id}')">
                                <i class="fa fa-search"></i> Show
                            </button>
                        </td>
                    `;
                    projectsTableBody.appendChild(row);
                });
            })
            .catch(error => console.error("Error fetching projects:", error));
    }

    // وظيفة لتحليل التشابه باستخدام API
    function fetchSimilarityScore(description) {
        return new Promise((resolve, reject) => {
            fetch("http://127.0.0.1:4000/analyze", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text2: description
                })
            })
                .then(response => response.json())
                .then(data => {
                    resolve(data.similarityScore || 100); // إذا لم نجد نتيجة، نفترض 100% تشابه
                })
                .catch(error => reject(error));
        });
    }
});

// عرض تفاصيل المشروع في النافذة المنبثقة
function showProjectDetails(projectId) {
    console.log("project id: ", projectId);
    fetch(`http://localhost:4000/Projects/getProject/${projectId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("projectName").textContent = data.projectName || "No Name Provided";
            document.getElementById("projectAbstract").textContent = data.projectIdea || "No Abstract Provided.";
            document.getElementById("detailsModal").style.display = "block";
        })
        .catch(error => console.error("Error fetching project details:", error));
}

// إغلاق النافذة المنبثقة
function closeModal() {
    document.getElementById("detailsModal").style.display = "none";
}

