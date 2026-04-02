import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import api from "../services/api";



const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayCount, setDisplayCount] = useState(6); // default desktop

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  // Handle responsive display count
  useEffect(() => {
    const handleResize = () => {
   
        setDisplayCount(4); // mobile: 4 products
      // } else {
        // setDisplayCount(4); // desktop/tablet: 6 products
      // }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const { data } = await api.get("/products");
      const featured = data.filter((p) => p.featured === true);
      setProducts(featured);
    } catch (err) {
      console.error("Failed to load featured products", err);
    } finally {
      setLoading(false);
    }
  };

 

  const imageCarouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
  };

  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-accentPink mx-auto"></div>
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  const displayedProducts = products.slice(0, displayCount);

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto ">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold text-darkBrown text-center mb-8"
        >
          Featured Products
        </motion.h2>

        {/* Grid: 2 columns on mobile, 2 on tablet, 3 on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-4 ">
          {displayedProducts.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className=" bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col relative"
            >
              {/* Star icon top right */}
              <div className="absolute top-2 right-2 z-10">
                <FaStar className="text-yellow-400 drop-shadow-md" size={18} />
              </div>

              {/* Image carousel */}
              <div className="aspect-square bg-gray-100">
                {product.images && product.images.length > 0 ? (
                  <Slider {...imageCarouselSettings}>
                    {product.images.map((img, i) => (
                      <div key={i} className="aspect-square">
                        <img
                          src={img}
                          alt={`${product.name} ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    No image
                  </div>
                )}
              </div>

              {/* Description & button */}
              <div className="p-3 flex flex-col flex-grow">
                <p className="text-darkBrown/70 text-xs mb-3 line-clamp-2">
                  {product.description ||
                    "A beautiful gift for every occasion."}
                </p>
                <div className="mt-auto">
                  <Link
                    to={`/product/${product._id}`}
                    className="block text-center bg-darkBrown text-white text-xs py-1.5 hover:bg-accentPink hover:text-darkBrown transition-all duration-300 w-full md:w-full sm:w-1/2 mx-auto whitespace-nowrap"
                  >
                    View Product
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Products button */}
        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-block bg-darkBrown text-white px-6 py-2 rounded-full hover:bg-accentPink hover:text-darkBrown transition-all duration-300"
          >
            View More Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
