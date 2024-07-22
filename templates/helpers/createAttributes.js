export function createAttributes(data, i, attributeDiv, div, main, textArea) {
    for (let j = 0; j < data[i].attributes.length; j++) {
        if (data[i].attributes === "none") {
          let attributeElement = document.createElement("p");
          attributeElement.innerHTML = "No attributes";
          attributeDiv.appendChild(attributeElement);
          div.appendChild(attributeDiv);
          //append div to main but before footer
          main.insertBefore(div, document.getElementById("footer"));
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
          if (attributeElement.value === "") {
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
              attributeElement.value +
              newText.substring(index + match.length);
            index = newText.indexOf(
              match,
              index + attributeElement.value.length
            );
          }

          textArea.innerHTML = newText;
          attribute = attributeElement.value;
        });

        div.appendChild(attributeDiv);
        main.insertBefore(div, document.getElementById("footer"));
      }
}
