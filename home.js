import { navbar } from "./components/navbar.js";
import { generateCards } from "./components/card.js";
import { userLogout } from "./components/logout.js";

document.addEventListener("DOMContentLoaded", () => {
  navbar();
  generateCards();
  userLogout();
});
