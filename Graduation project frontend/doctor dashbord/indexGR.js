// Fetch data from the API and populate the table
  async function fetchData() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/SuggestedProjects/getUnreservedProjects',{ method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Seraj__${token}`,
            }});
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const projects = await response.json();
        populateTable(projects.projects);
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
            <td>${project.reservation.teamMembers?.map((s) => s._id).join('<br>')}</td>
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

// document.addEventListener("DOMContentLoaded", async () => {
//     const authToken = localStorage.getItem("authToken");

//     // جلب المشاريع غير المحجوزة
//     try {
//         const response = await fetch("http://localhost:4000/SuggestedProjects/getUnreservedProjects", {
//             headers: {
//                 "Authorization": `Bearer ${authToken}`
//             }
//         });
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
//         const data = await response.json();
//         console.log(data); // تحقق من هيكل البيانات هنا

//         const projectTableBody = document.getElementById("projectTableBody");
//         if (!projectTableBody) throw new Error("Element 'projectTableBody' not found");

//         projectTableBody.innerHTML = ""; // Clear existing rows

//         if (Array.isArray(data.projects)) {
//             data.projects.forEach(project => {
//                 const row = document.createElement("tr");
//                 row.innerHTML = `
//                     <td>${project.supervisor?.supervisorName || 'N/A'}</td>
//                     <td>${project.college?.collegeName || 'N/A'}</td>
//                     <td>${project.department?.departmentName || 'N/A'}</td>
//                     <td>${project.projectName || 'N/A'}</td>
//                     <td>${project.students?.map(student => student.name).join(', ') || 'N/A'}</td>
//                     <td>${project.students?.map(student => student.registrationNumber).join('<br>') || 'N/A'}</td>
//                     <td>
//                         <button class="btn-icon show" onclick="acceptProject('${project._id}')">
//                             <i class="fa fa-check"></i> accept
//                         </button>
//                         <button class="btn-icon delete" onclick="rejectProject('${project._id}')">
//                             <i class="fa fa-trash"></i> reject
//                         </button>
//                     </td>
//                 `;
//                 projectTableBody.appendChild(row);
//             });
//         } else {
//             console.error("Expected an array of projects");
//         }
//     } catch (error) {
//         console.error("Error fetching projects:", error);
//         showCustomAlert('Error fetching projects: ' + error.message);
//     }

//     // جلب المجموعات التي تم حجزها والموافقة عليها
//     try {
//         const response = await fetch("http://localhost:4000/Supervisor/GetSupervisorGroups/67719b49c04ba5850d805cb8", {
//             headers: {
//                 "Authorization": `Bearer ${authToken}`
//             }
//         });
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
//         const data = await response.json();
//         console.log(data); // تحقق من هيكل البيانات هنا

//         const cardContainer = document.querySelector(".card-container");
//         if (!cardContainer) throw new Error("Element 'card-container' not found");

//         cardContainer.innerHTML = ""; // Clear existing cards

//         if (Array.isArray(data.groups)) {
//             data.groups.forEach(group => {
//                 const card = document.createElement("div");
//                 card.className = "card";
//                 card.innerHTML = `
//                     <div class="card-img-holder">
//                         <img src="img/img1.png" alt="Blog image">
//                     </div>
//                     <h3 class="blog-title">Project Name: ${group.projectName || 'N/A'}</h3>
//                     <span class="blog-time">GROUP WORK<br>${group.members?.map(member => member.name).join('<br>') || 'N/A'}</span>
//                     <div class="options">
//                         <span>Follow the team's progress</span>
//                         <button class="btn" onclick="location.href='indextodo.html'">Show</button>
//                     </div>
//                 `;
//                 cardContainer.appendChild(card);
//             });
//         } else {
//             console.error("Expected an array of groups");
//         }
//     } catch (error) {
//         console.error("Error fetching approved groups:", error);
//         showCustomAlert('Error fetching approved groups: ' + error.message);
//     }

//     // تحديث الأرقام مباشرة في الفرونت
//     document.querySelector(".box1 .number").innerText = 25;
//     document.querySelector(".box2 .number").innerText = 60;
//     document.querySelector(".box3 .number").innerText = 20;
//     document.querySelector(".box4 .number").innerText = 20;
// });

// function acceptProject(projectId) {
//     const authToken = localStorage.getItem("authToken");

//     fetch(`http://localhost:4000/Supervisor/approveOrRejectReservation/${projectId}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${authToken}`
//         },
//         body: JSON.stringify({ approved: true })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             showCustomAlert('Project accepted successfully!');
//         } else {
//             showCustomAlert('There was an error accepting the project.');
//         }
//     })
//     .catch(error => {
//         showCustomAlert('Error: ' + error.message);
//     });
// }

// function rejectProject(projectId) {
//     const authToken = localStorage.getItem("authToken");

//     fetch(`http://localhost:4000/Supervisor/approveOrRejectReservation/${projectId}`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${authToken}`
//         },
//         body: JSON.stringify({ approved: false })
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             showCustomAlert('Project rejected successfully!');
//         } else {
//             showCustomAlert('There was an error rejecting the project.');
//         }
//     })
//     .catch(error => {
//         showCustomAlert('Error: ' + error.message);
//     });
// }

// function showDeleteConfirmation(button) {
//     const projectId = button.closest('tr').dataset.projectId;
//     document.getElementById('deleteModal').style.display = 'block';
//     document.getElementById('confirmDeleteButton').onclick = () => confirmDelete(projectId);
// }

// function confirmDelete(projectId) {
//     const authToken = localStorage.getItem("authToken");

//     fetch(`http://localhost:4000/SuggestedProjects/deleteProject/${projectId}`, {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${authToken}`
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             showCustomAlert('Project deleted successfully!');
//             document.querySelector(`tr[data-project-id="${projectId}"]`).remove();
//         } else {
//             showCustomAlert('There was an error deleting the project.');
//         }
//     })
//     .catch(error => {
//         showCustomAlert('Error: ' + error.message);
//     });

//     closeModal('deleteModal');
// }

// function showCustomAlert(message) {
//     const customAlertContent = document.getElementById('customAlertContent');
//     if (!customAlertContent) throw new Error("Element 'customAlertContent' not found");

//     customAlertContent.innerText = message;
//     document.getElementById('customAlertOverlay').style.display = 'block';
// }

// function closeCustomAlert() {
//     const customAlertOverlay = document.getElementById('customAlertOverlay');
//     if (!customAlertOverlay) throw new Error("Element 'customAlertOverlay' not found");

//     customAlertOverlay.style.display = 'none';
// }

// function closeModal(modalId) {
//     document.getElementById(modalId).style.display = 'none';
// }