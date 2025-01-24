/* eslint-disable no-unused-vars */
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeaderTop from '../components/HeaderTop'
import '../css/colaboradores.css'
import { useState } from 'react'
import ColaboradoresGrid from '../components/ColaboradoresGrid'

const Colaboradores = () => {
   
  return (
    <>
      <HeaderTop />
      <Navbar />
      <ColaboradoresGrid />
      <Footer />
    </>
  )
}

export default Colaboradores