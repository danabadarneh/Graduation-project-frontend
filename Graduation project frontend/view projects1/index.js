document.querySelectorAll(".navList").forEach(function(element) {
    element.addEventListener('click', function() {
      
      document.querySelectorAll(".navList").forEach(function(e) {
        e.classList.remove('active');
    });

      // Add active class to the clicked navList element
      this.classList.add('active');
  
      // Get the index of the clicked navList element
      var index = Array.from(this.parentNode.children).indexOf(this);
  
      // Hide all data-table elements
      document.querySelectorAll(".data-table").forEach(function(table) {
        table.style.display = 'none';
      });
  
      // Show the corresponding table based on the clicked index
      var tables = document.querySelectorAll(".data-table");
      if (tables.length > index) {
        tables[index].style.display = 'block';
      }
    });
  });
const data = {
    columns: [
        { label: 'Project Name', field: 'name' },
        { label: 'College', field: 'College' },
        { label: 'Department', field: 'Department' },
        { label: 'Supervisor', field: 'Supervisor' },
        { label: 'Display', field: 'Display' },
        { label: 'Similarity', field: 'Similarity' }
    ],
    rows: [
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.Anas Melhem', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.Osama Hamed', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'R.Anas Melhem', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'R.Anas Melhem', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.Osama Hamed', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'R.Anas Melhem', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.Osama Hamed', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'R.Anas Melhem', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.Osama Hamed', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.Osama Hamed', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.mohammad khaili', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.Osama Hamed', Display: 'Show', Similarity: '100%' },
        { name: 'answerflow', College: 'engineering', Department: 'computer system engineering', Supervisor: 'DR.Osama Hamed', Display: 'Show', Similarity: '100%' },

        // أضف المزيد من الصفوف إذا لزم الأمر
    ]
};

// Function to generate and display the table
function generateTable(data) {
    const tableContainer = document.getElementById('datatable');
    let table = '<table>';

    // Table headers
    table += '<thead><tr>';
    data.columns.forEach(column => {
        table += `<th onclick="sortTable('${column.field}')">${column.label}</th>`;
    });
    table += '</tr></thead>';

    // Table body
    table += '<tbody>';
    data.rows.forEach(row => {
        table += '<tr>';
        data.columns.forEach(column => {
            if (column.field === 'Display') {
                table += `<td><button class="btn-display" onclick="showMessage('${row.name}')">${row[column.field]}</button></td>`;
            } else {
                table += `<td>${row[column.field]}</td>`;
            }
        });
        table += '</tr>';
    });
    table += '</tbody></table>';

    tableContainer.innerHTML = table;
}
// Function to display message when button is clicked

// Sort function
function sortTable(field) {
    data.rows.sort((a, b) => (a[field] > b[field]) ? 1 : -1);
    generateTable(data);
}

// Generate the initial table
generateTable(data);
// دالة لعرض الرسالة داخل النافذة المنبثقة
function showMessage(projectName, supervisorName) {
    document.getElementById('popupMessage').innerHTML = `<strong>THE NAME OF PROJECT:</strong> ${projectName}<br><strong>SUPERVISOR:</strong> ${supervisorName}<br><strong>ABSTRACT:</strong> ${supervisorName}`;
    document.getElementById('customPopup').style.display = 'flex';
}

// دالة لإغلاق النافذة
function closePopup() {
    document.getElementById('customPopup').style.display = 'none';
}
const tabsBox = document.querySelector(".tabs-box"),
allTabs = tabsBox.querySelectorAll(".tab"),
arrowIcons = document.querySelectorAll(".icon i");
let isDragging = false;
const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
}
arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
        let scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -340 : 340;
        handleIcons(scrollWidth);
    });
});
allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabsBox.querySelector(".active").classList.remove("active");
        tab.classList.add("active");
    });
});
const dragging = (e) => {
    if(!isDragging) return;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX;
    handleIcons(tabsBox.scrollLeft)
}
const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
}
tabsBox.addEventListener("mousedown", () => isDragging = true);
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);