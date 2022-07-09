import React from 'react';
import './App.scss';
import Curency from './Curency';

function App() {
  return (
    <div className="App">
      <div className='Header'>
        <h1>Калькулятор обміну(конвертації) валют</h1>
        <p> Тут ви можете переглянути актуальний курс однієї іноземної валюти на іншу</p>
      </div>
      <div className="converWrap">
        <Curency />
      </div>
     
    </div>
  );
}

export default App;
