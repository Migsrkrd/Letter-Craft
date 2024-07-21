let switchButton = document.getElementById("flexSwitchCheckChecked");
const navButton = document.getElementById("nav-button");
const navBar = document.getElementById("nav");
let closeButton = document.getElementById("close");
let div = document.getElementById("logo");

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.style.setProperty("--primary-color", "#008DDA");
    document.documentElement.style.setProperty("--secondary-color", "#41C9E2");
    document.documentElement.style.setProperty("--tertiary-color", "#ACE2E1");
    document.documentElement.style.setProperty("--quaternary-color", "#F7EEDD");
    document.documentElement.style.setProperty("--text-color", "#1c3440");
    //if the page is in light mode, create the light logo
    if (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    let lightLogo = document.createElement("img");
    if (window.location.pathname === "/" || window.location.pathname === "/Letter-Craft/" || window.location.pathname === "/Letter-Craft/index.html") {
      lightLogo.src = "./assets/light.png";
    } else {
      lightLogo.src = "../assets/light.png";
    }
    div.appendChild(lightLogo);
  } else if (theme === "dark") {
    document.documentElement.style.setProperty("--primary-color", "#008DDA");
    document.documentElement.style.setProperty("--secondary-color", "#37B7C3");
    document.documentElement.style.setProperty("--tertiary-color", "#088395");
    document.documentElement.style.setProperty("--quaternary-color", "#1c3440");
    document.documentElement.style.setProperty("--text-color", "#F7EEDD");
    //if the page is in dark mode, create the dark logo
    if (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    //if the page is home page, create the dark logo accordingly, otherwise, add a ../ to the path
    let darkLogo = document.createElement("img");
    if (window.location.pathname === "/" || window.location.pathname === "/Letter-Craft/" || window.location.pathname === "/Letter-Craft/index.html") {
      darkLogo.src = "./assets/dark.png";
    } else {
      darkLogo.src = "../assets/dark.png";
    }
    div.appendChild(darkLogo);
  }

  navBar.style.left = "0";
  navButton.style.display = "none";
  closeButton.style.display = "block";
}

switchButton.addEventListener("change", function () {
  if (switchButton.checked) {
    localStorage.setItem("theme", "light");
    applyTheme("light");
    //if the page is in light mode, create the light logo

  } else {
    localStorage.setItem("theme", "dark");
    applyTheme("dark");
    
  }
});

// On page load, apply the saved theme
document.addEventListener("DOMContentLoaded", function () {
  const savedTheme = localStorage.getItem("theme") || "dark";
  switchButton.checked = savedTheme === "light";
  applyTheme(savedTheme);
  navBar.style.left = "-220px";
  closeButton.style.display = "none";
  navButton.style.display = "block";
});


export { switchButton };

