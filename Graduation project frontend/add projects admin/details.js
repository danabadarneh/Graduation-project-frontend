
// Extract projectId from the URL
function getProjectId() {
    const params = new URLSearchParams(window.location.search);
    return params.get("projectId");
}

// Fetch and display project details
document.addEventListener("DOMContentLoaded", () => {
    const projectId = getProjectId();
    const container = document.querySelector(".container");

    if (!projectId) {
        container.innerHTML = "<p>Invalid Project ID. Please go back and try again.</p>";
        return;
    }

    fetch(`http://localhost:4000/Projects/getProject/${projectId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            const project = data.project;

            // Populate the page with project details
            container.innerHTML = `
                <h1>${project.projectName}</h1>
                <div class="detail">
                    <label>Supervisor:</label>
                    <p>${project.supervisor?.supervisorName || "N/A"}</p>
                </div>
                <div class="detail">
                    <label>College:</label>
                    <p>${project.college.collegeName}</p>
                </div>
                <div class="detail">
                    <label>Department:</label>
                    <p>${project.department.departmentName}</p>
                </div>
                <div class="detail">
                    <label>Project Idea:</label>
                    <p>${project.projectIdea}</p>
                </div>
                <div class="detail">
                    <label>Project File:</label>
                    <p>
                        ${
                            project.projectFile
                                ? `<a href="http://localhost:4000/${project.projectFile.replace(
                                      /\\/g,
                                      "/"
                                  )}" target="_blank">${project.projectName}</a>`
                                : "No file uploaded."
                        }
                    </p>
                </div>
                <a href="index.html" class="back-btn">Back to Projects</a>
            `;
        })
        .catch((error) => {
            console.error("Error fetching project details:", error);
            container.innerHTML = `<p>Failed to load project details. Please try again later.</p>`;
        });
});
