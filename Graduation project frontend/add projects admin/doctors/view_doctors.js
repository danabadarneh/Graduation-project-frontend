document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("table tbody");

    // Fetch projects and populate the table
    fetch("http://localhost:4000/Supervisor/GetSupervisors")
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
            data.supervisors.forEach((supervisor) => {
                const row = document.createElement("tr");

                // Create table cells
                row.innerHTML = `
                    <td>${supervisor.supervisorName}</td>
                    <td>${supervisor.college?.collegeName}</td>
                    <td>${supervisor.department?.departmentName}</td>
                    <td>${supervisor.email}</td>
                    <td>
                        <button class="btn-icon delete" onclick="deleteProject('${supervisor._id}', this)">
                            <i class="fa fa-trash"></i> Delete
                        </button>
                    </td>
                `;

                // Append the row to the table body
                tableBody.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Error fetching projects:", error);
            alert("Failed to fetch projects. Please try again.");
        });
});


// Function to delete a project
function deleteProject(supervisorId, button) {
    const authToken = localStorage.getItem("token");

    fetch(`http://localhost:4000/Supervisor/DeleteSupervisor/${supervisorId}`, {
        method: "DELETE",
        headers: {
            Authorization: `Seraj__${authToken}`,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to delete supervisor: ${response.statusText}`);
            }
            return response.json();
        })
        .then((data) => {
            alert("Supervisor deleted successfully.");
            // Remove the row from the table
            const row = button.closest("tr");
            row.remove();
        })
        .catch((error) => {
            console.error("Error deleting supervisor:", error);
            alert("Failed to delete supervisor. Please try again.");
        });
}
