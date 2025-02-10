async function loadTasks() {
    try {
        const token = await localStorage.getItem('token');
        const response = await fetch('http://localhost:4000/Trello/getBoardForStudent', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Seraj__${token}`, // Send the token in the request header
            },
        });
        const boardData = await response.json();
        console.log(boardData);

        const todoTasks = document.getElementById('todoTasks');
        const doingTasks = document.getElementById('doingTasks');
        const doneTasks = document.getElementById('doneTasks');

        // Iterate over the lists and fetch cards for each list
        boardData.lists.forEach(async list => {
            const cardResponse = await fetch(`http://localhost:4000/Trello/getCardsByListId/${list._id}`,{
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Seraj__${token}`, // Send the token in the request header
                },
            });
            const cards = await cardResponse.json();

            // Create task elements for each card and append to the respective list
            cards.forEach(cardData => {
                const taskElement = createTaskElement(cardData);
                if (list.name === 'To Do') {
                    todoTasks.appendChild(taskElement);
                } else if (list.name === 'In Progress') {
                    doingTasks.appendChild(taskElement);
                } else if (list.name === 'Completed') {
                    doneTasks.appendChild(taskElement);
                }
            });
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

function createTaskElement(task) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.draggable = true;
    taskElement.id = task._id;
    taskElement.setAttribute('ondragstart', 'drag(event)');
    taskElement.setAttribute('onclick', `openTaskForm('${task.name}')`);
    taskElement.textContent = task.name;
    return taskElement;
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
    event.preventDefault();
}

async function drop(event) {
    event.preventDefault();
    const taskId = event.dataTransfer.getData("text");
    const task = document.getElementById(taskId);
    const targetList = event.target;

    let newStatus;
    let endpoint;

    // Set the new status and endpoint based on the target list
    if (targetList.id === 'doingTasks') {
        newStatus = 'Doing';
        endpoint = `http://localhost:4000/Trello/moveCardToInProgress/${taskId}`;
    } else if (targetList.id === 'doneTasks') {
        newStatus = 'Done';
        endpoint = `http://localhost:4000/Trello/moveCardToDone/${taskId}`; // New endpoint for Done status
    } else {
        console.error("Invalid drop target");
        return;
    }

    // Update the task status in the backend
    try {
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to update task status: ${response.statusText}`);
        }

        targetList.appendChild(task); // Move the task element to the new list
    } catch (err) {
        console.error("Error updating task status:", err);
    }
}


function openTaskForm(taskName) {
    window.location.href = `task_form.html?task=${encodeURIComponent(taskName)}`;
}
