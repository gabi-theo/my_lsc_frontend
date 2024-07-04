function addDate() {
    const today = new Date();
    let year = today.getFullYear();
    let month = ("0" + (today.getMonth() + 1)).slice(-2); // Ensure two-digit month
    let day = ("0" + today.getDate()).slice(-2); // Ensure two-digit day
    document.querySelector(".today").innerHTML =
      "<div class='card-title'><span class='badge bg-danger'>Today</span>" +
      " " +
      "<span>" +
      today.toDateString() +
      "</span></div>";
    document.querySelector(".today").id =
      "event-" + year + "-" + month + "-" + day;
  
    let calculatedDate = new Date();
    let calculatedDateTwo = new Date();
    const numIterations = 27;
    const numIterationsTwo = 3;
    const iterationArray = Array.from({ length: numIterations });
    const iterationArrayTwo = Array.from({ length: numIterationsTwo });
    let i = 28;
    let r = 28;
    iterationArray.forEach(() => {
      calculatedDate.setDate(calculatedDate.getDate() + 1);
      i = i - 1;
      let formatedDated =
        "event-" +
        calculatedDate.getFullYear() +
        "-" +
        ("0" + (calculatedDate.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + calculatedDate.getDate()).slice(-2);
      document.querySelector(".column" + i).innerHTML =
        "<div class='card-title'>" + calculatedDate.toDateString() + "</div>";
      document.querySelector(".column" + i).id = formatedDated;
    });
  
    iterationArrayTwo.forEach(() => {
      calculatedDateTwo.setDate(calculatedDateTwo.getDate() - 1);
      let formatedDated =
        "event-" +
        calculatedDateTwo.getFullYear() +
        "-" +
        ("0" + (calculatedDateTwo.getMonth() + 1)).slice(-2) +
        "-" +
        ("0" + calculatedDateTwo.getDate()).slice(-2);
  
      r = r + 1;
      document.querySelector(".column" + r).innerHTML =
        calculatedDateTwo.toDateString();
      document.querySelector(".column" + r).id = formatedDated;
    });
  };

  export {addDate}