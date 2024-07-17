let switchButton = document.getElementById("flexSwitchCheckChecked");

switchButton.addEventListener("change", function() {
      if (switchButton.checked) {
        localStorage.setItem("theme", "light");
        window.location.reload();
        //make sure the button stays checked
      } else if (!switchButton.checked){
        localStorage.setItem("theme", "dark");
        //reload the page
        window.location.reload();
      }
});

if(localStorage.getItem("theme") === "light") {
  switchButton.checked = true;
  document.documentElement.style.setProperty('--primary-color', '#008DDA');
  document.documentElement.style.setProperty('--secondary-color', '#41C9E2');
  document.documentElement.style.setProperty('--tertiary-color', '#ACE2E1');
  document.documentElement.style.setProperty('--quaternary-color', '#F7EEDD');
  document.documentElement.style.setProperty('--text-color', '#1c3440');
} else if(localStorage.getItem("theme") === "dark") {
  switchButton.checked = false;
  document.documentElement.style.setProperty('--primary-color', '#008DDA');
  document.documentElement.style.setProperty('--secondary-color', '#37B7C3');
  document.documentElement.style.setProperty('--tertiary-color', '#088395');
  document.documentElement.style.setProperty('--quaternary-color', '#1c3440');
  document.documentElement.style.setProperty('--text-color', '#F7EEDD');
}

export { switchButton };
