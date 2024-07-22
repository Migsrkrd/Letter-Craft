export function emptyTemplates(mainElement, divElement) {
    let div = divElement;
    let main = mainElement;
    div.style.overflowX = "hidden";
    div.style.border = "none";

    if (document.getElementById("infoDiv")) {
      document.getElementById("infoDiv").remove();
    }

    let backgroundImage = document.createElement("i");
    backgroundImage.setAttribute("class", "fa-solid fa-comment");
    backgroundImage.setAttribute("alt", "empty templates");
    backgroundImage.classList.add("emptyImage");
    div.appendChild(backgroundImage);

    let emptyStatement = document.createElement("p");
    emptyStatement.style.textAlign = "center";
    emptyStatement.style.fontSize = "1.5rem";
    emptyStatement.style.margin = "13px";
    emptyStatement.innerHTML = `You have no templates. Click the create button to create a new template. <br> If you are new to this app, click the how to button in the sidebar to learn how to use it.<br>Once you have created a template, it will appear here.<br> To view your templates in the future, click the 'Your Templates' button in the sidebar or at the top right corner of this page. <br> Happy templating!`;

    div.appendChild(emptyStatement);

    let testHead = `<div class="firstTwo">
  <div style="margin: 20px;">
    <h2>Tips for Creating Effective Templates:</h2>
    <ul style="text-align: left; display: inline-block;">
      <li>Keep your templates concise and to the point.</li>
      <li>Use clear and professional language.</li>
      <li>Include placeholders for personalized information.</li>
    </ul>
  </div>
  <div style="margin: 20px;">
      <h2>Benefits of Using Templates:</h2>
      <ul style="text-align: left; display: inline-block;">
        <li>Saves time by not having to start from scratch.</li>
        <li>Ensures consistency across communications.</li>
        <li>Enhances professionalism.</li>
      </ul>
    </div>
    </div>
    <div style="margin: 20px;">
      <h2>Need Help?</h2>
      <p>Contact our support team at <a href="../contact/contact.html"</a> if you have any questions.</p>
    </div>`;

    let infoDiv = document.createElement("div");
    infoDiv.innerHTML = testHead;
    infoDiv.setAttribute("id", "infoDiv");
    main.insertBefore(infoDiv, document.getElementById("footer"));

    return;
}