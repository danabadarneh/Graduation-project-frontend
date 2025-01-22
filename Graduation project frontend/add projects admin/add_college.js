const from = document.getElementById("form");
async function handleFormSubmit(event) {
  event.preventDefault();

  const collegeName = document.getElementById("collegename").value;
  console.log(collegeName);

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
        Authorization: `Seraj__${token}`, // تضمين التوكن في الطلب
      },
      body: JSON.stringify({ collegeName }), // إرسال اسم الكلية
    });

    const responseData = await response.json();
    console.log("Response Data:", responseData);

    if (!response.ok) {
      throw new Error(
        responseData.message || "Failed to add the college. Please try again."
      );
    }
    Swal.fire({
        text: "collage added successfully",
        customClass: {
          confirmButton: "custom-confirm-button",
        },
      });
  } catch (error) {
    Swal.fire({
      text: error.message,
      customClass: {
        confirmButton: "custom-confirm-button",
      },
    });
  }
}

form.addEventListener("submit", handleFormSubmit);
