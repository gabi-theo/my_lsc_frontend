
// Function to fetch calendar data and apply styling based on the data
let fetchedData;
function fetchData() {
    fetch("../JSON/calendar.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            fetchedData = data
            colorBackground(fetchedData)
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Function to apply or remove background and text color classes based on calendar data
function colorBackground(fetchedData) {
    for (const [date, info] of Object.entries(fetchedData)) {
        const div = document.getElementById(date);
        if (div) {
            if (info.courses.length > 0) {
                div.classList.add('bg-info', 'text-white');
            } else {
                div.classList.remove('bg-info', 'text-white');
            }
        }
    }
}


  

let currentOffset = 0;

function setInitialDates(value = 0) {
    const today = new Date();
    
    // Update the currentOffset with the new value
    currentOffset += value;

    // Utility function to format dates as DD-MM-YYYY
    function formatDate(date) {
        let year = date.getFullYear();
        let month = ("0" + (date.getMonth() + 1)).slice(-2); // Ensure two-digit month
        let day = ("0" + date.getDate()).slice(-2); // Ensure two-digit day
        return `${day}-${month}-${year}`;
    }

    // Calculate dates for a range of days around the current date with the offset
    for (let i = -3; i <= 3; i++) {
        let formattedDate = formatDate(new Date(today.getFullYear(), today.getMonth(), today.getDate() + currentOffset + i));
        let elementClass = `.news-${i + 4}`; // Maps -3 to 1, -2 to 2, ..., 3 to 7
        let element = document.querySelector(elementClass);
        if (element) {
            element.textContent = formattedDate;
            element.id = `${formattedDate}`;
        }
    }
}

function changeDates() {
    const back = document.querySelector('.back');
    const next = document.querySelector('.next');

    if (back) {
        back.addEventListener('click', () => {
            setInitialDates(-1); // Decrease the offset by 1
            document.querySelectorAll('.date-card').forEach((card) => {
                card.classList.remove('bg-info', 'text-white')
                colorBackground(fetchedData)
            })
        });
    }

    if (next) {
        next.addEventListener('click', () => {
            setInitialDates(1); // Increase the offset by 1
            document.querySelectorAll('.date-card').forEach((card) => {
                card.classList.remove('bg-info', 'text-white')
                colorBackground(fetchedData)
            })
        });
    }

}

function asignData(calendarData) {
    for (const [date, info] of Object.entries(calendarData)) {
      const div = document.getElementById(date+"_container");
      if (div && info.courses.length > 0) {
        info.courses.forEach((course) => {
          let subDiv = document.createElement("div");
          subDiv.innerHTML = `
        <div class="card my-2 border border-primary">
          <div class="card-body">
            <p class="card-subtitle text-primary">Course: ${course.course_session}</p>
            <p class="card-text text-secondary">Session: ${course.session_no}</p>
          </div>
        <div>
        `;
          div.appendChild(subDiv);
        });
      }
    }
  }

function displayEvents() {
    const eventContainer = document.querySelector('.events-container')
    
    document.querySelectorAll('.date-card').forEach((card) => {
        card.addEventListener('click', () => {
            document.querySelector('.events-container').innerHTML = "";
            eventContainer.id = `${card.id}_container`
            asignData(fetchedData)
            
        })
    })
}

export { setInitialDates, changeDates, fetchData, displayEvents};
