import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [result, setResult] = useState('Welcome!');

  const Button = () => {
    const handleClick = async () => {
      try {
        const url = 'http://localhost:3000/apiv0';
        const result = await fetch(url);
        const data = await result.json();
        setResult(data.message);
      } catch (error) {
        setResult("Something went wrong!");
        console.error(error);
      }
    }

    return (
      <button id="theButton" onClick={handleClick}>Click me!</button>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button />
        {result}
      </header>
    </div>
  );
}

export default App;
