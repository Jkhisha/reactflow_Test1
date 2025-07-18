import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Canvas from './components/Canvas/Canvas';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Canvas />
      </div>
      <div id='btm-right'></div>
    </div>
  );
}

export default App;