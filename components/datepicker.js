let fetchedData;
let selectedSessionType;

const fetchData = async () => {
  return fetch("./JSON/suggestions.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Courses Network Response was not OK");
      }
      return response.json();
    })
    .then((schedule) => {
      fetchedData = schedule;
    })
    .catch((error) => {
      console.error("There was a problem with fetch operation:", error);
    });
};

const sessionType = () => {
  const radioButtons = document.querySelectorAll(".reschedule-radio");

  radioButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonValue = e.target.value;

      selectedSessionType = buttonValue;
      freeDates(buttonValue);
    });
  });
};

const freeDates = (buttonValue) => {
  const dates = Object.keys(fetchedData[buttonValue]);

  let datesObject = [];

  dates.forEach((date) => {
    let dateObject = {
      from: date,
      to: date,
    };

    datesObject.push(dateObject);
  });

  console.log(datesObject);
  datePicker(datesObject);
};

const datePicker = (datesObject) => {
  const dates = datesObject;
  flatpickr("#datepicker", {
    enable: dates,
  });
};

const getSelectedDate = () => {
  const datePicker = document.querySelector("#datepicker");

  datePicker.addEventListener("change", () => {
    let dateValue = datePicker.value;

    const teachers = parseTeachers(fetchedData, selectedSessionType, dateValue);

    selectTeachers(teachers);
  });
};

const parseTeachers = (fetchedData, selectedSessionType, dateValue) => {
  let datePicker = dateValue.toString();

  if (
    !fetchedData[selectedSessionType] ||
    !fetchedData[selectedSessionType][datePicker]
  ) {
    return [];
  }

  const rawTeachers = Object.keys(fetchedData[selectedSessionType][datePicker]);

  let teachers = [];

  rawTeachers.forEach((teacher) => {
    const splitTeacher = teacher.split("-");

    let teacherObj = {
      id: splitTeacher.slice(0, 5).join("-"),
      teacher: splitTeacher.slice(5).join(" "),
    };

    teachers.push(teacherObj);
  });

  return teachers;
};

const selectTeachers = (teachers) => {
  const select = document.querySelector("#teacher-selector");

  select.innerHTML = "";
  const emptyOption = document.createElement('option');
  emptyOption.textContent = " ";
  select.appendChild(emptyOption);

  if (teachers.length === 0) {
    let option = document.createElement("option");
    option.textContent = "No teachers available";
    select.appendChild(option);
    return;
  }

  teachers.forEach((teacher) => {
    let option = document.createElement("option");
    option.value = teacher.id;
    option.textContent = teacher.teacher;

    select.appendChild(option);
  });
};


const parseTrainerFreeTime = () => {

  const selectedDate = document.querySelector('#datepicker').value.toString();
  const selectedTeacherValue = document.querySelector('#teacher-selector').value;
  const teacherSelector = document.querySelector('#teacher-selector');
  const selectedTeacherText = teacherSelector.options[teacherSelector.selectedIndex].text.split(' ').join('-');
  const selectedTeacher = `${selectedTeacherValue}-${selectedTeacherText}`;

  let freeTimeInterval = [];
  const intervalMinutes = 30;
  const freeTime = fetchedData[selectedSessionType][selectedDate][selectedTeacher].free;

  freeTime.forEach(freeSession => {
    const start = freeSession.start;
    const end = freeSession.end;

    const [startHours, startMinutes] = start.split(":").map(Number);

  const [endHours, endMinutes] = end.split(":").map(Number);

  for (let hours = startHours; hours <= endHours; hours++) {
    for (let minutes = 0; minutes < 60; minutes += intervalMinutes) {
      if (
        (hours === startHours && minutes < startMinutes) ||
        (hours === endHours && minutes > endMinutes)
      ) {
        continue;
      }

      const formattedHours = hours.toString().padStart(2, "0");
      const formattedMinutes = minutes.toString().padStart(2, "0");

      freeTimeInterval.push(`${formattedHours}:${formattedMinutes}`);
    }
  }


  })

  console.log(freeTimeInterval)
  return freeTimeInterval;
}

const triggerSchedule = () => {
  document.querySelector('#teacher-selector').addEventListener('change', () => {
    generateSelector()
  })
}

const generateSelector = () => {

  const intervals = parseTrainerFreeTime();
  const select = document.querySelector('#free-interval-selector');
select.innerHTML = "";
  const emptyOption = document.createElement('option');
  emptyOption.textContent = " ";
  select.appendChild(emptyOption);

  intervals.forEach(interval => {
    const option = document.createElement('option');
    option.value = interval
    option.textContent = interval

    select.appendChild(option);
  })

}

export { fetchData, sessionType, getSelectedDate, triggerSchedule };
