import { navbar } from "./components/navbar.js";
import { generateRow } from "./components/makeupRow.js";
import { reschedule, clearContent } from "./components/reschedule.js";
import { userLogout } from "./components/logout.js";
import { getAbsenceID } from "./components/makeupRow.js";

// import {
//   sessionType,
//   fetchData,
//   calculateRemainingIntervals,
// } from "./components/makeupchoose.js";

import {
  fetchData,
  sessionType,
  getSelectedDate,
  triggerSchedule,
} from "./components/datepicker.js";

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  generateRow();
  reschedule();
  clearContent();
  userLogout();
  getAbsenceID();
  fetchData();
  sessionType();
  // calculateRemainingIntervals();
  // datePicker();
  getSelectedDate();
  triggerSchedule();
});
