async function handleFormSubmit(event) {
    event.preventDefault();

    const collegeName = document.getElementById("collegename").value;

    if (!collegeName) {
        alert("Please enter a college name.");
        return;
    }

    try {
        // التوكن المستلم ضمن headers
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/College/AddCollege", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Seraj__ ${token}`, // تضمين التوكن في الطلب
            },
            body: JSON.stringify({ collegeName }), // إرسال اسم الكلية
        });

        const responseData = await response.json();
        console.log("Response Data:", responseData);

        if (!response.ok) {
            throw new Error(responseData.message || "Failed to add the college. Please try again.");
        }

        alert("College added successfully!");
        window.location.href = "./index.html"; // الانتقال للداشبورد بعد النجاح
    } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
    }
}
