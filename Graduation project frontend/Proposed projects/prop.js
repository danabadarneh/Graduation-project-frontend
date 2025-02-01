document.addEventListener("DOMContentLoaded", () => {
    fetchProjects();
  });
  
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:4000/SuggestedProjects/getAllUnreservedProjects");
  
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
            <button class="view-btn" onclick="showProjectDescription('${project._id}')">Book</button>
          </td>
        `;
  
        tableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching projects:", error);
      Swal.fire("Error", "Failed to fetch projects. Please try again later.", "error");
    }
  };
  
  // Function to show project description modal
  const showProjectDescription = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/SuggestedProjects/getUnreservedProject/${id}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Set project details in modal
      document.getElementById("projectName").textContent = `Project Name: ${data.projects[0].projectName}`;
      document.getElementById("projectDescription").textContent = `Project Idea: ${data.projects[0].projectIdea}`;
      document.getElementById("projectDescriptionModal").style.display = "block";
  
    } catch (error) {
      console.error("Error fetching project details:", error);
      Swal.fire("Error", "Failed to load project details. Please try again later.", "error");
    }
  };  
  
  // Function to close the modal
  const closeProjectDescriptionModal = () => {
    document.getElementById("projectDescriptionModal").style.display = "none";
  };
  