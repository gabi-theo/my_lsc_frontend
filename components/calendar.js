function fetchData() {
  fetch("../JSON/calendar.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      asignData(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function asignData(calendarData) {
  for (const [date, info] of Object.entries(calendarData)) {
    const div = document.getElementById(date);
    if (div && info.courses.length > 0) {
      info.courses.forEach((course) => {
        let subDiv = document.createElement("div");
        subDiv.innerHTML = `
      <div class="card my-2 border border-primary">
        <div class="card-body">
          <p class="card-subtitle text-primary">Course: ${course.course_session}</p>
          <p class="card-text text-secondary">Session: ${course.session_no}</p>
        </div>
      <div>
      `;
        div.appendChild(subDiv);
      });
    }
  }
}

function addDate() {
  const today = new Date();
  let year = today.getFullYear();
  let month = ("0" + (today.getMonth() + 1)).slice(-2); // Ensure two-digit month
  let day = ("0" + today.getDate()).slice(-2); // Ensure two-digit day
  document.querySelector(".today").innerHTML =
    "<div class='card-title'><span class='badge bg-danger'>Today</span>" +
    " " +
    "<span>" +
    today.toDateString() +
    "</span></div>";
  document.querySelector(".today").id = day + "-" + month + "-" + year;

  let calculatedDate = new Date();
  let calculatedDateTwo = new Date();
  const numIterations = 27;
  const numIterationsTwo = 3;
  const iterationArray = Array.from({ length: numIterations });
  const iterationArrayTwo = Array.from({ length: numIterationsTwo });
  let i = 28;
  let r = 28;
  iterationArray.forEach(() => {
    calculatedDate.setDate(calculatedDate.getDate() + 1);
    i = i - 1;
    let formatedDated =
      ("0" + calculatedDate.getDate()).slice(-2) +
      "-" +
      ("0" + (calculatedDate.getMonth() + 1)).slice(-2) +
      "-" +
      calculatedDate.getFullYear();
    document.querySelector(".column" + i).innerHTML =
      "<div class='card-title'>" + calculatedDate.toDateString() + "</div>";
    document.querySelector(".column" + i).id = formatedDated;
  });

  iterationArrayTwo.forEach(() => {
    calculatedDateTwo.setDate(calculatedDateTwo.getDate() - 1);
    let formatedDated =
      ("0" + calculatedDateTwo.getDate()).slice(-2) +
      "-" +
      ("0" + (calculatedDateTwo.getMonth() + 1)).slice(-2) +
      "-" +
      calculatedDateTwo.getFullYear();

    r = r + 1;
    document.querySelector(".column" + r).innerHTML =
      calculatedDateTwo.toDateString();
    document.querySelector(".column" + r).id = formatedDated;
  });
}

export { addDate, fetchData };
