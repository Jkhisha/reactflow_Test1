import React from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Canvas from './Components/Canvas/Canvas';
import './App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <Canvas />
    </div>
  );
}

export default App;