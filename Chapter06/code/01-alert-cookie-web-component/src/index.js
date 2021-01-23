const styleRules = `
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
`;

class CookieAlert extends HTMLElement {
  constructor() {
      super();

      this._message = "This website uses cookies to ensure you get the best experience";
      this._onAcceptedListener = null;
  }

  connectedCallback() {
    const cookiesAccepted = getCookie("cookiesAccepted")

    if (cookiesAccepted === "y") {
      this.style.visibility = "hidden";
    } else {
      this.createComponent();
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
  
  createComponent() {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(styleRules));
    this.appendChild(style);

    const span = document.createElement("span");
    const div = document.createElement("div");
    div.classList.add("container", "footer");
    div.appendChild(span);

    const closeButton = document.createElement("button");
    closeButton.classList.add("button");
    closeButton.innerText = "Close";
    closeButton.addEventListener("click", ()=>{
      this.style.visibility = "hidden";
    });
    div.appendChild(closeButton);

    const acceptButton = document.createElement("button");
    acceptButton.classList.add("button");
    acceptButton.innerText = "Accept";
    acceptButton.addEventListener("click", ()=>{
      this.style.visibility = "hidden";
      setCookie("cookiesAccepted", "y", 365);
      this.dispatchEvent(new CustomEvent("accepted", { 
        detail:{ 
          acceptedCookieName: "cookiesAccepted", 
          acceptedCookieExpiration: 365}
        }));
    });
    div.appendChild(acceptButton);

    this.appendChild(div);

    this.updateMessage();
  }

  updateMessage() {
    this.querySelector("span").innerText = this._message;
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

