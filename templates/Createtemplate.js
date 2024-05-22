import {svgSrc, nonRepeatRandom} from "./svgs.js";
import { getLocalStorageUsagePercentage, updateProgressBar } from "./localStorage.js";
import { displayTemplates, removeTemplates } from "./display.js";

let createbtn = document.getElementById("create");
let main = document.getElementById("mainSection");
let yourTemplatesBtn = document.getElementById("your-templates");

if (!localStorage.getItem("usedNumbers")) {
  console.log("usedNumbers not found in local storage, creating new array");
  localStorage.setItem("usedNumbers", JSON.stringify([]));
} else {
  console.log("usedNumbers found in local storage");
}

if (window.location.pathname === "/templates/template.html") {
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
  clearBtn.innerHTML = "Clear";
  let div = document.createElement("div");
  div.setAttribute("id", "div");
  div.appendChild(instructions);
  div.appendChild(templateName);
  div.appendChild(textArea);
  div.appendChild(submit);
  div.appendChild(clearBtn);
  main.appendChild(div);

  //create a function for, if the textarea is on the page, make sure that pressing tab will insert a tab instead of moving to the next element

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
    if (textArea.value === "" || templateName.value === "") {
      alert("Please enter a template name and text before submitting.");
      return;
    }
    confirm("Are you sure you want to submit?");
    if (!confirm) {
      return;
    }
    let currentData = localStorage.getItem("data");
    if (!currentData) {
      currentData = [];
    } else {
      currentData = JSON.parse(currentData);
    }

    let result = findAttributes(textArea.value, templateName.value);

    localStorage.setItem("data", JSON.stringify(currentData.concat(result)));
  });

  clearBtn.addEventListener("click", function () {
    textArea.value = "";
    templateName.value = "";

    window.location.reload();
  });
}

//function to find attributes in the text area
function findAttributes(text, name) {
  let result = {};
  let regex = /\[(.*?)\]/g;
  let attributes = text.match(regex);
  //make sure attributes arent repeated
  let uniqueAttributes = [...new Set(attributes)];

  let randomNum = Math.floor(Math.random() * 10) + 1;
  let photoId = nonRepeatRandom(JSON.parse(localStorage.getItem("usedNumbers")));

  let template = text;

  if (!attributes) {
    result = {
      name: name,
      template: template,
      attributes: "none",
      photo: svgSrc[photoId],
    };
    return result;
  }

  // Construct the result object correctly using the name parameter
  result = {
    name: name,
    template: template,
    attributes: uniqueAttributes,
    photo: svgSrc[photoId],
  };

  return result;
}

//event listener for the create button
createbtn.addEventListener("click", function () {
  if (document.getElementById("div")) {
    //ask user if they want to leave the page, if they do their work will be lost
    //if they confirm, remove the div and create a new one
    //if they cancel, do nothing
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
