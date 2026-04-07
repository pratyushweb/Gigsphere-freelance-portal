import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

import LandingPage from './pages/LandingPage';
import Login from './pages/auth/Login';
import RoleSelect from './pages/auth/RoleSelect';
import RegisterForm from './pages/auth/RegisterForm';

import ClientDashboard from './pages/dashboard/ClientDashboard';
import FreelancerDashboard from './pages/dashboard/FreelancerDashboard';
import Proposals from './pages/dashboard/Proposals';
import Chat from './pages/dashboard/Chat';

import GigList from './pages/gigs/GigList';
import GigDetails from './pages/gigs/GigDetails';

import FreelancerProfile from './pages/profile/FreelancerProfile';
import AdminDashboard from './pages/admin/AdminDashboard';
import Success from './pages/payment/Success';
import Cancel from './pages/payment/Cancel';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        {/* Public Routes with MainLayout (Navbar + Footer) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gigs" element={<GigList />} />
          <Route path="/gigs/:id" element={<GigDetails />} />
          <Route path="/freelancers" element={<Navigate to="/gigs" replace />} />
          <Route path="/profile/freelancer" element={<FreelancerProfile />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        {/* Auth Routes (No layout) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RoleSelect />} />
        <Route path="/register/details" element={<RegisterForm />} />

        {/* Dashboard Routes with DashboardLayout (Sidebar) */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          {/* Client Routes */}
          <Route path="client" element={<ClientDashboard />} />
          <Route path="client/gigs/:gigId/proposals" element={<Proposals />} />
          
          {/* Freelancer Routes */}
          <Route path="freelancer" element={<FreelancerDashboard />} />
          
          {/* Shared Routes */}
          <Route path="chat" element={<Chat />} />
        </Route>

        {/* Payment Result Routes */}
        <Route path="/payment/success" element={<Success />} />
        <Route path="/payment/cancel" element={<Cancel />} />
      </Routes>
    </div>
  );
}

export default App;
