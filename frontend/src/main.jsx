import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, createRoutesFromElements, Outlet } from 'react-router';
import { Route, Navigate, RouterProvider } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import store from './redux/store.js';

import Login from './pages/authPages/Login.jsx';
import LandingPage from './LandingPage/LandingPage.jsx';
import Layout from './Layout.jsx';
import Register from './pages/authPages/Register.jsx';

import GetAllJobs from './pages/jobsPage/GetAllJobs.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import Batches from './pages/Batches.jsx';
import EventPosting from './pages/eventsPage/EventPosting.jsx';
import ShowProjects from './pages/projectPages/ShowProjects.jsx';
import UpdateProfile from './components/UpdateProfile.jsx';
import Dashboard from './components/Dashboard.jsx';
import BatchUsers from './pages/BatchUsers.jsx';
import Donations from './pages/Donations.jsx';
import ChatPage from '../../frontend/src/components/ChatPage.jsx';
import SolanaTransaction from './components/SolanaTransaction.jsx';
import RazorpayTransaction from './components/RazorPayTransaction.jsx';

// ProtectedRoute component: If not logged in, redirect to /login
const ProtectedRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" />;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      {/* Public routes */}
      <Route index element={<LandingPage />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />
      <Route path='eventposting' element={<EventPosting />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='alljobs' element={<GetAllJobs />} />
        <Route path='getCurrentUser' element={<UserDashboard />} />
        <Route path='batches' element={<Batches />} />
        <Route path="/chat/:userId" element={<ChatPage />} />
        <Route path='getAllProjects' element={<ShowProjects />} />
        <Route path="/update-profile" element={<UpdateProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="donation" element={<Donations />} />
        <Route path="/donations/solana" element={<SolanaTransaction />} />
        <Route path="/donations/razorpay" element={<RazorpayTransaction />} />
        <Route path="/batch/:batchName" element={<BatchUsers />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
