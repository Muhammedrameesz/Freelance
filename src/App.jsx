import React from 'react'
import Header from './components/Header'
import Nav from './Navbar/Nav'
import OurServices from './components/OurServices'
import Footer from './components/Footer'
import OurTeam from './components/OurTeam.jsx'

export default function App() {
  return (
   <div>
      <Nav/>
      <Header/>
      <OurServices/>
      <OurTeam/>
      <Footer/>
   </div>
  )
}
