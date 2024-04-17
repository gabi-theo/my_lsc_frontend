const studentID = "b7b72b0e-6906-46e8-933c-2e8933395502"; //to be replaced with COOKIE

const row = (
  date,
  session,
  totalSessions,
  course,
  teacher,
  status,
  sessionID
) => {
  let statusColor = "";

  let rescheduleButton = "";

  if (status === "present") {
    statusColor = "bg-success";
  } else if (status === "absent") {
    statusColor = "bg-info";
    rescheduleButton = `
    <button
            class="btn p-0 text-white bg-primary px-1 mx-2 reschedule-button"
            data-bs-toggle="modal"
            data-bs-target="#reschedule"
          >
            Reschedule
          </button>
    `;
  }

  const row = document.createElement("div");
  row.innerHTML = `
    <div id=${sessionID}
          class="subcontainer bg-body-tertiary p-2 m-2 border rounded d-flex"
        >
          <div
            class="date border rounded bg-body-secondary mx-3 px-3 d-flex align-items-center"
          >
            <span>Session <b class="text-primary" id="session">${session}/${totalSessions}</b> from <b class="text-primary">${date}</b></span>
          </div>
          <div
            class="course border rounded bg-body-secondary mx-3 px-3 d-flex align-items-center"
          >
            <span><b class="text-primary" id="course">${course}</b> <i class="text-muted"> by ${teacher} </i> </span>
          </div>
          <div
            class="attendance ${statusColor} border rounded d-flex justify-content-center align-items-center text-white ms-auto p-1 px-2"
          >
            <span>${status}</span>
          </div>

          ${rescheduleButton}
        </div>

    `;
  return row;
};

const generateRow = () => {
  fetch("./JSON/courses.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Courses Network Response was not OK");
      }
      return response.json();
    })
    .then((courseData) => {
      fetch("./JSON/presence.json")
        .then((presenceResponse) => {
          if (!presenceResponse.ok) {
            throw new Error("Presence Network Response was not OK");
          }
          return presenceResponse.json();
        })
        .then((presence) => {
          const newData = [];

          presence.forEach((session) => {
            const { session: sessionData, status, student } = session;
            const matchedCourse = courseData.find(
              (course) =>
                course.course === sessionData.course_session &&
                course.current_session === sessionData.session_no
            );

            if (matchedCourse) {
              const teacher =
                matchedCourse.default_trainer_first_name +
                " " +
                matchedCourse.default_trainer_last_name;
              const courseName = matchedCourse.course;
              const date = sessionData.date;
              const totalSessions = matchedCourse.total_sessions;

              newData.push({
                date,
                session: sessionData.session_no,
                course: courseName,
                teacher,
                status,
                studentID: student,
                totalSessions,
                sessionID: sessionData.id,
              });
            }
          });

          // console.log(newData);

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
                data.sessionID
              )
            );
          });
        })
        .catch((error) => {
          console.error(
            "There was a problem with PRESENCE fetch operation:",
            error
          );
        });
    })
    .catch((error) => {
      console.error("There was a problem with MAKEUP fetch operation:", error);
    });
};

export { generateRow };
