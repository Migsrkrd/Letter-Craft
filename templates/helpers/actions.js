function pdfButton(data, i) {
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
          formattedTemplate = formattedTemplate.replace(
            /&nbsp;&nbsp;&nbsp;&nbsp;/g,
            "\t"
          );
          formattedTemplate = formattedTemplate.replace(
            /<span class="attributeHighlight">/g,
            ""
          );
          formattedTemplate = formattedTemplate.replace(/<\/span>/g, "");
          const textLines = pdf.splitTextToSize(formattedTemplate, 180);
          pdf.text(textLines, 10, 20);
          pdf.save(`${data[i].name}.pdf`);
}

function copyButton() {
    let formattedTemplate = textArea.innerHTML.replace(/<br>/g, "\n");
          formattedTemplate = formattedTemplate.replace(
            /&nbsp;&nbsp;&nbsp;&nbsp;/g,
            "\t"
          );
          formattedTemplate = formattedTemplate.replace(
            /<span class="attributeHighlight">/g,
            ""
          );
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
}

function submitButton(data, i){
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
}

function editButton(data, i, main){
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
          this.value.substring(0, start) +
          "\t" +
          this.value.substring(end);

        // put caret at right position again
        this.selectionStart = this.selectionEnd = start + 1;
      }
    });

    submit.addEventListener("click", function () {
      submitButton(data, i);
    });
}

function deleteButton(data, i){
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
}

export {pdfButton, copyButton, submitButton, editButton, deleteButton};