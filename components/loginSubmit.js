import { newError } from "./errorHandling.js";
import { loginCookies } from "./cookies.js";

let userData;

userData = {
  schools: [
    {
      "01fba644-367e-4ac6-ad03-71a9d3c28188": "Peters-Johnson",
    },
  ],
  role: "coordinator",
  user_id: "cde312d0-428a-455c-87b4-88dc511ef245",
};

const insertCookies = () => {
  loginCookies(userData.schools, userData.role, userData.user_id);
};

const fakeLogin = () => {
  document.querySelector(".login-button").addEventListener("click", () => {
    insertCookies();
    window.location.href = "./home.html";
  });
};
//===Se va scoate din comment in momentul in care e live API-ul===

// const userLogin = () => {
//   const userLogin = {
//     username: document.querySelector(".username").value,
//     password: document.querySelector(".password").value,
//   };

//   fetch("/api/auth/login", {
//     method: "POST",
//     body: JSON.stringify(userLogin),
//     headers: {
//         "Content-Type": "application/json"
//       }
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       return response.json();
//     })
//     .then((userInfo) => {
//       console.log (userInfo);
// userData = userInfo;
//     })
//     .catch((error) => {
//       console.error("Form submission error:", error);

//       newError("Username or password are not correct!");
//     });
// };

export { fakeLogin };
