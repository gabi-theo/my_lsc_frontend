const reschedule = () => {
  const rescheduleButton = document.querySelectorAll(".reschedule-button");

  let sessionID;

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("reschedule-button")) {
      sessionID = e.target.parentElement.id;
      console.log(sessionID);
      sessionID = sessionID;
    }
  });

  const radioButtons = document.querySelectorAll(".reschedule-radio");

  fetch("./JSON/availableMakeUps.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Available Makeups Network Response was not OK");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      radioButtons.forEach((clickedButton) => {
        clickedButton.addEventListener("click", () => {
          document.querySelector(".courses-container").innerHTML = "";
          const buttonValue = clickedButton.value;
          console.log(buttonValue);

          data[buttonValue].courses.forEach((course) => {
            console.log(course.course_session__id);

            if (course.course_session__id === sessionID) {
              const sessionContainer = document.createElement("div");
              sessionContainer.className = "form-check my-2";
              sessionContainer.innerHTML = `
              <input type="radio" class="btn-check" name="options" id="${course.id}" autocomplete="off" checked>
              <label class="btn btn-info" for="${course.id}">${course.date} at ${course.course_session__start_time} <span class="badge bg-white text-info ms-2">${course.course_session__available_places_for_make_up_on_site}</span> </label>
                `;
              document
                .querySelector(".courses-container")
                .appendChild(sessionContainer);
            }
          });
        });
      });
    })
    .catch((error) => {
      console.error(
        "There was a problem with Available MakeUps fetch operation:",
        error
      );
    });
};

export { reschedule };
