document.addEventListener("DOMContentLoaded", () => {
  fetchProjects();
});

const fetchProjects = async () => {
  try {
    console.log('fetched projects');
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "User is not authenticated. Please log in.", "error");
      return;
    }

    const response = await fetch("http://localhost:4000/SuggestedProjects/getUnreservedProjects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Seraj__${token}`, // تضمين التوكن في الطلب
      },
    });
    console.log("Token being sent:", `Seraj__${token}`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const projects = data.projects;
    const tableBody = document.getElementById("projectTableBody");

    tableBody.innerHTML = ""; // Clear previous data

    projects.forEach((project) => {
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${project.supervisor?.supervisorName || "N/A"}</td>
          <td>${project.college?.collegeName || "N/A"}</td>
          <td>${project.department?.departmentName || "N/A"}</td>
          <td>${project.projectName || "N/A"}</td>
          <td>
            <button class="view-btn" onclick="showProjectDescription('${project._id}')">View</button>
            <button class="view-btn" onclick="bookProject('${project._id}')">Book</button>
          </td>
        `;

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    Swal.fire("Error", "Failed to fetch projects. Please try again later.", "error");
  }
};

function showDescription(name, description, projectID) {
  const modal = document.getElementById('projectDescriptionModal');
  const projectNameElement = document.getElementById('projectName');
  const projectDescriptionElement = document.getElementById('projectDescription');
  const projectIDElement = document.getElementById('projectID');

  projectNameElement.innerText = name;
  projectDescriptionElement.innerText = description || "No description available.";
  projectIDElement.innerText = "Project ID: " + projectID;

  modal.style.display = 'block';
}

function closeProjectDescriptionModal() {
  const modal = document.getElementById('projectDescriptionModal');
  modal.style.display = 'none';
}

const bookProject = async (id) => {
  const modal = document.getElementById('bookingModal');
  modal.setAttribute('data-project-id', id);
  modal.style.display = 'flex';
}
function addStudentNameField() {
  const container = document.getElementById('studentNamesContainer');
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter Your colleague Name';
  container.appendChild(input);
}

function addStudentEmailField() {
  const container = document.getElementById('studentEmailsContainer');
  const input = document.createElement('input');
  input.type = 'email';
  input.placeholder = 'Enter Your colleague Email';
  container.appendChild(input);
}

// Function to add a new input field for student IDs
function addStudentIDField() {
  const container = document.getElementById('studentIDsContainer');
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Enter University ID';
  container.appendChild(input);
}

// Reserve function (for demonstration)
async function reserve() {
  const projectId = document.getElementById('bookingModal').getAttribute('data-project-id');

  // جمع بيانات الطلاب
  const studentNames = document.querySelectorAll("#studentNamesContainer input");
  const studentEmails = document.querySelectorAll("#studentEmailsContainer input");
  const studentIDs = document.querySelectorAll("#studentIDsContainer input");

  // تأكيد إدخال جميع البيانات
  if (studentNames.length === 0 || studentEmails.length === 0 || studentIDs.length === 0) {
      Swal.fire("Error", "Please enter at least one student's information.", "error");
      return;
  }

  // إنشاء بيانات الفريق
  const teamMembers = [];
  for (let i = 0; i < studentNames.length; i++) {
      teamMembers.push({
          name: studentNames[i].value.trim(),
          email: studentEmails[i]?.value.trim(),
          registrationNumber: studentIDs[i]?.value.trim()
      });
  }

  // إرسال الطلب إلى السيرفر
  try {
      const token = localStorage.getItem("token");
      if (!token) {
          Swal.fire("Error", "User is not authenticated. Please log in.", "error");
          return;
      }

      const response = await fetch(`http://localhost:4000/SuggestedProjects/ReserveProject/${projectId}`, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Seraj__${token}`
          },
          body: JSON.stringify({ teamMembers })
      });

      const result = await response.json();

      if (!response.ok) {
          throw new Error(result.message || "Failed to reserve project.");
      }

      // إظهار رسالة نجاح وإغلاق المودال
      Swal.fire({
          title: "Success!",
          text: "Project has been booked successfully!",
          icon: "success",
          confirmButtonText: "OK"
      });

      closeModal();

  } catch (error) {
      console.error("Error reserving project:", error);
      Swal.fire("Error", error.message, "error");
  }
}


// Close modal function
function closeModal() {
  const modal = document.getElementById('bookingModal');
  modal.style.display = 'none';
}
// Function to show project description modal
const showProjectDescription = async (id) => {
  try {
    const response = await fetch(`http://localhost:4000/SuggestedProjects/getSuggestedProject/${id}`);
    // if (!response.message) {
    //   throw new Error(`HTTP error! Status: ${response.status}`);
    // }

    const data = await response.json();
    console.log(data);

    // Set project details in modal
    htmlData = `<h4>Project Name</h4><h3>${data.project.projectName}</h3>
      <h4>Project Idea </h4><div>${data.project.projectIdea}</div>`

      Swal.fire({
        title: 'Project Details',
        html: htmlData,
        focusConfirm: false,
        confirmButtonText: 'OK',
        didOpen: () => {
            document.querySelector('.swal2-confirm').style.backgroundColor = '#16423C';
            document.querySelector('.swal2-confirm').style.color = 'white';
        }
    });
    
  } catch (error) {
    console.error("Error fetching project details:", error);
    Swal.fire("Error", "Failed to load project details. Please try again later.", "error");
  }
};