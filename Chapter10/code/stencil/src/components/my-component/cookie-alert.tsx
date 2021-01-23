import { Component, Element, Prop, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'cookie-alert',
  styleUrl: 'cookie-alert.css',
  shadow: true
})
export class CookieAlert {
  @Prop()
  message: string = "This website uses cookies to ensure you get the best experience";
  
  @Element() 
  element: HTMLElement;
  
  @Event()
  accepted: EventEmitter;

  render() {
    return <div class="container footer">
    <slot name="message">{this.message}</slot>&nbsp;
    <slot name="reference"></slot>
    <button id="closeButton" class="button" onClick={()=>this.element.style.visibility = "hidden"}>Close</button>
    <button id= "acceptButton" class="button" onClick={()=>this.accept()}>Accept</button>
  </div>;
  }

  accept() {
    this.element.style.visibility = "hidden";
    setCookie("cookiesAccepted", "y", 365);
    this.accepted.emit({ 
      detail:{ 
        acceptedCookieName: "cookiesAccepted", 
        acceptedCookieExpiration: 365}
      });
  }

  connectedCallback() {
    const cookiesAccepted = getCookie("cookiesAccepted")

    if (cookiesAccepted === "y") {
      this.element.style.visibility = "hidden";
    }
  }
}

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