let fetchedData;
let noRoom = [];
let fetchedFreeIntervals;
let busyRoomIntervals;
let busyTrainerIntervals;
let freeIntervals;
let selectedSessionType;

const fetchData = async () => {
  return fetch("./JSON/schedule.json")
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

      generateRoomSelect(buttonValue);
      generateTrainerSelect(buttonValue);

      selectedSessionType = buttonValue;

      generateFreeIntervals(buttonValue);
    });
  });
};

const generateRoomSelect = (buttonValue) => {
  const select = document.querySelector("#room-selector");

  const freeRooms = fetchedData[buttonValue].free[0].rooms;
  select.innerHTML = "";
  const option = document.createElement("option");
  option.value = "";
  option.textContent = "";
  select.appendChild(option);
  freeRooms.forEach((freeRoom) => {
    const option = document.createElement("option");
    option.value = freeRoom;
    option.textContent = freeRoom;
    select.appendChild(option);
  });
};

const parseTrainerTime = (timeString) => {
  const [hour, minute] = timeString.split(":").map(Number);

  const formattedHour = String(hour).padStart(2, "0");
  const formattedMinute = String(minute).padStart(2, "0");

  const parsedTime = `${formattedHour}:${formattedMinute}`;

  return parsedTime;
};

const parsedTrainers = (buttonValue) => {
  const parsedTrainers = [];

  const trainers = fetchedData[buttonValue].free[0].trainers;

  trainers.forEach((trainer) => {
    const [id, firstName, lastName, start, end] = trainer;
    let trainerObject = {
      id: id,
      fullName: `${firstName} ${lastName}`,
      start: parseTrainerTime(start),
      end: parseTrainerTime(end),
    };
    parsedTrainers.push(trainerObject);
  });

  return parsedTrainers;
};

const generateTrainerSelect = (buttonValue) => {
  const select = document.querySelector("#trainer-selector");

  const trainers = parsedTrainers(buttonValue);
  select.innerHTML = "";

  const option = document.createElement("option");
  option.value = "";
  option.textContent = "";
  select.appendChild(option);
  trainers.forEach((trainer) => {
    const option = document.createElement("option");
    option.value = trainer.fullName;
    option.textContent = trainer.fullName;
    select.appendChild(option);
  });
};

const generateFreeIntervals = (selectedSessionType) => {
  const start = fetchedData[selectedSessionType].free[0].start;
  const end = fetchedData[selectedSessionType].free[0].end;
  const intervalMinutes = 30;

  const [startHours, startMinutes] = start.split(":").map(Number);
  const [endHours, endMinutes] = end.split(":").map(Number);

  const freeIntervals = [];

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

      freeIntervals.push(`${formattedHours}:${formattedMinutes}`);
    }
  }
  fetchedFreeIntervals = freeIntervals;
  return freeIntervals;
};

const generateBusyIntervals = (selectedSessionType) => {
  const selectedRoom = document.querySelector("#room-selector").value;
  const busyArray = fetchedData[selectedSessionType].busy;
  const busyIntervals = [];
  const intervalMinutes = 30;
  busyArray.forEach((busyItem) => {
    const [start, end] = busyItem["bussy-interval"].split("-");
    if (busyItem.room === selectedRoom) {
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

          busyIntervals.push(`${formattedHours}:${formattedMinutes}`);
        }
      }
    }
  });
  busyRoomIntervals = busyIntervals;
  return busyIntervals;
};

const generateTrainerIntervals = (selectedSessionType) => {
  const trainers = parsedTrainers(selectedSessionType);

  const selectedTrainer = document.querySelector("#trainer-selector").value;
  const intervalMinutes = 30;
  const trainerIntervals = [];

  trainers.forEach((trainer) => {
    if (trainer.fullName === selectedTrainer) {
      const start = trainer.start;
      const end = trainer.end;

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

          trainerIntervals.push(`${formattedHours}:${formattedMinutes}`);
        }
      }
    }
  });

  busyTrainerIntervals = trainerIntervals;

  return trainerIntervals;
};
// Initialize noRoom as an empty array

const calculateNoRoomAndTrainer = () => {
  // Check if noRoom is defined
  if (noRoom) {
    const noRoomAndTrainer = noRoom.filter(
      (item) => !busyTrainerIntervals.includes(item)
    );
    console.log(noRoomAndTrainer);
    freeIntervals = noRoomAndTrainer;
    if (
      !document.querySelector("#room-selector").value == "" &&
      !document.querySelector("#trainer-selector").value == ""
    ) {
      generateTimeSelect();
    }
  } else {
    console.log("No room available.");
  }
};

const calculateRemainingIntervals = () => {
  const roomSelector = document.querySelector("#room-selector");
  roomSelector.addEventListener("change", () => {
    generateBusyIntervals(selectedSessionType);
    // console.log(fetchedFreeIntervals);
    // console.log(busyRoomIntervals);
    generateTrainerIntervals(selectedSessionType);

    busyRoomIntervals;
    noRoom = fetchedFreeIntervals.filter(
      (item) => !busyRoomIntervals.includes(item)
    );

    // Recalculate noRoomAndTrainer whenever room selector changes
    calculateNoRoomAndTrainer();
  });

  const trainerSelector = document.querySelector("#trainer-selector");
  trainerSelector.addEventListener("change", () => {
    generateTrainerIntervals(selectedSessionType);

    // Recalculate noRoomAndTrainer whenever trainer selector changes
    calculateNoRoomAndTrainer();
  });
};

const generateTimeSelect = () => {
  const select = document.querySelector("#interval-selector");
  select.innerHTML = "";
  const option = document.createElement("option");
  option.value = "";
  option.textContent = "";
  select.appendChild(option);
  freeIntervals.forEach((interval) => {
    const option = document.createElement("option");
    option.value = interval;
    option.textContent = interval;
    select.appendChild(option);
  });
};

export { sessionType, fetchData, calculateRemainingIntervals };
