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
// import OpenSourceProjectPosting from './pages/projectPages/OpenSourceProjectPosting.jsx'
import ShowProjects from './pages/projectPages/ShowProjects.jsx'
// import GetAllEvents from './pages/eventsPage/GetAllEvents.jsx'
import UpdateUserProfile from './pages/updateProfile/UpdateUserProfile.jsx'
import Donation from '../src/pages/Donation.jsx'



import Donations from './pages/Donations.jsx'


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
 {/* <Route path='getallevents' element={<GetAllEvents/>}/> */} 
      <Route path='eventposting' element={<EventPosting/>}/>
      <Route path='getAllProjects' element={<ShowProjects/>}/>
      <Route path='updateProfile' element={<UpdateUserProfile/>}/>

      {/* <Route path='projectposting' element={<OpenSourceProjectPosting/>}/> */}

      {/* <Route path="/update-profile" element={<UpdateProfile />} />
          <Route path="/dashboard" element={<Dashboard />} /> */}
      <Route path='projectposting' element={<OpenSourceProjectPosting/>}/>


      <Route path="/chat/:userId" element={<ChatPage />} />
      <Route path="donation" element={<Donations />} />


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








