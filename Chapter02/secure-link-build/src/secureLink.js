class SecureLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener("click", (e) => {
      if (!this.href.startsWith("https")) {
        if (!confirm("You are about to navigate to an unsafe site. Do you want to continue?")) {
          e.preventDefault();
        }
      }
    })
  }
}
customElements.define("secure-link", SecureLink, {extends: "a"});