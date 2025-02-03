// async function fetchProjectDetails() {
//     const loader = document.getElementById('loader');
//     loader.style.display = 'block'; // إظهار مؤشر التحميل

//     try {
//         const response = await fetch('http://localhost:4000/SuggestedProjects/getSuggestedProjects');
        
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const projectDetails = await response.json();
//         console.log(projectDetails);

//         document.getElementById('projectName').value = projectDetails.projectName || 'N/A';
//         document.getElementById('supervisor').value = projectDetails.supervisor || 'N/A';
//         document.getElementById('college').value = projectDetails.college || 'N/A';
//         document.getElementById('department').value = projectDetails.department || 'N/A';
//         document.getElementById('projectIdea').value = projectDetails.projectIdea || 'N/A';
//     } catch (error) {
//         console.error('Error fetching project details:', error);
//         Swal.fire({
//             text: error.message,
//             icon: "error",
//             customClass: {
//                 confirmButton: 'custom-confirm-button',
//             },
//         });
//     } finally {
//         loader.style.display = 'none'; // إخفاء مؤشر التحميل
//     }
// }

// window.onload = fetchProjectDetails;

// function navigateToIndex() {
//     window.location.href = 'index.html';
// }

// استخراج projectId من الرابط
function getProjectIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id');
}

// جلب تفاصيل المشروع
async function fetchProjectDetails() {
    const loader = document.getElementById('loader');
    loader.style.display = 'block'; // إظهار مؤشر التحميل

    const projectId = getProjectIdFromURL(); // استخراج ID من الرابط
    if (!projectId) {
        console.error("No project ID found in URL");
        Swal.fire({
            text: "No project selected!",
            icon: "error",
            customClass: {
                confirmButton: 'custom-confirm-button',
            },
        });
        loader.style.display = 'none';
        return;
    }

    try {
        const response = await fetch(`http://localhost:4000/SuggestedProjects/getSuggestedProject/${projectId}`,getSuggestedProjectById);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Project Data:", data);

        // التأكد من أن البيانات موجودة
        if (!data || !data.projectName) {
            throw new Error("Project details not found!");
        }

        // تحديث الصفحة بالتفاصيل
        document.getElementById('projectName').value = data.projectName || 'N/A';
document.getElementById('supervisor').value = data.supervisor?.supervisorName || 'N/A';
document.getElementById('college').value = data.college?.collegeName || 'N/A';
document.getElementById('department').value = data.department?.departmentName || 'N/A';
document.getElementById('projectIdea').value = data.projectIdea || 'N/A';

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

// استدعاء الوظيفة عند تحميل الصفحة
window.onload = fetchProjectDetails;

// زر العودة
function navigateToIndex() {
    window.location.href = 'index.html';
}