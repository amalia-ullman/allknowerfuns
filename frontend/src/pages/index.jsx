import React from 'react'
import '../style/tw.css'
import Banner from '../components/Banner'
import {Link } from "react-router-dom";
import Tos from '../components/Tos';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

function Index() {
  return (
    <div>
      <div className="bg-red-100 min-h-[95vh]">
          <Banner />
          <Menu />
          <Tos />
          <h1 className='text-9xl z-0 m-8'>allknowerfuns :)</h1>
          <Link to="/crypto">CRYPTO</Link>
      </div>
      <Footer />
    </div>
  )
}

export default Index