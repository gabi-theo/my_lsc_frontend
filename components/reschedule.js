const clearContent = () => {
  document.querySelector(".closeButton").addEventListener("click", () => {
    document.querySelector(".courses-container").innerHTML = "";
    document.querySelector(".makeups-container").innerHTML = "";
    document.querySelector(".mins-container").innerHTML = "";

    const radioButtons = document.querySelectorAll(".reschedule-radio");

    radioButtons.forEach(function (radioButton) {
      radioButton.checked = false;
    });

    document.getElementById("default").checked = true;
  });
};

const reschedule = () => {
  let sessionID;
  let sessionDate;
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("reschedule-button")) {
      sessionID = e.target.parentElement.id;
      console.log(sessionID);
      sessionID = sessionID;
      const parentContainer = e.target.parentElement;
      const sessionDateElement = parentContainer.querySelector(".sessionDate");
      sessionDate = sessionDateElement.textContent;
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
          document.querySelector(".makeups-container").innerHTML = "";
          document.querySelector(".mins-container").innerHTML = "";
          const buttonValue = clickedButton.value;
          console.log(buttonValue);

          data[buttonValue].courses.forEach((course) => {
            console.log(course.course_session__id);

            if (course.course_session__id === sessionID) {
              let badgeColor;
              if (
                course.course_session__available_places_for_make_up_on_site < 2
              ) {
                badgeColor = "bg-danger";
              } else if (
                course.course_session__available_places_for_make_up_on_site >=
                  2 &&
                course.course_session__available_places_for_make_up_on_site < 4
              ) {
                badgeColor = "bg-warning";
              } else {
                badgeColor = "bg-success";
              }
              const sessionContainer = document.createElement("div");
              sessionContainer.className = "form-check my-2";
              sessionContainer.innerHTML = `
              <input type="radio" class="btn-check" name="options" id="${course.id}" autocomplete="off">
              <label class="btn btn-outline-info" for="${course.id}">${course.date} at ${course.course_session__start_time} <span class="badge ${badgeColor} text-white ms-2">${course.course_session__available_places_for_make_up_on_site} spots</span> </label>
                `;
              document
                .querySelector(".courses-container")
                .appendChild(sessionContainer);
            }
          });
          data[buttonValue].make_ups.forEach((make_up) => {
            // console.log(course.course_session__id);

            if (make_up.session__id === sessionID) {
              const date = new Date(make_up.date_time);
              const formattedDate = `${date.getFullYear()}-${(
                date.getMonth() + 1
              )
                .toString()
                .padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(2, "0")} at ${date
                .getHours()
                .toString()
                .padStart(2, "0")}:${date
                .getMinutes()
                .toString()
                .padStart(2, "0")}:${date
                .getSeconds()
                .toString()
                .padStart(2, "0")}`;

              const sessionContainer = document.createElement("div");
              sessionContainer.className = "form-check my-2";
              sessionContainer.innerHTML = `
              <input type="radio" class="btn-check" name="options" id="${make_up.id}" autocomplete="off">
              <label class="btn btn-outline-secondary" for="${make_up.id}">${formattedDate}</label>
                `;
              document
                .querySelector(".makeups-container")
                .appendChild(sessionContainer);
            }
          });

          if (
            data[buttonValue]["30_mins"].make_up_possible_before_session
              .status === true &&
            data[buttonValue]["30_mins"].make_up_possible_before_session
              .date === sessionDate
          ) {
            const sessionContainer = document.createElement("div");
            sessionContainer.className = "form-check my-2";
            sessionContainer.innerHTML = `
              <input type="radio" class="btn-check" name="options" id="${data[buttonValue]["30_mins"].make_up_possible_before_session.date}-${data[buttonValue]["30_mins"].make_up_possible_before_session.start}" autocomplete="off">
              <label class="btn btn-outline-primary" for="${data[buttonValue]["30_mins"].make_up_possible_before_session.date}-${data[buttonValue]["30_mins"].make_up_possible_before_session.start}">Before in ${data[buttonValue]["30_mins"].make_up_possible_before_session.date} at ${data[buttonValue]["30_mins"].make_up_possible_before_session.start}</label>
                `;
            document
              .querySelector(".mins-container")
              .appendChild(sessionContainer);
          }

          if (
            data[buttonValue]["30_mins"].make_up_possible_after_session
              .status === true &&
            data[buttonValue]["30_mins"].make_up_possible_after_session.date ===
              sessionDate
          ) {
            const sessionContainer = document.createElement("div");
            sessionContainer.className = "form-check my-2";
            sessionContainer.innerHTML = `
              <input type="radio" class="btn-check" name="options" id="${data[buttonValue]["30_mins"].make_up_possible_after_session.date}-${data[buttonValue]["30_mins"].make_up_possible_after_session.start}" autocomplete="off">
              <label class="btn btn-outline-primary" for="${data[buttonValue]["30_mins"].make_up_possible_after_session.date}-${data[buttonValue]["30_mins"].make_up_possible_after_session.start}">After in ${data[buttonValue]["30_mins"].make_up_possible_after_session.date} at ${data[buttonValue]["30_mins"].make_up_possible_after_session.start}</label>
                `;
            document
              .querySelector(".mins-container")
              .appendChild(sessionContainer);
          }
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

export { reschedule, clearContent };
