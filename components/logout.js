import { deleteCookies } from "./cookies.js";

const userLogout = () => {
  document.querySelector(".nav-logout").addEventListener("click", () => {
    window.location.href = "./login.html";
    deleteCookies();
  });
};

export { userLogout };
