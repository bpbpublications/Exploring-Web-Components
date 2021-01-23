import CookieAlert from 'cookie-alert-demo';

class MyCookieAlert extends CookieAlert {
  constructor() {
    super();

    this._hasCloseButton = false;
  }

  get hasCloseButton() {
    return this._hasCloseButton;
  }

  set hasCloseButton(value) {
    this._hasCloseButton = value;
    this.setAttribute("closebutton", value);

    this.toggleCloseButton(value);
  }

  toggleCloseButton(visible) {
    const closeButton = super.shadowRoot.getElementById("closeButton");

    closeButton.style.display = (visible? "block": "none");
  }

  static get observedAttributes() {
    return ["closebutton"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      if (name == "closebutton") {
        let isVisible = (newValue === "true" || newValue === "");
        this._hasCloseButton = isVisible;
        this.toggleCloseButton(isVisible);
      }
    }
  }

  connectedCallback() {
    super.connectedCallback();

    this.toggleCloseButton(this._hasCloseButton);
  }
}

customElements.define("my-cookie-alert", MyCookieAlert);