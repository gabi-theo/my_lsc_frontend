import { navbar } from "./components/navbar.js";
import { generateCards } from "./components/card.js";

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  generateCards();
});
