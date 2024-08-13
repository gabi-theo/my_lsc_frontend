const reschedulePOST = (
  absenceId,
  sessionId,
  makeUpId,
  min_option,
  sendEmail
) => {
  fetch(
    "http://127.0.0.1:8000/api/make_up_choose/" +
      absenceId +
      "/" +
      sessionId +
      "/" +
      makeUpId +
      "/" +
      min_option +
      "/" +
      sendEmail,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log("POST request successful:", result);
      // Perform any additional actions or handle the response as needed
    })
    .catch((error) => {
      console.error("Error making POST request:", error);
      // Handle errors or display an error message
    });
};

export { reschedulePOST };
