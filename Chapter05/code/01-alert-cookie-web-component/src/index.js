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
  }

  connectedCallback() {
    this.createComponent();
  }

  get message() {
    return this._message;
  }

  set message(value) {
    this._message = value;
    this.setAttribute("message", value);
    this.updateMessage();
  }

  static get observedAttributes() {
    return ["message"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name === "message") {
        this._message = newValue;
        this.updateMessage();
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

    this.appendChild(div);

    this.addEventListener("mouseover", ()=> {
      div.style.backgroundColor = "rgb(35, 122, 152)";
    });
    this.addEventListener("mouseout", ()=> {
      div.style.backgroundColor = "";
    });

    this.updateMessage();
  }

  updateMessage() {
    this.querySelector("span").innerText = this._message;
  }
}

customElements.define("cookie-alert", CookieAlert);
