import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './MyComponent';

class MyComponentWC extends HTMLElement {
  connectedCallback() {
    this.mountReactComponent();
  }

  disconnectedCallback() {
    ReactDOM.unmountComponentAtNode(this.mountPoint);
  }

  mountReactComponent() {
    if (!this.mountPoint) {
      this.mountPoint = document.createElement('div');
      this.attachShadow({ mode: 'open' }).appendChild(this.mountPoint);
    }

    ReactDOM.render(<MyComponent />, this.mountPoint);
  }
}

window.customElements.define('my-component', MyComponentWC);