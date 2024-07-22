import { addToolTip } from "./hovers.js";
import { copyButton, pdfButton, editButton, deleteButton } from "./actions.js";
import { createAttributes } from "./createAttributes.js";

export function cardEventListener(data, i, main){
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

      //replace tab values with 4 spaces
      formattedTemplate = formattedTemplate.replace(
        /\t/g,
        "&nbsp;&nbsp;&nbsp;&nbsp;"
      );
      textArea.innerHTML = formattedTemplate;

      //apply the attributeHighlight class to the attributes in the template
      if (textArea.innerHTML.match(/\[(.*?)\]/g)) {
        let highlightedText = textArea.innerHTML.replace(
          /\[(.*?)\]/g,
          '<span class="attributeHighlight">$&</span>'
        );
        textArea.innerHTML = highlightedText;
      }

      let attributeDiv = document.createElement("div");
      attributeDiv.setAttribute("id", "attributeDiv");

      //if there are no attributes, display a message to the user, otherwise display the attributes
      createAttributes(data, i, attributeDiv, div, main, textArea); //createAttributes function is in createAttributes.js

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

      addToolTip(copyBtn, "Copy Text");
      addToolTip(pdfBtn, "Download as PDF");
      addToolTip(editBtn, "Edit Template");
      addToolTip(deleteBtn, "Delete Template");

      pdfBtn.addEventListener("click", function () {
        pdfButton(data, i);
      });

      copyBtn.addEventListener("click", function () {
        copyButton();
      });

      editBtn.addEventListener("click", function () {
        editButton(data, i, main);
      });

      deleteBtn.addEventListener("click", function () {
        deleteButton(data, i);
      });

      div.appendChild(textArea);
      div.appendChild(div2);
}