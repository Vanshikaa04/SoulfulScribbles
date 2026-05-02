import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import GiftingHub from './pages/GiftingHub.jsx';
import TechnoHub from './pages/TechnoHub.jsx';

import AdminLogin from './pages/admin/AdminLogin.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProducts from './pages/admin/AdminProducts.jsx';
import AdminProjects from './pages/admin/AdminProjects.jsx';

import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

import UnderConstruction from './components/UnderConstruction';
import Scrolling from './components/Scrolling.jsx';

export const AuthContext = createContext(null);

function ProtectedRoute({ children }) {
  const { admin } = useContext(AuthContext);
  if (!admin) return <Navigate to="/admin/login" replace />;
  return children;
}

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

export default function App() {
  const isUnderConstruction = import.meta.env.VITE_MAINTENANCE_MODE === 'true';
 const backendurl = import.meta.env.VITE_backendurl ;
   
  const [admin, setAdmin] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    fetch(`${backendurl}/api/auth/me`, { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(data => { setAdmin(data); setAuthLoading(false); })
      .catch(() => setAuthLoading(false));
  }, []);

  // 🔄 Loading screen
  if (authLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#2A0A12',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <img
            src="/logo.png"
            alt="Soulful Scribble"
            style={{ width: '80px', opacity: 0.8, marginBottom: '20px' }}
            onError={e => e.target.style.display = 'none'}
          />
          <div style={{
            fontFamily: 'Cormorant Garamond',
            fontSize: '28px',
            color: '#C4758A',
            fontStyle: 'italic'
          }}>
            Soulful Scribble
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ admin, setAdmin }}>
      <BrowserRouter>
        <Scrolling />

        <Routes>
          {/* 🔐 ADMIN ROUTES (ALWAYS WORK) */}
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate to="products" replace />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="projects" element={<AdminProjects />} />
          </Route>

          {/* 🚧 MAINTENANCE MODE */}
          {isUnderConstruction ? (
            <Route path="*" element={<UnderConstruction />} />
          ) : (
            <>
              {/* 🌐 PUBLIC ROUTES */}
              <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
              <Route path="/gifting" element={<PublicLayout><GiftingHub /></PublicLayout>} />
              <Route path="/techno" element={<PublicLayout><TechnoHub /></PublicLayout>} />

              {/* fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}