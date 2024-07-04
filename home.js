import { navbar } from "./components/navbar.js";
import { generateCards } from "./components/card.js";
import { userLogout } from "./components/logout.js";
import { addDate } from "./components/calendar.js";

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  generateCards();
  addDate();
  userLogout();
});
