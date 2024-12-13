
let dropdownBtnText = document.getElementById("drop-text");
let span = document.getElementById("span");
let icon = document.getElementById("icon");
let list = document.getElementById("list");
let input = document.getElementById("search-input");
let listItems = document.querySelectorAll(".dropdown-list-item");
let searchButton = document.querySelector(".search-button");

// Toggle dropdown when clicking the dropdown button
dropdownBtnText.onclick = function () {
  list.classList.toggle("show");
  icon.style.rotate = list.classList.contains("show") ? "-180deg" : "0deg";
};

// Toggle dropdown when clicking the search button
searchButton.onclick = function () {
  list.classList.toggle("show");
  icon.style.rotate = list.classList.contains("show") ? "-180deg" : "0deg";
};

// Close dropdown when clicking outside
window.onclick = function (e) {
  if (
    e.target.id !== "drop-text" &&
    e.target.id !== "icon" &&
    e.target.id !== "span" &&
    e.target.className !== "search-button" &&
    !e.target.closest(".dropdown")
  ) {
    list.classList.remove("show");
    icon.style.rotate = "0deg";
  }
};

// Update placeholder and dropdown text based on the selected item
for (item of listItems) {
  item.onclick = function (e) {
    span.innerText = e.target.innerText;
    if (e.target.innerText == "Everything") {
      input.placeholder = "Search Anything...";
    } else {
      input.placeholder = "Search in " + e.target.innerText + "...";
    }
    list.classList.remove("show"); // Close the dropdown after selection
    icon.style.rotate = "0deg";
  };
}


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

// Get all navigation items
const navItems = document.querySelectorAll(".navList");

// Add click event listener to each item
navItems.forEach(item => {
    item.addEventListener("click", function () {
        // Remove 'active' class from all items
        navItems.forEach(nav => nav.classList.remove("active"));

        // Add 'active' class to the clicked item
        this.classList.add("active");
    });
});
