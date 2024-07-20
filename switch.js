let switchButton = document.getElementById("flexSwitchCheckChecked");
const navButton = document.getElementById("nav-button");
const navBar = document.getElementById("nav");
let closeButton = document.getElementById("close");

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.style.setProperty("--primary-color", "#008DDA");
    document.documentElement.style.setProperty("--secondary-color", "#41C9E2");
    document.documentElement.style.setProperty("--tertiary-color", "#ACE2E1");
    document.documentElement.style.setProperty("--quaternary-color", "#F7EEDD");
    document.documentElement.style.setProperty("--text-color", "#1c3440");
  } else if (theme === "dark") {
    document.documentElement.style.setProperty("--primary-color", "#008DDA");
    document.documentElement.style.setProperty("--secondary-color", "#37B7C3");
    document.documentElement.style.setProperty("--tertiary-color", "#088395");
    document.documentElement.style.setProperty("--quaternary-color", "#1c3440");
    document.documentElement.style.setProperty("--text-color", "#F7EEDD");
  }

  navBar.style.left = "0";
  navButton.style.display = "none";
  closeButton.style.display = "block";
}

switchButton.addEventListener("change", function () {
  if (switchButton.checked) {
    localStorage.setItem("theme", "light");
    applyTheme("light");
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

