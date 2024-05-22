function displayTemplates(plugIn) {
  let data = JSON.parse(localStorage.getItem("data"));
  let div = document.createElement("div");
  div.setAttribute("id", "templateDiv");
  let main = document.getElementById("mainSection");
  main.appendChild(div);

  //write a function that takes in a new template and updates the current text area with the new template

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

      card.addEventListener("click", function () {
        if (document.getElementById("templateDisplayDiv")) {
          document.getElementById("templateDisplayDiv").remove();
        }

        let div = document.createElement("div");
        div.setAttribute("id", "templateDisplayDiv");
        main.appendChild(div);
        let textArea = document.createElement("textarea");
        textArea.value = `${data[i].template}`;
        console.log(data[i].template);

        for (let j = 0; j < data[i].attributes.length; j++) {
          if (data[i].attributes === "none") {
            let attributeElement = document.createElement("p");
            attributeElement.innerHTML = "No attributes";
            div.appendChild(attributeElement);
            break;
          }
          let attribute = data[i].attributes[j];
          let attributeElement = document.createElement("input");
          attributeElement.setAttribute("type", "text");
          attributeElement.setAttribute("placeholder", attribute);
          attributeElement.setAttribute("id", attribute);

          attributeElement.addEventListener("change", function () {
            let match = ` ${attribute}`;
            let text = textArea.value;
            let newText = text;
            let index = newText.indexOf(match);
            
            // Loop through all occurrences of the attribute and replace them
            while (index !== -1) {
                newText = newText.substring(0, index) + (" " + attributeElement.value) + newText.substring(index + match.length);
                index = newText.indexOf(match, index + attributeElement.value.length);
            }
        
            textArea.value = newText;
            attribute = attributeElement.value;
            console.log(newText);
        });
        
        
        
          
          div.appendChild(attributeElement);
        }

        textArea.setAttribute("cols", "100");
        textArea.setAttribute("rows", "40");
        textArea.setAttribute("id", "textArea");

        let copyBtn = document.createElement("button");
        copyBtn.setAttribute("id", "copy");
        copyBtn.innerHTML = "Copy";

        let pdfBtn = document.createElement("button");
        pdfBtn.setAttribute("id", "download-pdf");
        pdfBtn.innerHTML = "Download PDF";

        pdfBtn.addEventListener("click", function () {
          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF();
          pdf.text(textArea.value, 10, 10);
          pdf.save(`${data[i].name}.pdf`);
        });

        copyBtn.addEventListener("click", function () {
          textArea.select();
          document.execCommand("copy");
        });

        //make sure the template data looks like how they were entered

        div.appendChild(textArea);
        div.appendChild(copyBtn);
        div.appendChild(pdfBtn);
      });
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
