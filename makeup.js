import { navbar } from "./components/navbar.js";
import { generateRow } from "./components/makeupRow.js";
import { reschedule, clearContent } from "./components/reschedule.js";
import { userLogout } from "./components/logout.js";

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  generateRow();
  reschedule();
  clearContent();
  userLogout();
});
