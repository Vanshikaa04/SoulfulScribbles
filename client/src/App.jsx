import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import ProductForm from './pages/Admin/ProductForm';
import ProtectedRoute from './components/ProtectedRoute';
import UnderConstruction from './components/UnderConstruction';
import ProductPage from './pages/ProductPage';

// Wrapper component to check route and show UnderConstruction if not admin
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isUnderConstruction = !isAdminRoute; // Only admin routes are accessible

  if (isUnderConstruction) {
    return <UnderConstruction />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
          <Route path="/admin/products/edit/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
        <Toaster position="top-center" />
      </Router>
    </AuthProvider>
  );
}

export default App;