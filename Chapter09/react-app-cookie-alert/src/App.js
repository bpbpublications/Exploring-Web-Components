import React, {useRef, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import 'cookie-alert-demo';

function App() {
  const cookieAlert = useRef(null);

  useEffect(() => {
    cookieAlert.current.message = "We use cookies, but respect your privacy!";
    cookieAlert.current.addEventListener("accepted", () => alert("Thanks for accepting our cookie policy!"));
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <cookie-alert ref={cookieAlert}></cookie-alert>
    </div>
  );
}

export default App;
