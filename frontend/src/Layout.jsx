import React from 'react'
import { Outlet } from 'react-router'
import LandingPage from './LandingPage/LandingPage'
import Navbar from './pages/Navbar'
import {ToastContainer} from 'react-toastify'
import Header from './components/Header'
function Layout() {
  return (
    
    <>
   
     <Header />
     <ToastContainer/>
    <Outlet/>
    

    </>
  )
}

export default Layout