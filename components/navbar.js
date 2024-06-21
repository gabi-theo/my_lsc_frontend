import { getCookie } from "./cookies.js";
import { setCookies } from "./cookies.js";

const changeSchool = () => {
  const selectedSchool = document.querySelector(".school-selector");
  selectedSchool.addEventListener("change", () => {
    let selectedOption = selectedSchool.options[selectedSchool.selectedIndex];
    console.log("it changed!" + selectedOption.value);

    setCookies("selected-school", selectedOption.value, 365);
  });
};

const changeStudent = () => {
  const selectedStudent = document.querySelector(".student-selector");
  selectedStudent.addEventListener("change", () => {
    let selectedOption = selectedStudent.options[selectedStudent.selectedIndex];
    console.log("it changed!" + selectedOption.value);

    setCookies("selected-student", selectedOption.value, 365);
    window.location.reload();
    
  });
};

const setInitialSchool = () => {
  const selectedSchool = document.querySelector(".school-selector");
  const schoolCookie = getCookie("selected-school")
  if (schoolCookie) {
    selectedSchool.value = schoolCookie;
    return;
  }
  
  let selectedOption = selectedSchool.options[selectedSchool.selectedIndex];
  setCookies("selected-school", selectedOption.value, 365);
  selectedSchool.value = selectedOption.value;
};

const setInitialStudent = () => {
  const selectedStudent = document.querySelector(".student-selector");
  const studentCookie = getCookie("selected-student");
  if (studentCookie) {
    selectedStudent.value = studentCookie;
    return;
  }
  
  let selectedOption = selectedStudent.options[selectedStudent.selectedIndex];
  setCookies("selected-student", selectedOption.value, 365);
  selectedStudent.value = selectedOption.value
};

const getRole = () => {
  return getCookie("role");
};

const getSchools = () => {
  const encodedData = getCookie("schools");
  if (!encodedData) return []; // Return an empty array if no data found
  const decodedData = decodeURIComponent(encodedData);
  return JSON.parse(decodedData);
};

const getStudents = () => {
  const input = getCookie("studentIDs");
  if (!input) return []; // Return an empty array if no data found

  const pairs = input.split(",");
  const result = pairs.map((pair) => {
    // Split each pair by underscore to separate ID and name
    const [id, firstName, lastName] = pair.split("_");
    const name = `${firstName} ${lastName}`;
    return { id, name };
  });
  return result;
};

const generateSchoolDropdown = () => {
  const schools = getSchools();
  const dropdown = document.createElement("select");
  dropdown.classList =
    "form-select text-primary form-select-sm border border-primary school-selector";

  schools.forEach((school) => {
    const id = Object.keys(school)[0];
    const name = school[id];

    const option = document.createElement("option");

    option.value = id;
    option.textContent = name;

    dropdown.appendChild(option);
  });

  return dropdown;
};

const generateStudentDropdown = () => {
  const students = getStudents();
  const dropdown = document.createElement("select");
  dropdown.classList =
    "form-select text-primary form-select-sm border border-primary student-selector";

  students.forEach((student) => {
    const id = student.id;
    const name = student.name;

    const option = document.createElement("option");

    option.value = id;
    option.textContent = name;

    dropdown.appendChild(option);
  });

  return dropdown;
};

const navbar = () => {
  const currentPage = window.location.pathname.split("/").pop();

  const homeActiveClass = currentPage === "home.html" ? "active" : "";
  const makeupActiveClass = currentPage === "makeup.html" ? "active" : "";

  document.querySelector(".navbar").innerHTML = `
  <nav class="navbar bg-body-tertiary fixed-top border-bottom border-primary pt-0">
  <div class="container-fluid">
  <img class="ms-3" src="../resources/header-logo-desktop.svg" style="width: 6rem;">
   
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNavbar"
      aria-controls="offcanvasNavbar"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div class="offcanvas-header">
        <h5
          class="offcanvas-title text-secondary"
          id="offcanvasNavbarLabel"
        >
          logiscool
        </h5>
        <span class="badge bg-primary ms-1">${getRole()}</span>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        
      </div>
      <div class="container d-flex my-2" id="schoolDropdownContainer">
        
      <span class="text-primary p-1 pe-3">School</span> ${
        generateSchoolDropdown().outerHTML
      }</div>

      <div class="container d-flex my-2" id="studentDropdownContainer">
        
      <span class="text-primary p-1 pe-3">Student</span> ${
        generateStudentDropdown().outerHTML
      }</div>
      
      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link ${homeActiveClass}" aria-current="page" href="home.html">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link ${makeupActiveClass}" href="makeup.html">Makeup</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Course Objective</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Feedback</a>
          </li>
          <li class="nav-item d-flex justify-content-end mt-5">
            <button class="btn btn-sm btn-info text-white nav-logout">logout</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
    `;
  setInitialSchool();
  setInitialStudent();
  changeSchool();
  changeStudent();
};

// Call navbar function to generate navbar when the document is ready
document.addEventListener("DOMContentLoaded", navbar);

export { navbar };
export { changeSchool };
