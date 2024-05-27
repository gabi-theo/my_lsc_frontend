import { getCookie } from "./cookies";

const row = (
  date,
  session,
  totalSessions,
  course,
  teacher,
  status,
  sessionID,
  absenceID
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
            id="${absenceID}"
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
    <div id=${sessionID}
          class="subcontainer bg-body-tertiary p-2 m-2 border rounded d-flex flex-column flex-lg-row"
        >
          <div
            class="date mx-lg-3 m-3 p-lg-0 p-3 px-lg-3 d-flex align-items-center my-1"
          >
            <span>Session <b class="text-primary" id="session">${session}/${totalSessions}</b> from <b class="text-primary sessionDate">${date}</b></span>
          </div>
          <div
            class="course border rounded bg-body-secondary  mx-lg-3 m-3 p-lg-0 p-3 px-lg-3 d-flex align-items-center my-1"
          >
            <span><b class="text-primary" id="course">${course}</b> <i class="text-muted"> by ${teacher} </i> </span>
          </div>
          <div
            class=" ${statusColor} border rounded d-flex justify-content-center align-items-center text-white ms-lg-auto mx-3 p-1 px-2 attendance" id= "${absenceID}"
          >
            ${status}
          </div>
        
          ${rescheduleButton}
        </div>

    `;
  return row;
};

const generateRow = () => {
  // const student = getCookie("selected-student");
  fetch(
    // `http://127.0.0.1:8000/api/student_courses/${student}/`
    "./JSON/courses.json"
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Courses Network Response was not OK");
      }
      return response.json();
    })
    .then((courseData) => {
      return Promise.all([
        fetch(
          // `http://127.0.0.1:8000/api/students_presence/${student}/da04550c-b44e-4050-87b8-549da42be2ac/`
          "./JSON/presence.json"
        ),
        fetch(
          // `http://127.0.0.1:8000/api/student_absent/${student}/6cc98114-4152-4dc8-aeaa-fd3f548d8145/`
          "./JSON/absences.json"
        ),
      ])
        .then((responses) => {
          return Promise.all(
            responses.map((response) => {
              if (!response.ok) {
                throw new Error("Network Response was not OK");
              }
              return response.json();
            })
          );
        })
        .then(([presence, absences]) => {
          const newData = [];

          presence.forEach((session) => {
            const { session: sessionData, status, student } = session;
            const matchedCourse = courseData.find(
              (course) => course.course === sessionData.course_session
              // course.current_session === sessionData.session_no
            );

            if (matchedCourse) {
              const teacher = `${matchedCourse.default_trainer_first_name} ${matchedCourse.default_trainer_last_name}`;
              const courseName = matchedCourse.course;
              const date = sessionData.date;
              const totalSessions = matchedCourse.total_sessions;
              let absenceID;
              if (!absences) {
                absenceID = absences.find(
                  (abscence) => sessionData.id === abscence.absent_on_session_id
                );
              } else {
                absenceID = "";
              }

              newData.push({
                date,
                session: sessionData.session_no,
                course: courseName,
                teacher,
                status,
                studentID: student,
                totalSessions,
                sessionID: sessionData.id,
                absenceID: absenceID ? absenceID.id : null,
              });
            }
          });

          const container = document.querySelector(".table-container");

          newData.forEach((data) => {
            container.appendChild(
              row(
                data.date,
                data.session,
                data.totalSessions,
                data.course,
                data.teacher,
                data.status,
                data.sessionID,
                data.absenceID
              )
            );
          });
        })
        .catch((error) => {
          console.error("There was a problem with fetch operation:", error);
        });
    })
    .catch((error) => {
      console.error("There was a problem with fetch operation:", error);
    });
};

const getAbsenceID = () => {};

export { generateRow };
export { getAbsenceID };
