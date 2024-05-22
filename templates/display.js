function displayTemplates(plugIn) {
    let data = JSON.parse(localStorage.getItem("data"));
    let div = document.createElement("div");
    div.setAttribute("id", "templateDiv");
    let main = document.getElementById("mainSection");
    main.appendChild(div);
  
    if (!data) {
      return;
    } else {
      for (let i = 0; i < data.length; i++) {
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        let h2 = document.createElement("h2");
        h2.innerHTML = data[i].name;
        let img = document.createElement("img");
        img.setAttribute("src", data[i].photo);
        img.setAttribute("alt", "template image");
        img.setAttribute("class", "templateImage");
  
        card.appendChild(h2);
        card.appendChild(img);
        div.appendChild(card);
      }
    }
  
    plugIn;
  }
  
  function removeTemplates() {
    let div = document.getElementById("templateDiv");
    if (div) {
      div.remove();
    }
  }

  export { displayTemplates, removeTemplates };