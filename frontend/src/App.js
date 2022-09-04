import React from 'react';
import logo from './logo.svg';
import './App.css';
import Index from './pages';
import Crypto from './pages/crypto';
import { Routes, Route, Link } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />}/>
        <Route path="/crypto" element={<Crypto />}/>
      </Routes>
    </div>
  );
}

export default App;
