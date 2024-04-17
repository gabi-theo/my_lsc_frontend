import { navbar } from "./components/navbar.js";
import { generateRow } from "./components/makeupRow.js";
import { reschedule } from "./components/reschedule.js";

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  generateRow();
  reschedule();
});
