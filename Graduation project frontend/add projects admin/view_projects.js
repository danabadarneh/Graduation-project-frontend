document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("table tbody");

    // Fetch projects and populate the table
    fetch("http://localhost:4000/Projects/getProjects")
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log(data)
            tableBody.innerHTML = "";

            // Loop through the projects and create rows
            data.projects.forEach((project) => {
                const row = document.createElement("tr");

                // Create table cells
                row.innerHTML = `
                    <td>${project.projectName}</td>
                    <td>${project.supervisor?.supervisorName}</td>
                    <td>${project.college.collegeName}</td>
                    <td>${project.department.departmentName}</td>
                    <td>
                        <button class="btn-icon show" onclick="redirectToProjectDetails('${project._id}')">
                            <i class="fa fa-search"></i> Show
                        </button>
                        <button class="btn-icon delete" onclick="deleteProject('${project._id}', this)">
                            <i class="fa fa-trash"></i> Delete
                        </button>
                    </td>
                `;

                // Append the row to the table body
                tableBody.appendChild(row);
            });
        })
        .catch((error) => {
            Swal.fire({
                text: error.message,
                customClass: {
                  confirmButton: "custom-confirm-button",
                },
              });
        });
});
function redirectToProjectDetails(projectId) {
    window.location.href = `details.html?projectId=${projectId}`;
}
// Function to delete a project
function deleteProject(projectId, button) {
    const authToken = localStorage.getItem("token");

    fetch(`http://localhost:4000/Projects/deleteProjects/${projectId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Seraj__${authToken}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to delete project: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            Swal.fire({
                text: "project deleted successfully",
                customClass: {
                  confirmButton: "custom-confirm-button",
                },
              });
            // Remove the row from the table
            const row = button.closest("tr");
            row.remove();
        })
        .catch((error) => {
            Swal.fire({
                text: error.message,
                customClass: {
                  confirmButton: "custom-confirm-button",
                },
              });
        });
}
