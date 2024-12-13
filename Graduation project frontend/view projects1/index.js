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
function navigateToPage() {
    // Redirect to details.html
    window.location.href = "detailss.html";
}
  // Function to show the modal and fetch project details
  async function showProjectDetails(projectId) {
    // Display the modal
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'flex';

    // Fetch project details (simulate with static data or replace with an API call)
    try {
      // Simulating a backend call to fetch project details
      const projectDetails = await fetchProjectFromDatabase(projectId);

      // Update the modal content
      document.getElementById('projectName').textContent = projectDetails.name;
      document.getElementById('projectAbstract').textContent = projectDetails.abstract;
    } catch (error) {
      console.error("Error fetching project details:", error);
      document.getElementById('projectName').textContent = "Error loading project details.";
      document.getElementById('projectAbstract').textContent = "Error loading project details.";
    }
  }

  // Function to fetch project details (replace with an actual database call or backend API)
  async function fetchProjectFromDatabase(projectId) {
    // Example data, replace with a backend call
    const projects = {
      '1': { name: 'AI-Powered Chatbot', abstract: 'This project focuses on building a chatbot using AI and NLP techniques.' }
    };

    // Simulate a delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(projects[projectId]);
      }, 500);
    });
  }

  // Function to close the modal
  function closeModal() {
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'none';
  }
