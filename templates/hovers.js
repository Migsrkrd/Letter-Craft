let copyBtn = document.getElementById("copy") || document.querySelector(".fa-copy");
let copyBtnText = "Copy Text";
let pdfBtn = document.getElementById("download-pdf") || document.querySelector(".fa-file-pdf");
let pdfBtnText = "Download as PDF";
let editBtn = document.getElementById("edit") || document.querySelector(".fa-pen-to-square");
let editBtnText = "Edit Template";
let deleteBtn = document.getElementById("delete") || document.querySelector(".fa-delete-left");
let deleteBtnText = "Delete Template";

function createTooltip(text) {
    let tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerHTML = text;
    document.body.appendChild(tooltip);
    return tooltip;
}

function positionTooltip(tooltip, event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let tooltipWidth = tooltip.offsetWidth;
    let tooltipHeight = tooltip.offsetHeight;

    tooltip.style.left = mouseX - tooltipWidth / 2 + "px";
    tooltip.style.top = mouseY - tooltipHeight - 10 + "px";
}

function addHoverTextToButton(button, text) {
    if (button) {
        button.addEventListener("mouseover", function (event) {
            let tooltip = createTooltip(text);
            positionTooltip(tooltip, event);

            button.addEventListener("mousemove", function (event) {
                positionTooltip(tooltip, event);
                console.log("mousemove");
                console.log(text);
            });

            button.addEventListener("mouseout", function () {
                tooltip.remove();
            }, { once: true });
        });
    }
}

function addHoverTextToButtons() {
    addHoverTextToButton(copyBtn, copyBtnText);
    addHoverTextToButton(pdfBtn, pdfBtnText);
    addHoverTextToButton(editBtn, editBtnText);
    addHoverTextToButton(deleteBtn, deleteBtnText);
}

document.addEventListener("DOMContentLoaded", function() {
    addHoverTextToButtons();
});

export { addHoverTextToButtons };



