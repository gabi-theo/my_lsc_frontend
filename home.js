import { navbar } from "./components/navbar.js";
import { generateCards } from "./components/card.js";
import { userLogout } from "./components/logout.js";
// import { addDate } from "./components/calendar.js";
// import { fetchData } from "./components/calendar.js";
import {setInitialDates, changeDates, fetchData, displayEvents} from "./components/calendarNew.js"

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  generateCards();
  // addDate();
  fetchData();
  userLogout();
  setInitialDates();
  changeDates();
  displayEvents();
  
});
