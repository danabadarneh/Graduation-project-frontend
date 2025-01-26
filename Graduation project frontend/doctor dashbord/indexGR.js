document.addEventListener("DOMContentLoaded", () => {
    const authToken = localStorage.getItem("token");

    // Fetch and display project reservation requests
    fetch("http://localhost:4000/Supervisor/GetSupervisorGroups/67719b49c04ba5850d805cb8", {
        headers: {
            "Authorization": `Seraj__${authToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const requestsTable = document.querySelector(".data-table.activityTable table tbody");
        requestsTable.innerHTML = ""; // Clear existing rows

        data.requests.forEach(request => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${request.department}</td>
                <td>${request.college}</td>
                <td>${request.projectName}</td>
                <td>${request.students.map(student => student.name).join(", ")}</td>
                <td>${request.students.map(student => student.registrationNumber).join("<br>")}</td>
                <td>
                    <button class="btn-icon show" onclick="approveRequest('${request._id}', true)">
                        <i class="fa fa-check"></i> accept
                    </button>
                    <button class="btn-icon delete" onclick="approveRequest('${request._id}', false)">
                        <i class="fa fa-trash"></i> reject
                    </button>
                </td>
            `;
            requestsTable.appendChild(row);
        });
    })
    .catch(error => {
        console.error("Error fetching reservation requests:", error);
        Swal.fire({
            text: error.message,
            icon: "error",
            customClass: {
                confirmButton: 'custom-confirm-button',
            },
        });
    });

    // Fetch and display supervisor's groups
    fetch("http://localhost:4000/Supervisor/GetSupervisorGroups/67719b49c04ba5850d805cb8", {
        headers: {
            "Authorization": `Seraj__${authToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const groupsContainer = document.querySelector(".card-container");
        groupsContainer.innerHTML = ""; // Clear existing cards

        data.groups.forEach(group => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <div class="card-img-holder">
                    <img src="img/img1.png" alt="Blog image">
                </div>
                <h3 class="blog-title">Project Name: ${group.projectName}</h3>
                <span class="blog-time">GROUP WORK<br>${group.students.map(student => student.name).join("<br>")}</span>
                <div class="options">
                    <span>Follow the team's progress</span>
                    <button class="btn" onclick="location.href='indextodo.html'">Show</button>
                </div>
            `;
            groupsContainer.appendChild(card);
        });
    })
    .catch(error => {
        console.error("Error fetching supervisor's groups:", error);
        Swal.fire({
            text: error.message,
            icon: "error",
            customClass: {
                confirmButton: 'custom-confirm-button',
            },
        });
    });
});

function approveRequest(requestId, approved) {
    const authToken = localStorage.getItem("token");

    fetch(`http://localhost:4000/Supervisor/approveOrRejectReservation/${requestId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Seraj__${authToken}`
        },
        body: JSON.stringify({ approved })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        Swal.fire({
            text: data.message,
            icon: approved ? "success" : "error",
            customClass: {
                confirmButton: 'custom-confirm-button',
            },
        });
        // Refresh the page or update the UI as needed
    })
    .catch(error => {
        console.error("Error approving/rejecting request:", error);
        Swal.fire({
            text: error.message,
            icon: "error",
            customClass: {
                confirmButton: 'custom-confirm-button',
            },
        });
    });
}