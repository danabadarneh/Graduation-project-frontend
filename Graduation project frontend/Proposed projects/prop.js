// دالة لتحميل الأقسام بناءً على الكلية المحددة
function loadDepartmentsByCollege(collegeName) {
    // تأكد من أن الكلية ليست فارغة
    if (!collegeName) return;

    fetch(`http://localhost:4000/SuggestedProjects/getDepartmentsByCollege/${collegeName}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            const departmentSelect = document.getElementById('departmentSelect');
            departmentSelect.innerHTML = ''; 
            data.departments.forEach(department => {
                const option = document.createElement('option');
                option.value = department.name;
                option.textContent = department.name;
                departmentSelect.appendChild(option);
            });
        } else {
            showCustomAlert('Error loading departments');
        }
    })
    .catch(error => {
        showCustomAlert('Error: ' + error.message);
    });
}

// دالة للحجز
function reserve() {
    const projectID = document.getElementById('projectID').innerText;
    const studentNames = [];
    const studentIDs = [];

    // جمع أسماء الطلاب وأرقام التسجيل من الحقول
    document.querySelectorAll('#studentNamesContainer input').forEach(input => {
        studentNames.push(input.value);
    });

    document.querySelectorAll('#studentIDsContainer input').forEach(input => {
        studentIDs.push(input.value);
    });

    // إعداد البيانات لإرسالها إلى السيرفر
    const teamMembers = studentNames.map((name, index) => ({
        email: `${name.toLowerCase().replace(' ', '.')}.${studentIDs[index]}@students.ptuk.edu`,
        name: name,
        registrationNumber: studentIDs[index]
    }));

    // إرسال الطلب إلى الباك إند
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

// دالة لعرض تفاصيل المشروع
function showDescription(projectName, projectDescription, projectID) {
    document.getElementById('projectName').innerText = projectName;
    document.getElementById('projectDescription').innerText = projectDescription;
    document.getElementById('projectID').innerText = projectID;

    // فتح نافذة الوصف
    document.getElementById('projectDescriptionModal').style.display = 'block';
}

function closeProjectDescriptionModal() {
    // إغلاق نافذة الوصف
    document.getElementById('projectDescriptionModal').style.display = 'none';
}

// دالة لعرض رسالة التنبيه المخصصة
function showCustomAlert(message) {
    document.getElementById('customAlertContent').innerText = message;
    document.getElementById('customAlertOverlay').style.display = 'block';
}

function closeCustomAlert() {
    document.getElementById('customAlertOverlay').style.display = 'none';
}
