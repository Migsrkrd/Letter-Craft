//function for displaying templates and their attributes
function displayTemplates(plugIn) {
  let data = JSON.parse(localStorage.getItem("data"));

  let div = document.createElement("div");
  div.setAttribute("id", "templateDiv");
  let main = document.getElementById("mainSection");
  main.appendChild(div);

  if (!data || data.length === 0) {
    //if there are no templates, display a message to the user
  div.style.border = "none";

  if(document.getElementById("infoDiv")) {
    document.getElementById("infoDiv").remove();
  }

  let backgroundImage = document.createElement("img");
  backgroundImage.setAttribute("src", "../assets/empty.svg");
  backgroundImage.setAttribute("alt", "empty templates");
  backgroundImage.classList.add("emptyImage");
  div.appendChild(backgroundImage);

  let emptyStatement = document.createElement("p");
  emptyStatement.style.textAlign = "center";
  emptyStatement.style.fontSize = "1.5rem";
  emptyStatement.style.margin = "13px";
  emptyStatement.innerHTML = `You have no templates. Click the create button to create a new template. <br> If you are new to this app, click the how to button in the sidebar to learn how to use it.<br>Once you have created a template, it will appear here.<br> To view your templates in the future, click the 'Your Templates' button in the sidebar or at the top right corner of this page. <br> Happy templating!`;


  div.appendChild(emptyStatement);

  let testHead = `<div class="firstTwo">
  <div style="margin: 20px;">
    <h2>Tips for Creating Effective Templates:</h2>
    <ul style="text-align: left; display: inline-block;">
      <li>Keep your templates concise and to the point.</li>
      <li>Use clear and professional language.</li>
      <li>Include placeholders for personalized information.</li>
    </ul>
  </div>
  <div style="margin: 20px;">
      <h2>Benefits of Using Templates:</h2>
      <ul style="text-align: left; display: inline-block;">
        <li>Saves time by not having to start from scratch.</li>
        <li>Ensures consistency across communications.</li>
        <li>Enhances professionalism.</li>
      </ul>
    </div>
    </div>
    <div style="margin: 20px;">
      <h2>Need Help?</h2>
      <p>Contact our support team at <a href="../contact/contact.html"</a> if you have any questions.</p>
    </div>`
  
    let infoDiv = document.createElement("div");
    infoDiv.innerHTML = testHead;
    infoDiv.setAttribute("id", "infoDiv");
    main.appendChild(infoDiv);

    return;
  } else {
    //if there are templates, display them
    for (let i = 0; i < data.length; i++) {
      let card = document.createElement("div");
      card.setAttribute("class", "cards");
      let h2 = document.createElement("h2");
      h2.innerHTML = data[i].name;
      let icon = document.createElement("i");
      if(localStorage.getItem("theme") === "light") {
        icon.setAttribute("class", data[i].photo);
      } else if(localStorage.getItem("theme") === "dark") {
        icon.setAttribute("class", data[i].photo);
        icon.classList.remove("templateIcon");
        icon.classList.add("darkModeIcons");
      }

      card.appendChild(h2);
      card.appendChild(icon);
      div.appendChild(card);

      //event listener for when a template is clicked, this will display the template and its attributes as inputs and textareas
      card.addEventListener("click", function (e) {

        if (document.getElementById("templateDisplayDiv")) {
          document.getElementById("templateDisplayDiv").remove();
        }

        if (document.getElementById("div")) {
          document.getElementById("div").remove();
        }

        let div = document.createElement("div");
        div.setAttribute("id", "templateDisplayDiv");
        let textArea = document.createElement("div");
        textArea.setAttribute("contenteditable", "true");
        let formattedTemplate = data[i].template.replace(/\n/g, "<br>");
        //now replace tab values with 4 spaces
        formattedTemplate = formattedTemplate.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
        textArea.innerHTML = formattedTemplate;

        let attributes = data[i].attributes;

        if (textArea.innerHTML.match(/\[(.*?)\]/g)) {
          //apply the attributeHighlight class to the attributes in the template
          let highlightedText = textArea.innerHTML.replace(
            /\[(.*?)\]/g,
            '<span class="attributeHighlight">$&</span>'
          );
          textArea.innerHTML = highlightedText;
        }


        


        let attributeDiv = document.createElement("div");
        attributeDiv.setAttribute("id", "attributeDiv");

        //if there are no attributes, display a message to the user
        for (let j = 0; j < data[i].attributes.length; j++) {
          if (data[i].attributes === "none") {
            let attributeElement = document.createElement("p");
            attributeElement.innerHTML = "No attributes";
            attributeDiv.appendChild(attributeElement);
            div.appendChild(attributeDiv);
            main.appendChild(div);
            break;
          }
          //create an input for each attribute
          let attribute = data[i].attributes[j];
          let attributeElement = document.createElement("input");
          attributeElement.setAttribute("type", "text");
          attributeElement.setAttribute("placeholder", attribute);
          attributeElement.setAttribute("id", attribute);
          attributeElement.classList.add("attribute");

          //if length of attribute is greater than 10, set the size of the input to the length of the attribute
          if (attribute.length > 10) {
            attributeElement.setAttribute("size", attribute.length);
          } else {
            attributeElement.setAttribute("size", "10");
          }

          attributeDiv.appendChild(attributeElement);

          attributeElement.addEventListener("click", function () {
            if (attributeElement.value === data[i].attributes[j]) {
              attributeElement.value = "";
            }
          });

          //event listener for when an attribute is changed
          attributeElement.addEventListener("change", function () {
            if(attributeElement.value === "") {
              attributeElement.value = data[i].attributes[j];
            }
            let match = `${attribute}`;
            let text = textArea.innerHTML;
            let newText = text;
            let index = newText.indexOf(match);

            // Loop through all occurrences of the attribute and replace them
            while (index !== -1) {
              newText =
                newText.substring(0, index) +
                (attributeElement.value) +
                newText.substring(index + match.length);
              index = newText.indexOf(
                match,
                index + attributeElement.value.length
              );
            }

            textArea.innerHTML = newText;
            attribute = attributeElement.value;
            console.log(newText);
          });

          div.appendChild(attributeDiv);
          main.appendChild(div);
        }

        textArea.setAttribute("cols", "100");
        textArea.setAttribute("rows", "40");
        textArea.setAttribute("id", "textArea");

        let copyBtn = document.createElement("button");
        copyBtn.setAttribute("id", "copy");
        copyBtn.innerHTML = `<i class="fa-solid fa-copy"></i>`;

        let pdfBtn = document.createElement("button");
        pdfBtn.setAttribute("id", "download-pdf");
        pdfBtn.innerHTML = `<i class="fa-solid fa-file-pdf"></i>`;

        let editBtn = document.createElement("button");
        editBtn.setAttribute("id", "edit");
        editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;

        let deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("id", "delete");
        deleteBtn.innerHTML = `<i class="fa-solid fa-delete-left"></i>`;

        let div2 = document.createElement("div");
        div2.setAttribute("id", "div2");
        div2.appendChild(copyBtn);
        div2.appendChild(pdfBtn);
        div2.appendChild(editBtn);
        div2.appendChild(deleteBtn);

        pdfBtn.addEventListener("click", function () {
          let ifSquareBracket = textArea.innerHTML.includes("[" || "]");
          if (ifSquareBracket) {
            //confirm with the user that they want to download the pdf
            let confirmDownload = confirm(
              "It looks like you still have attributes in your template. Are you sure you want to download the PDF?"
            );
            if (!confirmDownload) {
              return;
            }
          }
          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF();
          pdf.setFont("times", "normal");
          pdf.setFontSize(12);
          let formattedTemplate = textArea.innerHTML.replace(/<br>/g, "\n");
          formattedTemplate = formattedTemplate.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, "\t");
          formattedTemplate = formattedTemplate.replace(/<span class="attributeHighlight">/g, "");
          formattedTemplate = formattedTemplate.replace(/<\/span>/g, "");
          const textLines = pdf.splitTextToSize(formattedTemplate, 180);
          pdf.text(textLines, 10, 20);
          pdf.save(`${data[i].name}.pdf`);
        });

        copyBtn.addEventListener("click", function () {
          let formattedTemplate = textArea.innerHTML.replace(/<br>/g, "\n");
          formattedTemplate = formattedTemplate.replace(/&nbsp;&nbsp;&nbsp;&nbsp;/g, "\t");
          formattedTemplate = formattedTemplate.replace(/<span class="attributeHighlight">/g, "");
          formattedTemplate = formattedTemplate.replace(/<\/span>/g, "");

          let ifSquareBracket = formattedTemplate.includes("[" || "]");
          if (ifSquareBracket) {
            //confirm with the user that they want to download the pdf
            let confirmDownload = confirm(
              "It looks like you still have attributes in your template. Are you sure you want to copy the text?"
            );
            if (!confirmDownload) {
              return;
            }
          }
          //copy the formatted template to the clipboard
          navigator.clipboard.writeText(formattedTemplate);
          alert("Template copied to clipboard!");

        });

        editBtn.addEventListener("click", function () {
          let oldTemplate = data[i].template;
          let oldName = data[i].name;

          let oldDiv = document.getElementById("templateDisplayDiv");
          oldDiv.remove();

          let instructions = document.createElement("p");
          instructions.setAttribute("id", "instructions");
          instructions.innerHTML =
            "Update your template and name below. Remember that attributes should be surrounded by square brackets. For example, [name] will be replaced with the attribute 'name' when the template is used.";
          let templateName = document.createElement("input");
          templateName.setAttribute("id", "templateName");
          templateName.setAttribute("type", "text");
          templateName.value = oldName;

          let textArea = document.createElement("textarea");
          textArea.setAttribute("id", "textArea");
          textArea.setAttribute("rows", "20");
          textArea.setAttribute("cols", "100");
          textArea.value = oldTemplate;
          let submit = document.createElement("button");
          submit.setAttribute("id", "submit");
          submit.innerHTML = "Update";
          let div = document.createElement("div");
          div.setAttribute("id", "div");
          div.appendChild(instructions);
          div.appendChild(templateName);
          div.appendChild(textArea);
          div.appendChild(submit);
          main.appendChild(div);

          textArea.addEventListener("keydown", function (e) {
            if (e.key === "Tab") {
              e.preventDefault();
              let start = this.selectionStart;
              let end = this.selectionEnd;
        
              // set textarea value to: text before caret + tab + text after caret
              this.value =
                this.value.substring(0, start) + "\t" + this.value.substring(end);
        
              // put caret at right position again
              this.selectionStart = this.selectionEnd = start + 1;
            }
          });

          submit.addEventListener("click", function () {
            let newName = document.getElementById("templateName").value;
            let newTemplate = document.getElementById("textArea").value;
            let oldPhoto = data[i].photo;
  
            let result = {};
            let regex = /\[(.*?)\]/g;
            let attributes = newTemplate.match(regex);
            //make sure attributes arent repeated
            let uniqueAttributes = [...new Set(attributes)];
  
            if (!attributes) {
              result = {
                name: newName,
                template: newTemplate,
                attributes: "none",
                photo: oldPhoto,
              };
              
              data[i] = result;
              localStorage.setItem("data", JSON.stringify(data));
              alert("Template updated successfully!");
              window.location.reload();
              return;
            }
  
            // Construct the result object correctly using the name parameter
            result = {
              name: newName,
              template: newTemplate,
              attributes: uniqueAttributes,
              photo: oldPhoto,
            };
  
            data[i] = result;
  
            localStorage.setItem("data", JSON.stringify(data));
            alert("Template updated successfully!");
            window.location.reload();
          });
        });

        deleteBtn.addEventListener("click", function () {
          let confirmDelete = confirm(
            "Are you sure you want to delete this template?"
          );
          if (!confirmDelete) {
            return;
          }
          data.splice(i, 1);
          localStorage.setItem("data", JSON.stringify(data));
          alert("Template deleted successfully!");
          window.location.reload();
        });

        div.appendChild(div2);
        div.appendChild(textArea);

      });
    }
  }

  if (data.length < 5 && data !== null && data !== undefined && data.length > 0) {
    let blankCard = document.createElement("div");
    console.log(data)
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
