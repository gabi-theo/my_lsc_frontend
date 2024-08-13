import {fetchAdress} from './fetchAdress.js'
import {getCookie} from './cookies.js'

const card = (date, title, shortDesc, text) => {
  const card = document.createElement("div");
  card.innerHTML = `
      <div class="card m-3 d-flex p-3 news-card bg-body-tertiary" style="max-width: 60rem">
          
          <div class="card-body">
              <h5 class="card-title text-primary fs-2 rounded p-2">${title}</h5>
              <p class="card-text text-info text-end">${date}</p>
              <p class="card-text text-muted text-center fw-light fst-italic">${shortDesc}</p>
              <p class="card-text text-dark text-wrap news-card-text lh-lg">${text}</p>
              
          </div>
      </div>
      `;
  return card;
};

const generateCards = () =>
  {
    fetch(`${fetchAdress}/news/${getCookie("selected-school")}/${getCookie("selected-student")}/`, {
      credentials: "include",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("News Network Response was not OK");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);

      const cardsContainer = document.querySelector(".news-container");
      data.forEach((element) => {
        const date = new Date(element.created_at);
        const formattedDate = date.toLocaleDateString("en-US", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        cardsContainer.appendChild(
          card(
            formattedDate,
            element.title,
            element.short_description,
            element.text
          )
        );
      });
    })
    .catch((error) => {
      console.error("There was a problem with NEWS fetch operation:", error);
    });
};

export { generateCards };
