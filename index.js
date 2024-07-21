import { switchButton } from "./switch.js";

const navButton = document.getElementById("nav-button");
const navBar = document.getElementById("nav");

let closeButton = document.getElementById("close");
closeButton.style.display = "none";

navButton.addEventListener("click", () => {
  navBar.style.left = "0";
  navButton.style.display = "none";
  closeButton.style.display = "block";
});

closeButton.addEventListener("click", () => {
  navBar.style.left = "-220px";
  closeButton.style.display = "none";
  navButton.style.display = "block";
});

if (document.getElementById("hiddenRenderTag")) {
  let templateBox = document.getElementById("templateBox");
  templateBox.addEventListener("click", function () {
    window.location.href = "./templates/template.html";
    console.log("Template Box Clicked");
  });

  let contactBox = document.getElementById("contactBox");
  contactBox.addEventListener("click", function () {
    window.location.href = "./contact/contact.html";
    console.log("Contact Box Clicked");
  });

  let howToBox = document.getElementById("howToBox");
  howToBox.addEventListener("click", function () {
    window.location.href = "./howto/howto.html";
    console.log("How To Box Clicked");
  });
}

let homeButton = document.getElementById("logo");

homeButton.addEventListener("click", function () {
  if (window.location.hostname === "migsrkrd.github.io") {
    window.location.href = "/Letter-Craft/";
  } else {
    window.location.href = "/index.html";
  }
});
