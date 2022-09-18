import React from 'react';
import {Link } from "react-router-dom";

function Menu() {
  return (
    <div className="flex-row z-50 bg-slate-900 p-3">
        <Link to="/" className="text-red-600 underline m-11 hover:text-white">Home</Link>
        <Link to="/crypto" className="text-red-600 underline m-22 hover:text-white">CRYPTO</Link>
    </div>
  )
}

export default Menu