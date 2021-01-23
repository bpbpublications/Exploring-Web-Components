const template = document.createElement('template');

template.innerHTML = `
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
  <slot id="message" name="message"></slot>&nbsp;
  <slot name="reference"></slot>
  <button id="closeButton" class="button">Close</button>
  <button id= "acceptButton" class="button">Accept</button>
</div>
`;

export default class CookieAlert extends HTMLElement {
  constructor() {
      super();

      this._message = "This website uses cookies to ensure you get the best experience";
      this.attachShadow({mode: "open"});
      this.shadowRoot.appendChild(template.content.cloneNode(true));
      this._onAcceptedListener = null;
  }

  connectedCallback() {
    const cookiesAccepted = getCookie("cookiesAccepted")

    if (cookiesAccepted === "y") {
      this.style.visibility = "hidden";
    } else {
      this.initComponent();
    }
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
    this.setAttribute("message", value);
    this.updateMessage();
  }

  get onaccepted() {
    return this._onAcceptedListener;
  }

  set onaccepted(listener) {
    if (this._onAcceptedListener) {
      this.removeEventListener("accepted", this._onAcceptedListener);
    }

    if (typeof listener === "function") {
      this._onAcceptedListener = listener;
      this.addEventListener("accepted", this._onAcceptedListener);
    }
  }

  static get observedAttributes() {
    return ["message", "onaccepted"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "message") {
        this._message = newValue;
        this.updateMessage();
      }

      if (name === "onaccepted") {
        if (newValue) {
          this.onaccepted = new Function("event", `${newValue}`);
        } else {
          this.onaccepted = null;
        }
      }
    }
  }
  
  initComponent() {
    const closeButton = this.shadowRoot.getElementById("closeButton");
    closeButton.addEventListener("click", ()=>{
      this.style.visibility = "hidden";
    });

    const acceptButton = this.shadowRoot.getElementById("acceptButton");
    acceptButton.addEventListener("click", ()=>{
      this.style.visibility = "hidden";
      setCookie("cookiesAccepted", "y", 365);
      this.dispatchEvent(new CustomEvent("accepted", { 
        detail:{ 
          acceptedCookieName: "cookiesAccepted", 
          acceptedCookieExpiration: 365}
        }));
    });

    this.updateMessage();
  }

  updateMessage() {
    this.shadowRoot.getElementById("message").innerText = this._message;
  }
}

customElements.define("cookie-alert", CookieAlert);

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

