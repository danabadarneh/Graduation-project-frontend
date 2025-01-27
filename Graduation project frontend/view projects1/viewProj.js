document.addEventListener("DOMContentLoaded", () => {
    const collegeDropdown = document.getElementById("college-list");
    const departmentDropdown = document.getElementById("department-list");
    const searchButton = document.querySelector(".search-button");
    const projectsTableBody = document.getElementById("projects-table-body");

    // جلب الكليات وإضافتها إلى القائمة
    fetch("http://localhost:4000/College/getColleges")
        .then(response => response.json())
        .then(data => {
            data.forEach(college => {
                const listItem = document.createElement("li");
                listItem.textContent = college.collegeName;
                listItem.dataset.id = college._id;
                listItem.addEventListener("click", () => {
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
                                        document.getElementById("department-span").textContent = department.departmentName;
                                        document.getElementById("department-span").dataset.id = department._id;
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
        const departmentId = document.getElementById("department-span").dataset.id;
        if (!departmentId) {
            alert("Please select a department first!");
            return;
        }

        fetch(`http://localhost:4000/Projects/getProjectsByDepartment/${departmentId}`)
            .then(response => response.json())
            .then(data => {
                projectsTableBody.innerHTML = ""; // تفريغ الجدول قبل إعادة التعبئة

                data.projects.forEach(project => {
                    const row = document.createElement("tr");
                    row.innerHTML = `
                        <td>${project.supervisor || "N/A"}</td>
                        <td>${project.college.collegeName}</td>
                        <td>${project.department.departmentName}</td>
                        <td>${project.similarity || "N/A"}</td>
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
    });
});

// عرض تفاصيل المشروع في النافذة المنبثقة
function showProjectDetails(projectId) {
    fetch(`http://localhost:4000/Projects/getProject/${projectId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("projectName").textContent = data.projectName;
            document.getElementById("projectAbstract").textContent = data.projectIdea || "No abstract provided.";
            document.getElementById("detailsModal").style.display = "block";
        })
        .catch(error => console.error("Error fetching project details:", error));
}

// إغلاق النافذة المنبثقة
function closeModal() {
    document.getElementById("detailsModal").style.display = "none";
}
