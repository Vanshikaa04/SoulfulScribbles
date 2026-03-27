import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';
import ProductForm from './pages/Admin/ProductForm';
import CategoryForm from './pages/Admin/CategoryForm';
import ProtectedRoute from './components/ProtectedRoute';
import UnderConstruction from './components/UnderConstruction';

function App() {
    const isUnderConstruction = import.meta.env.VITE_MAINTENANCE_MODE === 'true';

  if (isUnderConstruction) {
    return <UnderConstruction />;
  }
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/products/new" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
              <Route path="/admin/products/edit/:id" element={<ProtectedRoute><ProductForm /></ProtectedRoute>} />
              <Route path="/admin/categories/new" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
              <Route path="/admin/categories/edit/:id" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </Router>
    </AuthProvider>
  );
}

export default App;