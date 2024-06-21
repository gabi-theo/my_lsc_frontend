import { getCookie } from "./cookies.js";
import { fetchAdress } from "./fetchAdress.js";

const row = (
  courseName,
  courseId,
  sessionId,
  sessionDate,
  sessionNumber,
  status,
  absenceId
) => {
  let statusColor = "";

  let rescheduleButton = "";

  if (status === "present") {
    statusColor = "bg-success";
  } else if (status === "absent") {
    statusColor = "bg-info";
    rescheduleButton = `
    <button
            class="btn py-0 btn-primary text-white px-1 mx-3 reschedule-button"
            id="${absenceId}"
            data-bs-toggle="modal"
            data-bs-target="#reschedule"
          >
            reschedule
          </button>
    `;
  } else if (status === "made_up") {
    statusColor = "bg-secondary";
  }

  const row = document.createElement("div");
  row.innerHTML = `
    <div id=${sessionId}
          class="subcontainer bg-body-tertiary p-2 m-2 border rounded d-flex flex-column flex-lg-row"
        >
          <div
            class="date mx-lg-3 m-3 p-lg-0 p-3 px-lg-3 d-flex align-items-center my-1"
          >
            <span>Session <b class="text-primary" id="session">${sessionNumber}</b> from <b class="text-primary sessionDate">${sessionDate}</b></span>
          </div>
          <div
            class="course border rounded bg-body-secondary  mx-lg-3 m-3 p-lg-0 p-3 px-lg-3 d-flex align-items-center my-1"
          >
            <span><b class="text-primary" id="${courseId}">${courseName}</b></span>
          </div>
          <div
            class=" ${statusColor} border rounded d-flex justify-content-center align-items-center text-white ms-lg-auto mx-3 p-1 px-2 attendance" id= "${absenceId}"
          >
            ${status}
          </div>
        
          ${rescheduleButton}
        </div>

    `;
  return row;
};

const newGenerateRow = () => {
  const student = getCookie("selected-student");

  fetch(
    `${fetchAdress}/student_courses_and_sessions_status/${student}/`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("NewCourses Network response was not OK");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const container = document.querySelector(".table-container");

      data.forEach((element) => {
        const courseScheduleId = element.course_schedule_id;
        const courseScheduleName = element.course_schedule_name;

        element.sessions.forEach((session) => {
          container.appendChild(
            row(
              courseScheduleName,
              courseScheduleId,
              session.session_id,
              session.session_date,
              session.session_number,
              session.presence_status,
              session.absence_id
            )
          );
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

export { newGenerateRow };
