import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEdit, FaTrash, FaStar, FaRegStar, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import toast from 'react-hot-toast';
import api from '../../services/api';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await api.get('/products');
      setProducts(data);
    } catch (err) {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/products/${id}`);
        toast.success('Product deleted');
        fetchProducts();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      await api.patch(`/products/${id}/featured`);
      toast.success(`Product ${!currentStatus ? 'featured' : 'unfeatured'}`);
      fetchProducts();
    } catch (err) {
      toast.error('Failed to update featured status');
    }
  };

  const handleDeleteImage = async (productId, imageUrl) => {
    if (window.confirm('Remove this image from the product?')) {
      try {
        await api.delete(`/products/${productId}/images`, { data: { imageUrl } });
        toast.success('Image removed');
        setProducts(prev =>
          prev.map(p =>
            p._id === productId
              ? { ...p, images: p.images.filter(img => img !== imageUrl) }
              : p
          )
        );
        if (selectedProduct && selectedProduct._id === productId) {
          const newImages = selectedProduct.images.filter(img => img !== imageUrl);
          if (newImages.length === 0) {
            closeModal();
          } else {
            setSelectedProduct(prev => ({ ...prev, images: newImages }));
            if (currentImageIndex >= newImages.length) {
              setCurrentImageIndex(newImages.length - 1);
            }
          }
        }
      } catch (err) {
        toast.error('Failed to remove image');
      }
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProduct && selectedProduct.images.length) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }
  };

  const prevImage = () => {
    if (selectedProduct && selectedProduct.images.length) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedProduct.images.length) % selectedProduct.images.length);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-darkBrown">Admin Dashboard</h1>
          <Link
            to="/admin/products/new"
            className="bg-darkBrown text-white px-4 py-2 rounded-lg hover:bg-accentPink transition"
          >
            + Add New Product
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accentPink"></div>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-xl shadow">
            <p className="text-darkBrown/70">No products yet. Click "Add New Product" to get started.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-darkBrown uppercase tracking-wider">Image</th>
                  {/* Desktop only columns */}
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-darkBrown uppercase tracking-wider">Category</th>
                  <th className="hidden md:table-cell px-6 py-3 text-left text-xs font-medium text-darkBrown uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-darkBrown uppercase tracking-wider">Edit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-darkBrown uppercase tracking-wider">Delete</th>

                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product, idx) => (
                  <motion.tr
                    key={product._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    {/* Image column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.images?.length > 0 ? (
                        <button onClick={() => openModal(product)} className="focus:outline-none">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded cursor-pointer hover:opacity-80 transition"
                          />
                        </button>
                      ) : (
                        <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                          No img
                        </div>
                      )}
                    </td>
                   
                    {/* Desktop only: Category */}
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap capitalize text-darkBrown/80">
                      {product.category || '-'}
                    </td>
                    {/* Desktop only: Price */}
                    <td className="hidden md:table-cell px-6 py-4 whitespace-nowrap text-darkBrown/80">
                      {product.price ? `₹${product.price}` : '-'}
                    </td>
                  
                    {/* Actions (always visible) */}
                    <td className="px-8 py-4 whitespace-nowrap space-x-3">
                      <Link
                        to={`/admin/products/edit/${product._id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit size={18} />
                      </Link>
                      </td>
                      <td className="px-8 py-4 whitespace-nowrap space-x-3">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Image Modal (same as before) */}
 <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h3 className="text-xl font-bold text-darkBrown">{selectedProduct.name} – Images</h3>
                <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="relative p-4">
                {selectedProduct.images.length > 0 ? (
                  <div className="relative flex items-center justify-center">
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                    >
                      <FaChevronLeft />
                    </button>
                    <img
                      src={selectedProduct.images[currentImageIndex]}
                      alt={`${selectedProduct.name} ${currentImageIndex + 1}`}
                      className="max-h-[60vh] max-w-full object-contain"
                    />
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white"
                    >
                      <FaChevronRight />
                    </button>
                  </div>
                ) : (
                  <p className="text-center text-darkBrown/70">No images available.</p>
                )}
                <div className="mt-4 flex justify-center gap-2 flex-wrap">
                  {selectedProduct.images.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={img}
                        alt={`thumb ${idx}`}
                        className={`w-16 h-16 object-cover rounded border-2 cursor-pointer ${
                          currentImageIndex === idx ? 'border-accentPink' : 'border-transparent'
                        }`}
                        onClick={() => setCurrentImageIndex(idx)}
                      />
                      {/* Trash icon always visible */}
                      <button
                        onClick={() => handleDeleteImage(selectedProduct._id, img)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-700 transition"
                      >
                        <FaTrash size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Dashboard;