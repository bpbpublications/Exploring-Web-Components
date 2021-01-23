const styleMarkup = `
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
</style>
`;
const componentMarkup = `
<div class="container footer">
  <span>This website uses cookies to ensure you get the best experience</span>
</div>
`;

class CookieAlert extends HTMLElement {
  constructor() {
      super();
  }

  connectedCallback() {
    this.innerHTML = styleMarkup + componentMarkup;
  }
}

customElements.define("cookie-alert", CookieAlert);