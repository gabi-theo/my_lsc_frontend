import { newError } from "./errorHandling.js";
import { loginCookies } from "./cookies.js";

let userData;

userData = {
  schools: [
    {
      "01fba644-367e-4ac6-ad03-71a9d3c28188": "Peters-Johnson",
    },
    {
      "21fba644-367e-4ac6-ad03-71a9d3c28188": "Alex-Suciu",
    },
  ],
  role: "student",
  user_id: "520fd602-b572-4726-b758-b9daf93b48d1",
  student_ids: [
    "8be098a0-9c47-4bfd-a761-9d37f4f365ba_Destiny_Hill",
    "e9349653-423d-4e0b-aaef-f97dcaa8b73a_Melissa_Jordan",
    "9e566c3a-9699-4d5d-b99c-39d4a8bc8396_Gina_Mitchell",
  ],
  trainer_id: null,
};

const insertCookies = () => {
  loginCookies(
    userData.schools,
    userData.role,
    userData.user_id,
    userData.student_ids
  );
};

const fakeLogin = () => {
  document.querySelector(".login-button").addEventListener("click", () => {
    insertCookies();
    window.location.href = "./home.html";
  });
};

//===Se va utiliza in loc de fakeLogin din comment in momentul in care e live API-ul===

// const userLogin = () => {
//   document.querySelector(".login-button").addEventListener("click", () => {
//     const userLogin = {
//       username: document.querySelector("#username").value,
//       password: document.querySelector("#password").value,
//     };
//     console.log(userLogin);

//     fetch("http://127.0.0.1:8000/api/auth/login/", {
//       method: "POST",
//       body: JSON.stringify(userLogin),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         return response.json();
//       })
//       .then((userInfo) => {
//         console.log(userInfo);
//         userData = userInfo;
//         insertCookies();
//         window.location.href = "./home.html";
//       })
//       .catch((error) => {
//         console.error("Form submission error:", error);

//         newError("Username or password are not correct!");
//       });
//   });
// };

const userLogin = () => {
  document.querySelector(".login-button").addEventListener("click", async () => {
    const userLogin = {
      username: document.querySelector("#username").value,
      password: document.querySelector("#password").value,
    };
    // console.log(userLogin);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login/", {
        method: "POST",
        body: JSON.stringify(userLogin),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const userInfo = await response.json();
      console.log(userInfo);
      userData = userInfo;
      // Assuming insertCookies is defined somewhere
      insertCookies(userInfo);
      window.location.href = "./home.html";
    } catch (error) {
      console.error("Form submission error:", error);

      // Assuming newError is defined somewhere
      newError("Username or password are not correct!");
    }
  });
};

export { userLogin };
