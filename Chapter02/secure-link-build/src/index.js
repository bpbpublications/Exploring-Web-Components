import "./secureLink";

window.onload = function() {
  const secureLink = document.createElement("a", {is:"secure-link"});

  secureLink.setAttribute("href", "http://www.wikipedia.org");
  secureLink.innerText = "Wikipedia";

  document.body.appendChild(secureLink);
};