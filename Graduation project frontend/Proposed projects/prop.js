document.addEventListener("DOMContentLoaded", async () => {
    const authToken = localStorage.getItem("authToken");


    try {
        const response = await fetch("http://localhost:4000/SuggestedProjects/getUnreservedProjects", {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        console.log(data); // تحقق من هيكل البيانات هنا

        // إذا كانت البيانات تحتوي على مصفوفة داخل كائن، تأكد من الوصول إلى المصفوفة بشكل صحيح
        const projects = data.projects || [];
        if (!Array.isArray(projects)) {
            throw new Error("Expected an array of projects");
        }

        const projectTableBody = document.getElementById("projectTableBody");
        projectTableBody.innerHTML = ""; // Clear existing rows

        projects.forEach(project => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${project.supervisor.supervisorName}</td>
                <td>${project.college.collegeName}</td>
                <td>${project.department.departmentName}</td>
                <td>
                    <button onclick="showDescription('${project.projectName}', '${project.projectDescription}', '${project._id}')">Show</button>
                    <button onclick="openModal()">Book</button>
                </td>
            `;
            projectTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching projects:", error);
        showCustomAlert('Error fetching projects: ' + error.message);
    }
});
function reserve() {
    const projectID = document.getElementById('projectID').innerText;
    const studentNames = [];
    const studentIDs = [];

    // Collect student names and IDs from input fields
    document.querySelectorAll('#studentNamesContainer input').forEach(input => {
        studentNames.push(input.value);
    });

    document.querySelectorAll('#studentIDsContainer input').forEach(input => {
        studentIDs.push(input.value);
    });

    // Prepare data to send to the server
    const teamMembers = studentNames.map((name, index) => ({
        email: `${name.toLowerCase().replace(' ', '.')}.${studentIDs[index]}@students.ptuk.edu`,
        name: name,
        registrationNumber: studentIDs[index]
    }));

    // Send request to backend
    fetch(`http://localhost:4000/SuggestedProjects/ReserveProject/${projectID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ teamMembers: teamMembers })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showCustomAlert('Project reserved successfully!');
        } else {
            showCustomAlert('There was an error reserving the project.');
        }
    })
    .catch(error => {
        showCustomAlert('Error: ' + error.message);
    });
}

function showDescription(projectName, projectDescription, projectID) {
    document.getElementById('projectName').innerText = projectName;
    document.getElementById('projectDescription').innerText = projectDescription;
    document.getElementById('projectID').innerText = projectID;

    // Open description modal
    document.getElementById('projectDescriptionModal').style.display = 'block';
}

function closeProjectDescriptionModal() {
    // Close description modal
    document.getElementById('projectDescriptionModal').style.display = 'none';
}

function showCustomAlert(message) {
    document.getElementById('customAlertContent').innerText = message;
    document.getElementById('customAlertOverlay').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlertOverlay').style.display = 'none';
}

function openModal() {
    document.getElementById('bookingModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

function addStudentNameField() {
    const container = document.getElementById("studentNamesContainer");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter your colleague's name";
    container.appendChild(input);
}

function addStudentIDField() {
    const container = document.getElementById("studentIDsContainer");
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter your colleague's ID";
    container.appendChild(input);
}