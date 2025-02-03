document.addEventListener("DOMContentLoaded", function () {
    const todoTasksContainer = document.getElementById("todoTasks");
    const newTaskInput = document.getElementById("newTaskInput");

    // 🟢 1. جلب جميع المهام عند تحميل الصفحة
    async function fetchTasks() {
        try {
            const response = await fetch("http://localhost:4000/Trello/getBoardById/67703bc89373083db43ba0f0");
            const data = await response.json();
            const tasks = data.tasks; // تأكد من أن البيانات تحتوي على tasks
            
            // تفريغ القائمة الحالية وإضافة المهام الجديدة
            todoTasksContainer.innerHTML = "";
            tasks.forEach(task => {
                const taskElement = document.createElement("div");
                taskElement.classList.add("task");
                taskElement.setAttribute("draggable", "true");
                taskElement.setAttribute("onclick", `openTaskForm('${task.name}')`);
                taskElement.textContent = task.name;
                todoTasksContainer.appendChild(taskElement);
            });

        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }

    // 🟢 2. إضافة مهمة جديدة عند الضغط على "Add Task"
    async function addTask() {
        const taskName = newTaskInput.value.trim();
        if (taskName === "") return;

        try {
            const response = await fetch("http://localhost:4000/Trello/addTaskToToDo/67703bc89373083db43ba0f2", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: taskName,
                    description: "New task added",
                    Checklist: []
                })
            });

            if (!response.ok) throw new Error("Failed to add task");

            newTaskInput.value = "";
            fetchTasks(); // تحديث القائمة بعد الإضافة
        } catch (error) {
            console.error("Error adding task:", error);
        }
    }

    // 🟢 3. السماح بسحب المهام بين القوائم
    function allowDrop(event) {
        event.preventDefault();
    }

    function drag(event) {
        event.dataTransfer.setData("text", event.target.id);
    }

    async function drop(event) {
        event.preventDefault();
        const taskId = event.dataTransfer.getData("text");
        const taskElement = document.getElementById(taskId);
        event.target.appendChild(taskElement);

        // تحديث حالة المهمة في الباك إند عند نقلها
        try {
            const response = await fetch(`http://localhost:4000/Trello/updateCard/${taskId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: taskElement.textContent,
                    description: "Task moved to new column"
                })
            });

            if (!response.ok) throw new Error("Failed to update task");
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    // تنفيذ جلب المهام عند بدء تشغيل الصفحة
    fetchTasks();

    // ربط زر الإضافة بالدالة
    document.querySelector(".add-task-container button").addEventListener("click", addTask);

    // تعيين عمليات السحب والإفلات
    document.getElementById("doingTasks").addEventListener("dragover", allowDrop);
    document.getElementById("doingTasks").addEventListener("drop", drop);
});