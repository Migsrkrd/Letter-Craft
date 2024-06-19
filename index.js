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
  HomeButton.setAttribute("id", "home-link");
  let ContactButton = document.createElement("a");
  ContactButton.setAttribute("id", "contact-link");
  let HowToButton = document.createElement("a");
  HowToButton.setAttribute("id", "howto-link");
  let TemplatesButton = document.createElement("a");
  TemplatesButton.setAttribute("id", "templates-link");

  let links = [HomeButton, ContactButton, HowToButton, TemplatesButton];

  for (let i = 0; i < links.length; i++) {
    links[i].classList.add("nav-link");
  }

  HomeButton.textContent = "Home";
  ContactButton.textContent = "Contact";
  HowToButton.textContent = "How To";
  TemplatesButton.textContent = "Your Templates";

  if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
    console.log("Home Page");
    HomeButton.href = "index.html";
    HomeButton.classList.add("active");
    ContactButton.href = "./contact/contact.html";
    HowToButton.href = "howto/howto.html";
    TemplatesButton.href = "./templates/template.html";
  } else if (window.location.pathname.includes("template.html")) {
    HomeButton.href = "../index.html";
    ContactButton.href = "../contact/contact.html";
    HowToButton.href = "../howto/howto.html";
    TemplatesButton.href = "./template.html";
    TemplatesButton.classList.add("active");
  } else if (window.location.pathname.includes("contact.html")) {
    HomeButton.href = "../index.html";
    ContactButton.href = "./contact.html";
    ContactButton.classList.add("active");
    HowToButton.href = "../howto/howto.html";
    TemplatesButton.href = "../templates/template.html";
  } else if (window.location.pathname.includes("howto.html")) {
    HomeButton.href = "../index.html";
    ContactButton.href = "../contact/contact.html";
    HowToButton.href = "./howto.html";
    HowToButton.classList.add("active");
    TemplatesButton.href = "../templates/template.html";
  }

  divs.appendChild(HomeButton);
  divs.appendChild(HowToButton);
  divs.appendChild(TemplatesButton);
  divs.appendChild(ContactButton);

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
});

if(window.location.pathname.includes("index.html")) {

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

