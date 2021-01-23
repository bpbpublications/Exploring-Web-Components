import { html, define } from 'hybrids';

const message = "This website uses cookies to ensure you get the best experience";

function   accept(host) {
  host.style.visibility = "hidden";
  setCookie("cookiesAccepted", "y", 365);
  host.dispatchEvent(new CustomEvent("accepted", { 
    detail:{ 
      acceptedCookieName: "cookiesAccepted", 
      acceptedCookieExpiration: 365}
    }));
}

function checkCookie(host) {
  const cookiesAccepted = getCookie("cookiesAccepted")

  if (cookiesAccepted === "y") {
    host.style.visibility = "hidden";
  }
}

export const CookieAlert = {
  message: {
    get: (host, lastValue = message) => lastValue,
    set: (host,value) => value,
    connect: checkCookie
  },
  render: ({message}) => html`
    <style>
      .container {
        color: rgb(255, 255, 255);
        background-color: rgb(35, 122, 252);
        padding: 1em 1.8em;
        width: 100%;
        font-family: Helvetica,Calibri,Arial,sans-serif;
      }
      .footer {
        position:fixed;
        left:0px;
        bottom:0px;
      }
      .button {
        color: rgb(255, 255, 255);
        background-color: transparent;
        border-color: rgb(255, 255, 255);
        padding: 5px 40px;
        margin-right: 50px;
        cursor: pointer;
        float:right;
      }
    </style>
    <div class="container footer">
      <slot id="message" name="message">${message}</slot>&nbsp;
      <slot name="reference"></slot>
      <button id="closeButton" class="button" onclick="${(host)=> host.style.visibility = "hidden"}">Close</button>
      <button id= "acceptButton" class="button" onclick="${accept}">Accept</button>
    </div>
  `
};

define("cookie-alert", CookieAlert);

function getCookie(cookieName) {
  var name = cookieName + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function setCookie(cookieName, cookieValue, expirationDays) {
  var d = new Date();
  d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
}

