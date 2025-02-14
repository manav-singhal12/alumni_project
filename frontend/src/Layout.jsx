import React from 'react'
import { Outlet } from 'react-router'
import LandingPage from './LandingPage/LandingPage'
import Navbar from './pages/Navbar'
import {ToastContainer} from 'react-toastify'
import Header from './components/Header'
import Footer from './components/Footer'
function Layout() {
  return (
    
    <>
   
     <Header />
     <ToastContainer/>
    <Outlet/>
    <Footer/>

    

    </>
  )
}

export default Layout