document.addEventListener("DOMContentLoaded", () => {
    fetchProjects();
  });
  
  const fetchProjects = async () => {
    try {
      console.log('test');
     const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/SuggestedProjects/getSuggestedProjects",{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Seraj__${token}`, // تضمين التوكن في الطلب
        },
      });
      console.log('test',response);
  

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
  
  const bookProject = async (id) => {
  const modal = document.getElementById('bookingModal');
  modal.style.display ='flex';
  }
  function addStudentNameField() {
    const container = document.getElementById('studentNamesContainer');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter Your University Email ';
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
function reserve() {
    alert('Booking completed!');
    closeModal();
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
}
  // Function to show project description modal
  const showProjectDescription = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/SuggestedProjects/getSuggestedProjectById/${id}`);
      // if (!response.message) {
      //   throw new Error(`HTTP error! Status: ${response.status}`);
      // }
  
      const data = await response.json();
      console.log(data);
      
      // Set project details in modal
      htmlData=`<input type="text" readonly value="${data.project.projectName}" >
      <input type="text" readonly value="${data.project.projectIdea}">`

      Swal.fire({
        title: 'Project Details',
        html:htmlData,
        confirmButtonText: 'Submit',
        focusConfirm: false
      });
    } catch (error) {
      console.error("Error fetching project details:", error);
      Swal.fire("Error", "Failed to load project details. Please try again later.", "error");
    }
  };  
  
  // Function to close the modal
  const closeProjectDescriptionModal = () => {
    document.getElementById("projectDescriptionModal").style.display = "none";
  };
  