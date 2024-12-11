const formOpenBtn = document.querySelector("#form-open"),
  home = document.querySelector(".home"),
  formContainer = document.querySelector(".form_container"),
  formCloseBtn = document.querySelector(".form_close"),
  signupBtn = document.querySelector("#signup"),
  loginBtn = document.querySelector("#login"),
  pwShowHide = document.querySelectorAll(".pw_hide");

formOpenBtn.addEventListener("click", () => home.classList.add("show"));
formCloseBtn.addEventListener("click", () => home.classList.remove("show"));

pwShowHide.forEach((icon) => {
  icon.addEventListener("click", () => {
    let getPwInput = icon.parentElement.querySelector("input");
    if (getPwInput.type === "password") {
      getPwInput.type = "text";
      icon.classList.replace("uil-eye-slash", "uil-eye");
    } else {
      getPwInput.type = "password";
      icon.classList.replace("uil-eye", "uil-eye-slash");
    }
  });
});

signupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.add("active");
});
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formContainer.classList.remove("active");
});
// Dropdown toggle functionality
document.addEventListener('DOMContentLoaded', () => {
  const dropdown = document.querySelector('.dropdown');
  const dropdownBtn = document.querySelector('.dropdown-btn');

  dropdownBtn.addEventListener('click', () => {
    dropdown.classList.toggle('open'); // Toggle the dropdown menu visibility
  });

  // Close the dropdown if clicking outside
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('select');
    
    select.addEventListener('change', () => {
      if (select.value) {
        select.style.color = '#333'; // Regular text color for selected value
      } else {
        select.style.color = '#888'; // Placeholder color
      }
    });
  
    // Initial color for placeholder
    select.style.color = '#888';
  });

  const collegeDropdown = document.getElementById("college");
const departmentDropdown = document.getElementById("department");



collegeDropdown.addEventListener("change", function () {
  const selectedCollege = this.value;
  departmentDropdown.innerHTML = '<option value="" disabled selected>Select your department</option>'; // Reset departments

  if (selectedCollege && departments[selectedCollege]) {
    departments[selectedCollege].forEach(dept => {
      const option = document.createElement("option");
      option.value = dept.toLowerCase().replace(/ /g, "-");
      option.textContent = dept;
      departmentDropdown.appendChild(option);
    });
  }
});
const departments = {
    engineering: ["Computer Systems Engineering", "Electrical Engineering", "Civil Engineering", "Mechanical Engineering"],
    math: ["Mathematics", "Applied Mathematics"],
    sport: ["Sports Science", "Physical Education"]
  };
  
