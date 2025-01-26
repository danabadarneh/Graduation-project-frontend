async function fetchProjectDetails() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // إظهار مؤشر التحميل

    try {
        const response = await fetch('http://localhost:4000/SuggestedProjects/getSuggestedProjects');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const projectDetails = await response.json();
        console.log(projectDetails);

        document.getElementById('projectName').value = projectDetails.projectName || 'N/A';
        document.getElementById('supervisor').value = projectDetails.supervisor || 'N/A';
        document.getElementById('college').value = projectDetails.college || 'N/A';
        document.getElementById('department').value = projectDetails.department || 'N/A';
        document.getElementById('projectIdea').value = projectDetails.projectIdea || 'N/A';
    } catch (error) {
        console.error('Error fetching project details:', error);
        Swal.fire({
            text: error.message,
            icon: "error",
            customClass: {
                confirmButton: 'custom-confirm-button',
            },
        });
    } finally {
        loader.style.display = 'none'; // إخفاء مؤشر التحميل
    }
}

window.onload = fetchProjectDetails;

function navigateToIndex() {
    window.location.href = 'index.html';
}