import { findAttributes } from "./findAttributes.js";

export function textAreaListener(button) {
  //create a function for, if the textarea is on the page, make sure that pressing tab will insert a tab instead of moving to the next element
  button.addEventListener("keydown", function (e) {
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
}

//create a function for the submit button
export function submitListener(button, textArea, templateName) {
  button.addEventListener("click", function () {
    //if the text area is empty, alert the user to enter text before submitting
    if (textArea.value === "" || templateName.value === "") {
      alert("Please enter a template name and text before submitting.");
      return;
    }
    confirm("Are you sure you want to submit?");
    if (!confirm) {
      return;
    }
    //get the current data from local storage
    let currentData = localStorage.getItem("data");
    //if there is no data, set current data to an empty array
    if (!currentData) {
      currentData = [];
    } else {
      //parse the data if there is data
      currentData = JSON.parse(currentData);
    }

    //function located in ./helper/findAttributes.js
    let result = findAttributes(textArea.value, templateName.value);

    //add the result to the current data
    localStorage.setItem("data", JSON.stringify(currentData.concat(result)));

    //clear the text area and template name
    window.location.reload();
  });
}
