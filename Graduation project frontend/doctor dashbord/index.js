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
 // Show project description in a modal
 
 
let currentButton; // To store the clicked button reference
// Show the delete confirmation modal
function showDeleteConfirmation(button) {
    currentButton = button; // Save the clicked button
    document.getElementById('deleteModal').style.display = 'block'; // Show the modal
}

// Confirm delete: delete the row and close the modal
function confirmDelete() {
    if (currentButton) {
        deleteRow(currentButton); // Call the deleteRow function with the saved button
    }
    closeModal(); // Close the modal
}

// Close the modal without deleting
function closeModal() {
    document.getElementById('deleteModal').style.display = 'none'; // Hide the modal
}

// Function to delete the row
function deleteRow(button) {
    const row = button.closest('tr'); // Find the closest table row
    row.remove(); // Remove the row
}
