import { navbar } from "./components/navbar.js";
import { generateRow } from "./components/makeupRow.js";
import { reschedule, clearContent } from "./components/reschedule.js";

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  generateRow();
  reschedule();
  clearContent();
});
