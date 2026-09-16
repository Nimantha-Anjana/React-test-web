import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Global Layout Stylesheet
import './App.css';

// Layout Components
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// Page Components
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';

/* ==========================================================================
   STATIC PLACEHOLDER COMPONENTS FOR UPCOMING PAGES
   ========================================================================== */
const Bookings = () => (
  <div className="luxury-card p-4">
    <h3 className="brand-font text-navy">Bookings & Reservations</h3>
    <p className="text-muted mb-0">Bookings management module coming in next step...</p>
  </div>
);

const Customers = () => (
  <div className="luxury-card p-4">
    <h3 className="brand-font text-navy">Guest Directory</h3>
    <p className="text-muted mb-0">Customer management module coming in next step...</p>
  </div>
);

const Dining = () => (
  <div className="luxury-card p-4">
    <h3 className="brand-font text-navy">Dining & Services</h3>
    <p className="text-muted mb-0">Dining orders and menu management module coming in next step...</p>
  </div>
);

const Facilities = () => (
  <div className="luxury-card p-4">
    <h3 className="brand-font text-navy">Hotel Facilities</h3>
    <p className="text-muted mb-0">Facilities and spa reservation module coming in next step...</p>
  </div>
);

const Messages = () => (
  <div className="luxury-card p-4">
    <h3 className="brand-font text-navy">Guest Communications</h3>
    <p className="text-muted mb-0">Concierge messaging module coming in next step...</p>
  </div>
);

const Settings = () => (
  <div className="luxury-card p-4">
    <h3 className="brand-font text-navy">System Settings</h3>
    <p className="text-muted mb-0">Hotel settings & config module coming in next step...</p>
  </div>
);

/* ==========================================================================
   MAIN ADMIN LAYOUT WRAPPER COMPONENT
   ========================================================================== */
const AdminLayout = () => {
  // Mobile sidebar open/close state toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="admin-layout">
      {/* 1. Fixed Left Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* 2. Main Wrapper (Topbar + Content Area) */}
      <div className="main-wrapper">
        {/* Sticky Header Topbar */}
        <Topbar toggleSidebar={toggleSidebar} />

        {/* Dynamic Page Content Outlet */}
        <main className="content-wrapper">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/* ==========================================================================
   APP ROUTER CONFIGURATION
   ========================================================================== */
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root URL "/" to "/admin" */}
        <Route path="/" element={<Navigate to="/admin" replace />} />

        {/* Admin Nested Route Hierarchy */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="customers" element={<Customers />} />
          <Route path="dining" element={<Dining />} />
          <Route path="facilities" element={<Facilities />} />
          <Route path="messages" element={<Messages />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;