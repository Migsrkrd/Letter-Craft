import { textAreaListener, submitListener } from "./helpers/textAreaListener.js";
import { getLocalStorageUsagePercentage, updateProgressBar } from "./helpers/localStorage.js";
import { displayTemplates, removeTemplates } from "./helpers/display.js";

let createbtn = document.getElementById("create");
let main = document.getElementById("mainSection");
let yourTemplatesBtn = document.getElementById("your-templates");

if (!localStorage.getItem("usedNumbers")) {
  console.log("usedNumbers not found in local storage, creating new array");
  localStorage.setItem("usedNumbers", JSON.stringify([]));
} 

if (!localStorage.getItem("data")) {
  console.log("data not found in local storage, creating new array");
  localStorage.setItem("data", JSON.stringify([]));
}

getLocalStorageUsagePercentage();
updateProgressBar();

displayTemplates(updateProgressBar);
removeTemplates();



//function to remove the create template div if it exists
function removeCreateDiv() {
  let div = document.getElementById("div");
  if (div) {
    div.remove();
  }
}

//function to create the div for creating a new template
function createDiv() {
  removeTemplates();
  if(document.getElementById("infoDiv")) {
    document.getElementById("infoDiv").remove();
  }

  let instructions = document.createElement("p");
  instructions.setAttribute("id", "instructions");
  instructions.innerHTML =
    "Enter your text below and click submit to create a new template. Any attributes you wish to be editable must be entered in square brackets. For example, [name] will be replaced with the value of the name attribute when the template is used.";
  let templateName = document.createElement("input");
  templateName.setAttribute("id", "templateName");
  templateName.setAttribute("type", "text");
  templateName.setAttribute("placeholder", "Enter template name");

  let textArea = document.createElement("textarea");
  textArea.setAttribute("id", "textArea");
  textArea.setAttribute("rows", "20");
  textArea.setAttribute("cols", "100");
  textArea.setAttribute("placeholder", "Enter your text here");
  let submit = document.createElement("button");
  submit.setAttribute("id", "submit");
  submit.innerHTML = "Submit";
  let clearBtn = document.createElement("button");
  clearBtn.setAttribute("id", "clear");
  clearBtn.innerHTML = `<i class="fa-solid fa-arrows-rotate"></i>`;
  let div = document.createElement("div");
  div.setAttribute("id", "div");
  div.appendChild(instructions);
  div.appendChild(templateName);
  div.appendChild(textArea);
  div.appendChild(submit);
  div.appendChild(clearBtn);
  main.appendChild(div);

  //function for located in ./helper/textAreaListener.js
  textAreaListener(textArea);

  //function located in ./helper/textAreaListener.js
  submitListener(submit, textArea, templateName);

  //event listener for the clear button
  clearBtn.addEventListener("click", function () {
    textArea.value = "";
    templateName.value = "";
  });
}

//event listener for the create button
createbtn.addEventListener("click", function () {
  if (document.getElementById("div")) {
    if (
      confirm(
        "Are you sure you want to leave this page? Your work will be lost."
      )
    ) {
      document.getElementById("div").remove();
    } else {
      return;
    }
  }
  createDiv();
});


yourTemplatesBtn.addEventListener("click", function () {
  removeCreateDiv();
  removeTemplates();
  displayTemplates();
});

// Update the progress bar when the page loads
document.addEventListener("DOMContentLoaded", updateProgressBar);

document.addEventListener("DOMContentLoaded", displayTemplates);