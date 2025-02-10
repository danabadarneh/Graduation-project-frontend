function goBack() {
    window.history.back();
}

function updateProgress() {
    const checkboxes = document.querySelectorAll('.task-checkbox');
    const checked = document.querySelectorAll('.task-checkbox:checked');
    const progressBar = document.getElementById('progressBar');
    const progress = (checked.length / checkboxes.length) * 100;
    progressBar.style.width = progress + '%';
}

function deleteChecked() {
    const checkboxes = document.querySelectorAll('.task-checkbox:checked');
    checkboxes.forEach(checkbox => {
        checkbox.closest('li').remove();
    });
    updateProgress();
}

function addTask() {
    Swal.fire({
        title: 'Add New Sub Task',
        input: 'text',
        inputPlaceholder: 'Enter sub task',
        showCancelButton: true,
        preConfirm: (value) => {
            if (!value) {
                Swal.showValidationMessage('Please enter a description!');
                return false;
            }
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <label>
                    <input type="checkbox" class="task-checkbox" onchange="updateProgress()"> ${value}
                </label>
            `;
            taskList.appendChild(listItem);
            updateProgress();
        }
    });
}

async function submitTask() {
    const response = await fetch('http://localhost:4000/Trello/getBoardForStudent', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Seraj__${token}`, // Send the token in the request header
        },
    });
    const checklist = [];
    const taskName = document.getElementById('newTaskInput').value.trim();
    const taskDetails = document.getElementById('taskDetails').value.trim();

    if (!taskName || !taskDetails) {
        Swal.fire('Error!', 'please fill out all fields!', 'error');
        return;
    }

    document.querySelectorAll('.task-checkbox').forEach(checkbox => {
        checklist.push({
            description: checkbox.parentElement.textContent.trim(),
            completed: checkbox.checked
        });
    });

    const data = {
        name: taskName,
        description: taskDetails,
        Checklist: checklist
    };

    const token = localStorage.getItem('token');

    fetch('http://localhost:4000/Trello/addTaskToToDo/67a9d479bf0c3de035ce1a2a', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Seraj__${token}`
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Bad Request');
        }
        return response.json();
    })
    .then(data => {
        Swal.fire('Success!', 'Task submitted successfully.', 'success');
        setTimeout(() => {
            window.location.back();
        }, 2000);
    })
    .catch(error => {
        Swal.fire('Error!', 'Failed to submit task. ' + error.message, 'error');
    });
    return false;
}
