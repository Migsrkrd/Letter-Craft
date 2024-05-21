const navButton = document.getElementById("nav-button");
const navBar = document.getElementById("nav");

navBar.addEventListener("mouseover", function () {
  navBar.classList.remove("nav");
  navBar.classList.add("nav-show");
});

navBar.addEventListener("mouseout", function () {
  navBar.classList.remove("nav-show");
  navBar.classList.add("nav");
});

navButton.addEventListener("click", function () {
  navBar.removeChild(navButton);
  navBar.classList.remove("nav");
  navBar.classList.add("nav-open");

  let divs = document.createElement("div");
  divs.classList.add("nav-links");
  navBar.appendChild(divs);

  let HomeButton = document.createElement("a");
  let AboutButton = document.createElement("a");
  let HowToButton = document.createElement("a");
  let TemplatesButton = document.createElement("a");

  let links = [HomeButton, AboutButton, HowToButton, TemplatesButton];

  for (let i = 0; i < links.length; i++) {
    links[i].classList.add("nav-link");
  }

  HomeButton.textContent = "Home";
  HomeButton.href = "index.html";
  AboutButton.textContent = "About";
  AboutButton.href = "about.html";
  HowToButton.textContent = "How To";
  HowToButton.href = "howto.html";
  TemplatesButton.textContent = "Your Templates";
  TemplatesButton.href = "templates.html";

  divs.appendChild(HomeButton);
  divs.appendChild(AboutButton);
  divs.appendChild(HowToButton);
  divs.appendChild(TemplatesButton);

    let closeIcon = document.createElement("i");
    closeIcon.classList.add("fas");
    closeIcon.classList.add("fa-times");
    closeIcon.id = "close-icon";
    navBar.appendChild(closeIcon);

    let close = document.getElementById("close-icon");
    close.addEventListener("click", function () {
      navBar.removeChild(closeIcon);
      navBar.removeChild(divs);
      navBar.appendChild(navButton);
      navBar.classList.remove("nav-open");
      navBar.classList.add("nav");
    });

  HomeButton.addEventListener("click", function () {
    window.location.href = "index.html";
  });
});
