function SecureLink() {
  return Reflect.construct(HTMLAnchorElement, [], this.constructor);
}

SecureLink.prototype = Object.create(HTMLAnchorElement.prototype);
SecureLink.prototype.constructor = SecureLink;
Object.setPrototypeOf(SecureLink, HTMLAnchorElement);

SecureLink.prototype.connectedCallback = function() {
  this.addEventListener("click", (e) => {
    if (!this.href.startsWith("https")) {
      if (!confirm("You are about to navigate to an unsafe site. Do you want to continue?")) {
        e.preventDefault();
      }
    }
  });
}

customElements.define("secure-link", SecureLink, {extends: "a"});

