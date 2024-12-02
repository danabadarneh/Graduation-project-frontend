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
// Function to generate and display the table
   // Function to show project description
   function showDescription(description) {
    Swal.fire({
        icon: 'info',
        title: 'Project Description',
        text: description,
        confirmButtonText: 'OK'
    });
}

// Function to delete the row
function deleteRow(button) {
    const row = button.closest('tr'); // Find the closest table row
    row.remove(); // Remove the row
}
    // Toggle the Add Project form visibility
    function toggleAddProjectForm() {
        const form = document.getElementById('addProjectForm');
        form.style.display = form.style.display === 'block' ? 'none' : 'block';
    }

    // Save a new project
    function saveProject() {
        const projectName = document.getElementById('projectName').value;
        const supervisor = document.getElementById('supervisor').value;
        const college = document.getElementById('college').value;
        const department = document.getElementById('department').value;

        if (projectName && supervisor && college && department) {
            const tableBody = document.getElementById('projectTableBody');

            const newRow = `
            <tr>
                <td>${projectName}</td>
                <td>${supervisor}</td>
                <td>${college}</td>
                <td>${department}</td>
                <td>
                    <button class="btn show" onclick="showDescription('Description for ${projectName}')">
                        <i class="fa fa-search"></i> Show
                    </button>
                    <button class="btn delete" onclick="deleteRow(this)">
                        <i class="fa fa-trash"></i> Delete
                    </button>
                </td>
            </tr>`;

            tableBody.insertAdjacentHTML('beforeend', newRow);
            toggleAddProjectForm(); // Hide the form
        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Incomplete Form',
                text: 'Please fill in all fields.',
            });
        }
    }

    // Show project description
    function showDescription(description) {
        Swal.fire({
            icon: 'info',
            title: 'Project Description',
            text: description,
        });
    }

    // Delete a row
    function deleteRow(button) {
        const row = button.closest('tr');
        row.remove();
    }
           // Open Modal
           function openModal() {
            document.getElementById('addProjectModal').style.display = 'block';
            document.getElementById('modalOverlay').style.display = 'block';
        }

        // Close Modal
        function closeModal() {
            document.getElementById('addProjectModal').style.display = 'none';
            document.getElementById('modalOverlay').style.display = 'none';
        }

        // Submit Form
        function submitForm(event) {
            event.preventDefault();
            alert("New project added successfully!");
            closeModal();
        }
        // Function to show the modal
function showDeleteConfirmation(button) {
    document.getElementById('deleteModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
    document.getElementById('deleteModal').style.display = 'none';
}

// Function to confirm deletion
function confirmDelete() {
    alert("Project deleted successfully!"); // Replace with actual deletion logic
    closeModal();
}
