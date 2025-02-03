document.addEventListener("DOMContentLoaded", function () {
    const taskNameElement = document.getElementById("taskName");
    const taskDetailsInput = document.getElementById("taskDetails");
    const progressBar = document.getElementById("progressBar");
    const taskList = document.getElementById("taskList");
    const commentInput = document.getElementById("activityContent");

    let taskId = "6771a998c04ba5850d805d52"; // استبدليه بالـ ID الصحيح عند الحاجة

    // 🟢 1. **جلب تفاصيل المهمة عند تحميل الصفحة**
    async function fetchTaskDetails() {
        try {
            const response = await fetch(`http://localhost:4000/Trello/getCardById/${taskId}`);
            const data = await response.json();

            taskNameElement.textContent = data.name;
            taskDetailsInput.value = data.description || "";

            // تحديث قائمة المهام الفرعية (Checklist)
            taskList.innerHTML = "";
            data.Checklist.forEach((item, index) => {
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <label>
                        <input type="checkbox" class="task-checkbox" ${item.completed ? "checked" : ""} onchange="updateProgress()">
                        ${item.description}
                    </label>
                `;
                taskList.appendChild(listItem);
            });

            updateProgress(); // تحديث الشريط بناءً على المهام المحفوظة

        } catch (error) {
            console.error("Error fetching task details:", error);
        }
    }

    // 🟢 2. **حفظ التعديلات عند الضغط على "Save"**
    async function saveTask() {
        try {
            const response = await fetch(`http://localhost:4000/Trello/updateCard/${taskId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: taskNameElement.textContent,
                    description: taskDetailsInput.value
                })
            });

            if (!response.ok) throw new Error("Failed to save task");
            Swal.fire('Success', 'Task saved successfully!', 'success');

            // alert("Task saved successfully!");
        } catch (error) {
            console.error("Error saving task:", error);
            Swal.fire('Error', 'Failed to save task', 'error');

        }
    }

    // 🟢 3. **إضافة عنصر جديد إلى قائمة المهام**
    function addTask() {
        Swal.fire({
            title: 'Add New Sub Task',
            html: `
                <label for="subTaskDesc">Sub Task Description:</label>
                <input type="text" id="subTaskDesc" class="swal2-input" placeholder="Enter sub task description">
            `,
            focusConfirm: false,
            preConfirm: () => {
                const subTaskDesc = document.getElementById('subTaskDesc').value;

                if (!subTaskDesc) {
                    Swal.showValidationMessage('Please enter a description for the sub task!');
                    return false;
                }

                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <label>
                        <input type="checkbox" class="task-checkbox" onchange="updateProgress()">
                        ${subTaskDesc}
                    </label>
                `;
                taskList.appendChild(listItem);

                updateProgress();
            }
        });
    }
    //     const newTaskDesc = prompt("Enter new task item:");
    //     if (!newTaskDesc) return;

    //     const listItem = document.createElement("li");
    //     listItem.innerHTML = `
    //         <label>
    //             <input type="checkbox" class="task-checkbox" onchange="updateProgress()">
    //             ${newTaskDesc}
    //         </label>
    //     `;
    //     taskList.appendChild(listItem);

    //     updateProgress();
    // }

    // 🟢 4. **حذف العناصر المحددة من القائمة**
    function deleteChecked() {
        const checkedItems = document.querySelectorAll(".task-checkbox:checked");
        checkedItems.forEach(item => item.closest("li").remove());

        updateProgress();
    }

    // 🟢 5. **تحديث شريط التقدم بناءً على المهام المكتملة**
    function updateProgress() {
        const checkboxes = document.querySelectorAll(".task-checkbox");
        const checked = document.querySelectorAll(".task-checkbox:checked").length;
        const progress = checkboxes.length > 0 ? (checked / checkboxes.length) * 100 : 0;

        progressBar.style.width = `${progress}%`;
    }

    // 🟢 6. **إضافة تعليق جديد عند الضغط على "Submit Comment"**
    async function submitComment() {
        const commentText = commentInput.value.trim();
        if (!commentText) return;

        try {
            const response = await fetch(`http://localhost:4000/Trello/addCommentToCard/${taskId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    comment: commentText
                })
            });

            if (!response.ok) throw new Error("Failed to submit comment");
            Swal.fire('Success', 'Comment added successfully!', 'success');

            // alert("Comment added successfully!");
            commentInput.value = ""; // تفريغ الحقل بعد الإضافة
        } catch (error) {
            Swal.fire('Error', 'Failed to submit comment', 'error');

            console.error("Error submitting comment:", error);
        }
    }

    // 🟢 7. **العودة إلى الصفحة السابقة عند الضغط على "Cancel"**
    function goBack() {
        window.history.back();
    }

    // 🔥 تنفيذ جلب بيانات المهمة عند بدء تشغيل الصفحة
    fetchTaskDetails();

    // 🔥 تعيين الأحداث للأزرار
    document.querySelector("button[onclick='saveTask()']").addEventListener("click", saveTask);
    document.querySelector("button[onclick='addTask()']").addEventListener("click", addTask);
    document.querySelector("button[onclick='deleteChecked()']").addEventListener("click", deleteChecked);
    document.querySelector("button[onclick='submitComment()']").addEventListener("click", submitComment);
});
