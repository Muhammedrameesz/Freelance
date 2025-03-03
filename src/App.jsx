import React from 'react'
import Header from './components/Header'
import Nav from './Navbar/Nav'
import OurServices from './components/OurServices'
import Footer from './components/Footer'
import OurTeam from './components/OurTeam.jsx'
import ContactForm from './components/contactForm.jsx'
import FixedBottom from './components/FixedBottom.jsx'

export default function App() {
  
  return (
   <div>
      <Nav/>
      <FixedBottom/>
      <Header/>
      <OurServices/>
      <OurTeam/>
      <ContactForm/>
      <Footer/>
     
   </div>
  )
}
