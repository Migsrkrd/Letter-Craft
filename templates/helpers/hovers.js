export function addToolTip(button, text) {
    button.addEventListener("mouseover", function (event) {
        let tooltip = document.createElement("div");
        tooltip.setAttribute("id", "tooltip");
        tooltip.innerHTML = text;
        document.body.appendChild(tooltip);
        let buttonPositionX = button.getBoundingClientRect().left;
        let buttonPositionY = button.getBoundingClientRect().top;
        let ButtonWidth = button.offsetWidth;
        let tooltipWidth = tooltip.offsetWidth;
        let tooltipHeight = tooltip.offsetHeight;

        tooltip.style.left = buttonPositionX + ButtonWidth / 2 - tooltipWidth / 2 + "px";
        tooltip.style.top = buttonPositionY - tooltipHeight - 10 + "px";
    });

    button.addEventListener("mouseout", function () {
      if (document.getElementById("tooltip"))
        document.getElementById("tooltip").remove();
    });

    button.addEventListener("click", function () {
      if (document.getElementById("tooltip"))
        document.getElementById("tooltip").remove();
    });
}



