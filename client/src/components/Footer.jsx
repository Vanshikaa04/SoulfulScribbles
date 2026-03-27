import { FaWhatsapp, FaEnvelope, FaFacebook, FaInstagram, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-darkBrown text-softWhite pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Soulful Scribble</h3>
            <p className="text-sm opacity-80">Creating personalized gifts that tell your story.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-accentPink">About Us</a></li>
              <li><a href="#products" className="hover:text-accentPink">Products</a></li>
              <li><a href="#faq" className="hover:text-accentPink">FAQ</a></li>
              <li><a href="#contact" className="hover:text-accentPink">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Our Partners</h4>
            <ul className="space-y-2 text-sm">
              <li>Shell</li>
              <li>Ferrari</li>
              <li>Rolex</li>
              <li>Prada</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <div className="flex gap-4 text-2xl">
              <a href="https://wa.me/1234567890" target="_blank" rel="noopener"><FaWhatsapp /></a>
              <a href="mailto:hello@soulfulscribble.com"><FaEnvelope /></a>
              <a href="https://facebook.com/soulfulscribble" target="_blank" rel="noopener"><FaFacebook /></a>
              <a href="https://instagram.com/soulfulscribble" target="_blank" rel="noopener"><FaInstagram /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-softWhite/20 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Soulful Scribble. Made with <FaHeart className="inline text-accentPink" /> for every occasion.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;