import { navbar } from "./components/navbar.js";
import { newGenerateRow } from "./components/makeupRow.js";
import { reschedule, clearContent } from "./components/reschedule.js";
import { userLogout } from "./components/logout.js";

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
  newGenerateRow();
  reschedule();
  clearContent();
  userLogout();
  fetchData();
  sessionType();
  // calculateRemainingIntervals();
  // datePicker();
  getSelectedDate();
  triggerSchedule();
});
