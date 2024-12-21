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
  // Function to add a new input field for student names
  function addStudentNameField() {
    const container = document.getElementById('studentNamesContainer');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter Your University Email ';
    container.appendChild(input);
}

// Function to add a new input field for student IDs
function addStudentIDField() {
    const container = document.getElementById('studentIDsContainer');
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Enter University ID';
    container.appendChild(input);
}

// Reserve function (for demonstration)
function reserve() {
    alert('Booking completed!');
    closeModal();
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
}
function showCustomAlert(message) {
    document.getElementById('customAlertContent').innerText = message;
    document.getElementById('customAlertOverlay').style.display = 'block';
}

function showProjectModal(projectName, projectDescription) {
    document.getElementById('projectName').innerText = projectName;
    document.getElementById('projectDescription').innerText = projectDescription;
    document.getElementById('myModal').style.display = 'block';
}
function showDescription(name, description, projectID) {
    // Get modal elements
    const modal = document.getElementById('projectDescriptionModal');
    const projectNameElement = document.getElementById('projectName');
    const projectDescriptionElement = document.getElementById('projectDescription');
    const projectIDElement = document.getElementById('projectID');
  
    // Update modal content
    projectNameElement.innerText = name;
    projectDescriptionElement.innerText = description;
    projectIDElement.innerText = "Project ID: " + projectID;
  
    // Show the modal
    modal.style.display = 'block';
  }
  
  function closeModal() {
    const modal = document.getElementById('projectDescriptionModal');
    modal.style.display = 'none';
  }
  function closeModal() {
    const modal = document.getElementById('projectDescriptionModal');
    
    // Reset the content of the modal (optional)
    const projectNameElement = document.getElementById('projectName');
    const projectDescriptionElement = document.getElementById('projectDescription');
    const projectIDElement = document.getElementById('projectID');
  
    projectNameElement.innerText = '';
    projectDescriptionElement.innerText = '';
    projectIDElement.innerText = '';
  
    // Hide the modal
    modal.style.display = 'none';
  }
  function showDescription(name, description, projectID) {
    // Get modal elements
    const modal = document.getElementById('projectDescriptionModal');
    const projectNameElement = document.getElementById('projectName');
    const projectDescriptionElement = document.getElementById('projectDescription');
    const projectIDElement = document.getElementById('projectID');
  
    // Set modal content
    projectNameElement.innerText = name;
    projectDescriptionElement.innerText = description;
    projectIDElement.innerText = "Project ID: " + projectID;
  
    // Show the modal
    modal.style.display = 'block';
  }
  
  function closeCustomAlert() {
    const modal = document.getElementById('projectDescriptionModal');
    modal.style.display = 'none';  // Close the modal when "Cancel" is clicked
  }
  

