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
async function reserve() {
    const projectID = document.getElementById('projectID').innerText;
    const studentNames = [];
    const studentIDs = [];

    // التحقق من الحقول الفارغة
    const studentNamesInputs = document.querySelectorAll('#studentNamesContainer input');
    const studentIDsInputs = document.querySelectorAll('#studentIDsContainer input');

    let hasEmptyFields = false;
    studentNamesInputs.forEach(input => {
        if (!input.value.trim()) {
            hasEmptyFields = true;
        } else {
            studentNames.push(input.value.trim());
        }
    });

    studentIDsInputs.forEach(input => {
        if (!input.value.trim()) {
            hasEmptyFields = true;
        } else {
            studentIDs.push(input.value.trim());
        }
    });

    if (hasEmptyFields) {
        showCustomAlert('يرجى ملء جميع حقول أسماء الطلاب وأرقامهم الجامعية');
        return; // الخروج من الدالة إذا كانت هناك حقول فارغة
    }

     // التحقق من تطابق عدد الأسماء مع الأرقام الجامعية
     if (studentNames.length !== studentIDs.length) {
        showCustomAlert('عدد الأسماء لا يتطابق مع عدد الأرقام الجامعية');
        return;
    }

    // Prepare data to send to the server
    const teamMembers = studentNames.map((name, index) => ({
        email: `${name.toLowerCase().replace(' ', '.')}.${studentIDs[index]}@students.ptuk.edu`,
        name: name,
        registrationNumber: studentIDs[index]
    }));

    document.getElementById('loadingSpinner').style.display = 'block'; // إظهار spinner

    try {
    // Send request to backend
    const response= await fetch(`http://localhost:4000/SuggestedProjects/ReserveProject/${projectID}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ teamMembers: teamMembers })
    });
    const data = await response.json();

        if (data.success) {
            showCustomAlert('تم حجز المشروع بنجاح!');
            closeModal(); // إغلاق النافذة المنبثقة بعد الحجز
        } else {
            showCustomAlert('حدث خطأ أثناء حجز المشروع: ' + (data.message || ''));
        }
    } catch (error) {
        showCustomAlert('خطأ في الاتصال بالخادم: ' + error.message);
    } finally {
        document.getElementById('loadingSpinner').style.display = 'none'; // إخفاء spinner
    }
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
    Swal.fire({
        icon: 'info',
        title: 'ALERT',
        text: message,
        confirmButtonText: 'OK'
    });
}

function openModal(projectID) {
    document.getElementById('projectID').innerHTML = projectID;
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