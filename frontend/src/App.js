import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [result, setResult] = useState("You've said nothing");

  const Button = () => {
    const handleClick = async () => {
      const element = document.getElementById('field');
      const url = `http://localhost:3000/apiv0/${element.value}`;
      element.value = "";

      const response = await fetch(url);
      const data = await response.json();
      setResult(data.message);
    }

    return (
      <button onClick={handleClick}>Click Me!</button>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <input id='field' />
        {result}
        <Button />
      </header>
    </div>
  );
}

export default App;
