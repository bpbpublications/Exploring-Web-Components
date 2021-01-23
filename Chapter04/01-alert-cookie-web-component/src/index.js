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
`;

class CookieAlert extends HTMLElement {
  constructor() {
      super();

      this._message = "This website uses cookies to ensure you get the best experience";
  }

  connectedCallback() {
    this.createComponent();
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
    this.updateMessage();
  }

  createComponent() {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(styleRules));
    this.appendChild(style);

    const span = document.createElement("span");
    //span.innerText = this._message;
    const div = document.createElement("div");
    div.classList.add("container", "footer");
    div.appendChild(span);
    this.appendChild(div);

    this.updateMessage();
  }

  updateMessage() {
    this.querySelector("span").innerText = this._message;
  }
}

customElements.define("cookie-alert", CookieAlert);
