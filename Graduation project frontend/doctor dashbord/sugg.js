    // Fetch projects from API
    async function fetchProjects() {
        const loader = document.getElementById('loader');
        const tableBody = document.querySelector('#projectsTable tbody');
        loader.style.display = 'block'; // Show loader
        
        try {
            const response = await fetch("http://localhost:4000/SuggestedProjects/getSuggestedProjects");
            if (!response.ok) {
                throw new Error(`Error fetching projects: ${response.statusText}`);
            }
            const projects = await response.json();
            // Clear existing table rows
            tableBody.innerHTML = '';
            console.log(projects.projects)
            // Populate table with project data
            projects.projects.forEach((project) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${project.supervisor?.supervisorName || 'N/A'}</td>
                    <td>${project.projectName || 'N/A'}</td>
                    <td>${project.college.collegeName || 'N/A'}</td>
                    <td>${project.department.departmentName || 'N/A'}</td>
                    <td>
                        <button class="btn-icon show" onclick="navigateToPage('${project._id}')">
                            <i class="fa fa-search"></i> Show
                        </button>
                        <button class="btn-icon delete" onclick="showDeleteConfirmation('${project._id}')">
                            <i class="fa fa-trash"></i> Delete
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error:', error.message);
            Swal.fire({
                text: error.message,
                icon: "error",
                customClass: {
                  confirmButton: "custom-confirm-button",
                },
              });
        } finally {
            loader.style.display = 'none'; // Hide loader
        }
    }

    // Navigate to project details page
    function navigateToPage(projectId) {
        console.log("Navigating to details page with ID:", projectId);
        window.location.href = `details.html?id=${projectId}`;
    }

    // Show delete confirmation modal
    function showDeleteConfirmation(projectId) {
        const modal = document.getElementById('deleteModal');
        modal.style.display = 'block';
        modal.dataset.projectId = projectId; // Store project ID for confirmation
    }

    // Confirm delete
    async function confirmDelete() {
        const modal = document.getElementById('deleteModal');
        const projectId = modal.dataset.projectId;
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:4000/SuggestedProjects/deleteSuggestedProjects/${projectId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Seraj__${token}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to delete project.');
            }
            Swal.fire({
                text: "project deleted successfully",
                customClass: {
                  confirmButton: "custom-confirm-button",
                },
              });
            fetchProjects(); // Refresh project list
        } catch (error) {
            Swal.fire({
                text: error.message,
                icon: "error",
                customClass: {
                  confirmButton: "custom-confirm-button",
                },
              });;
        } finally {
            closeModal('deleteModal');
        }
    }

    // Close modal
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = 'none';
    }

    // Fetch projects on page load
    document.addEventListener('DOMContentLoaded', fetchProjects);
