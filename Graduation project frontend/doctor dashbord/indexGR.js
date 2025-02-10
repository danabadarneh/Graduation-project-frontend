// Fetch data from the API and populate the table
  async function fetchData() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/SuggestedProjects/getPendingProjects',{ method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Seraj__${token}`,
            }});
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const res = await response.json();
        console.log("api responce:", res);
        if (!res.projects || res.projects.length === 0){
            console.log("No projects found");
            return;
        }
        populateTable(res.projects);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Populate the table dynamically
function populateTable(projects) {
    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    projects.forEach((project) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${project.department.departmentName}</td>
            <td>${project.college.collegeName}</td>
            <td>${project.projectName}</td>
            <td>${project.reservation.teamMembers?.map((s) => s.name).join(', ')}</td>
            <td>${project.reservation.teamMembers?.map((s) => s.registrationNumber).join('<br>')}</td>
            <td>
                <button class="btn-icon show" onclick="handleAccept('${project._id}')">
                    <i class="fa fa-check"></i> Accept
                </button>
                <button class="btn-icon delete" onclick="handleReject('${project._id}')">
                    <i class="fa fa-trash"></i> Reject
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Handle Approve Action
async function handleAccept(projectId) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`http://localhost:4000/SuggestedProjects/approveOrRejectReservation/${projectId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Seraj__${token}`,
            },
            body: JSON.stringify({ approved: true}),
        });

        if (!response.ok) {
            throw new Error("Failed to approve the project");
        }

        const result = await response.json();
        console.log("Project approved:", result);

        // Optionally refresh the table
        fetchData();
    } catch (error) {
        console.error("Error approving project:", error);
    }
}

// Handle Reject Action
async function handleReject(projectId) {
    const token = localStorage.getItem("token");
    try {
        const response = await fetch(`http://localhost:4000/SuggestedProjects/approveOrRejectReservation/${projectId}`, {
            method: "POST", // or POST, depending on the API implementation
            headers: {
                "Content-Type": "application/json",
                Authorization: `Seraj__${token}`,
            },
            body: JSON.stringify({ approved: false}),
        });

        if (!response.ok) {
            throw new Error("Failed to reject the project");
        }

        const result = await response.json();
        console.log("Project rejected:", result);

        // Optionally refresh the table
        fetchData();
    } catch (error) {
        console.error("Error rejecting project:", error);
    }
}

// Fetch data when the page loads
document.addEventListener('DOMContentLoaded', fetchData);
