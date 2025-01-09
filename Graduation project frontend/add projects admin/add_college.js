async function handleFormSubmit(event) {
    event.preventDefault();

    const collegeName = document.getElementById("collegename").value;

    if (!collegeName) {
        alert("Please enter a college name.");
        return;
    }

    try {
        // التوكن المستلم ضمن headers
        const token = "Seraj__eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTZlMDliOTQ3Yjg3YmU3M2Y4MTM1NiIsInJvbGUiOiJBZG1pbiIsImlhdCI6MTczNDI4MzE5MiwiZXhwIjoxNzM0Mjg2NzkyfQ.vi5imVYlyZrmqYlV7oTJ3EpacSJSJJ2p_ckf-I60jgo";

        const response = await fetch("http://localhost:4000/College/AddCollege", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // تضمين التوكن في الطلب
            },
            body: JSON.stringify({ collegeName }), // إرسال اسم الكلية
        });

        const responseData = await response.json();
        console.log("Response Data:", responseData);

        if (!response.ok) {
            throw new Error(responseData.message || "Failed to add the college. Please try again.");
        }

        alert("College added successfully!");
        window.location.href = "index.html"; // الانتقال للداشبورد بعد النجاح
    } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
    }
}
