import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Outlet } from 'react-router'
import { Route } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store.js'
import Login from './pages/authPages/Login.jsx'
import LandingPage from './LandingPage/LandingPage.jsx'
import Layout from './Layout.jsx'
import Register from './pages/authPages/Register.jsx'

import GetAllJobs from './pages/jobsPage/GetAllJobs.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import Batches from './pages/Batches.jsx'

import EventPosting from './pages/eventsPage/EventPosting.jsx'
import OpenSourceProjectPosting from './pages/projectPages/OpenSourceProjectPosting.jsx'
import ShowProjects from './pages/projectPages/ShowProjects.jsx'
import GetAllEvents from './pages/eventsPage/GetAllEvents.jsx'
import UpdateUserProfile from './pages/updateProfile/UpdateUserProfile.jsx'

import Donation from './pages/Donation.jsx'

import ChatPage from '../../frontend/src/components/ChatPage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route index element={<LandingPage/>}/>
      <Route path='login' element={<Login/>} />
      <Route path='register' element={<Register/>}/>
      <Route path='alljobs' element={<GetAllJobs/>}/>

     

      <Route path='getCurrentUser' element={<UserDashboard/>}/>
      <Route path='batches' element={<Batches/>}/>

      <Route path="/chat/:userId" element={<ChatPage/>} />
 <Route path='getallevents' element={<GetAllEvents/>}/>
      <Route path='eventposting' element={<EventPosting/>}/>
      <Route path='getAllProjects' element={<ShowProjects/>}/>
      <Route path='updateProfile' element={<UpdateUserProfile/>}/>
      <Route path='projectposting' element={<OpenSourceProjectPosting/>}/>

      <Route path="/chat/:userId" element={<ChatPage />} />
      <Route path="donation" element={<Donation />} />


    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
    <App/>
   <RouterProvider router={router}/>
   </Provider>
  </StrictMode>,
)









// routes



// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Events from './pages/Events';
// import Donation from './pages/Donation';
// import JobPortal from './pages/Jobportal';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import Profile from './components/Profile';
// import Batches from './pages/Batches';

// function App() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       <main className="flex-grow">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/events" element={<Events />} />
//           <Route path="/donation" element={<Donation />} />
//           <Route path="/jobportal" element={<JobPortal />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/batches" element={<Batches />} />

//         </Routes>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// export default App;
