class CookieAlert extends HTMLElement {
  constructor() {
      super();
  }

  connectedCallback() {
    this.innerText = "This website uses cookies to ensure you get the best experience";
  }
}

customElements.define("cookie-alert", CookieAlert);

