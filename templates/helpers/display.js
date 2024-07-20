import { emptyTemplates } from "./emptyTemplates.js";
import { cardEventListener } from "./cardEventListener.js";

//function for displaying templates and their attributes
function displayTemplates(plugIn) {
  let data = JSON.parse(localStorage.getItem("data"));

  let div = document.createElement("div");
  div.setAttribute("id", "templateDiv");
  let main = document.getElementById("mainSection");
  main.appendChild(div);

  if (!data || data.length === 0) {
    //if there are no templates, display a message to the user
    emptyTemplates(main, div);
  } else {
    //if there are templates, display them
    for (let i = 0; i < data.length; i++) {
      let card = document.createElement("div");
      card.setAttribute("class", "cards");
      let h2 = document.createElement("h2");
      h2.innerHTML = data[i].name;
      let icon = document.createElement("i");
      if (localStorage.getItem("theme") === "light") {
        icon.setAttribute("class", data[i].photo);
      } else if (localStorage.getItem("theme") === "dark") {
        icon.setAttribute("class", data[i].photo);
        icon.classList.remove("templateIcon");
        icon.classList.add("darkModeIcons");
      }

      card.appendChild(h2);
      card.appendChild(icon);
      div.appendChild(card);

      //event listener for when a template is clicked, this will display the template and its attributes as inputs and textareas
      card.addEventListener("click", function () {
        cardEventListener(data, i, main);
      });
    }
  }

  //if there are less than 5 templates, display a blank card
  if (
    data.length < 5 &&
    data !== null &&
    data !== undefined &&
    data.length > 0
  ) {
    let blankCard = document.createElement("div");
    blankCard.setAttribute("class", "blankCard");
    let h2 = document.createElement("i");
    h2.classList.add("fas");
    h2.classList.add("fa-plus");
    h2.classList.add("fa-5x");
    blankCard.appendChild(h2);
    div.appendChild(blankCard);
  }

  plugIn;
}

//function for removing the templates so that they can be re-rendered
function removeTemplates() {
  let div = document.getElementById("templateDiv");
  if (div) {
    div.remove();
  }

  if (document.getElementById("templateDisplayDiv")) {
    document.getElementById("templateDisplayDiv").remove();
  }
}

export { displayTemplates, removeTemplates };
