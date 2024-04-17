const getUserType = (userType = "Parent") => {
  return userType;
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
        <span class="badge bg-primary ms-1">${getUserType()}</span>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        
      </div>
      
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
            <button class="btn btn-sm btn-info text-white">logout</button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</nav>
    `;
};

export { navbar };
