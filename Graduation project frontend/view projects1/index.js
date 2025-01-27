// عناصر القوائم المنسدلة
let collegeDropdownBtnText = document.getElementById("college-drop-text");
let collegeSpan = document.getElementById("college-span");
let collegeIcon = document.getElementById("college-icon");
let collegeList = document.getElementById("college-list");

let departmentDropdownBtnText = document.getElementById("department-drop-text");
let departmentSpan = document.getElementById("department-span");
let departmentIcon = document.getElementById("department-icon");
let departmentList = document.getElementById("department-list");

// عنصر البحث وزر البحث
let searchInput = document.getElementById("search-input");
let searchButton = document.querySelector(".search-button");

// العناصر داخل جدول المشاريع
let projectsTableBody = document.getElementById("projects-table-body");

// العناصر الخاصة بالمودال (عرض التفاصيل)
let detailsModal = document.getElementById("detailsModal");
let projectName = document.getElementById("projectName");
let projectAbstract = document.getElementById("projectAbstract");

// دوال التحكم في القوائم المنسدلة
function toggleDropdown(list, icon) {
    list.classList.toggle("show");
    icon.style.transform = list.classList.contains("show") ? "rotate(-180deg)" : "rotate(0deg)";
}

// فتح/إغلاق قائمة الكليات
collegeDropdownBtnText.onclick = function () {
    toggleDropdown(collegeList, collegeIcon);
};

// فتح/إغلاق قائمة الأقسام
departmentDropdownBtnText.onclick = function () {
    toggleDropdown(departmentList, departmentIcon);
};

// إغلاق القوائم عند الضغط خارجها
window.onclick = function (e) {
    if (!e.target.closest(".dropdown")) {
        collegeList.classList.remove("show");
        collegeIcon.style.transform = "rotate(0deg)";
        departmentList.classList.remove("show");
        departmentIcon.style.transform = "rotate(0deg)";
    }
};

// زر البحث
searchButton.onclick = function () {
    const searchText = searchInput.value.trim();
    if (searchText) {
        // تنفيذ البحث بناءً على النص المدخل
        console.log(`بحث عن: ${searchText}`);
    } else {
        Swal.fire("Please enter a search term.");
    }
};

// عرض تفاصيل المشروع
async function showProjectDetails(projectId) {
    detailsModal.style.display = "flex";
    try {
        const response = await fetch(`http://localhost:4000/Projects/getProjects`);
        const data = await response.json();
        const project = data.projects.find(p => p._id === projectId);
        if (project) {
            projectName.textContent = project.projectName;
            projectAbstract.textContent = project.projectIdea;
        } else {
            projectName.textContent = "Project not found.";
            projectAbstract.textContent = "";
        }
    } catch (error) {
        console.error("Error fetching project details:", error);
        projectName.textContent = "Error loading project details.";
        projectAbstract.textContent = "";
    }
}

// إغلاق المودال
function closeModal() {
    detailsModal.style.display = "none";
}

// دالة إغلاق المودال
function closeModal() {
    const modal = document.getElementById("detailsModal");
    modal.style.display = "none";
}

// إضافة تأثير النشط على قائمة التنقل
const navItems = document.querySelectorAll(".navList");
navItems.forEach(item => {
    item.addEventListener("click", function () {
        // إزالة الحالة النشطة من جميع العناصر
        navItems.forEach(nav => nav.classList.remove("active"));

        // إضافة الحالة النشطة للعنصر الذي تم النقر عليه
        this.classList.add("active");
    });
});
