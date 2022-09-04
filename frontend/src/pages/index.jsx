import React from 'react'
import '../style/tw.css'
import Banner from '../components/Banner'
import {Link } from "react-router-dom";
import Tos from '../components/Tos';
import Footer from '../components/Footer';

function Index() {
  return (
    <div>
      <div className="bg-red-100 min-h-[95vh]">
          <Banner />
          <Tos />
          <h1 className='text-9xl'>allknowerfuns :)</h1>
          <Link to="/crypto">CRYPTO</Link>
      </div>
      <Footer />
    </div>
  )
}

export default Index