import { userLogin } from "./components/loginSubmit.js";
import {switchLoginToRegister} from "./components/loginSwitchContainers.js"
import { confirmPassword } from "./components/confirm-password.js";

document.addEventListener("DOMContentLoaded", () => {
  // fakeLogin();
  confirmPassword();
  switchLoginToRegister();
  userLogin();
});
