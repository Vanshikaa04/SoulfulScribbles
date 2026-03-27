import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaInstagram } from 'react-icons/fa';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-softWhite">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-4xl font-bold text-darkBrown mb-6">Get in Touch</h2>
            <p className="text-darkBrown/80 mb-8">
              Have a question, feedback, or need assistance with your order? Our dedicated team is here to help.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <FaWhatsapp className="text-accentPink text-2xl" />
                <a href="https://wa.me/1234567890" className="hover:text-accentPink">+91 12345 67890</a>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="text-accentPink text-2xl" />
                <a href="mailto:hello@soulfulscribble.com" className="hover:text-accentPink">hello@soulfulscribble.com</a>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="text-accentPink text-2xl" />
                <span>123 Gift Lane, Mumbai, India</span>
              </div>
              <div className="flex items-center gap-4">
                <FaInstagram className="text-accentPink text-2xl" />
                <a href="https://instagram.com/soulfulscribble" target="_blank" rel="noopener">@soulfulscribble</a>
              </div>
            </div>
          </div>
          <div className="bg-pastelPink p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-darkBrown mb-4">Send us a Message</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-2 rounded-lg border border-darkBrown/20 focus:outline-none focus:ring-2 focus:ring-accentPink" />
              <input type="email" placeholder="Your Email" className="w-full px-4 py-2 rounded-lg border border-darkBrown/20 focus:outline-none focus:ring-2 focus:ring-accentPink" />
              <textarea rows="4" placeholder="Your Message" className="w-full px-4 py-2 rounded-lg border border-darkBrown/20 focus:outline-none focus:ring-2 focus:ring-accentPink"></textarea>
              <button className="bg-darkBrown text-softWhite px-6 py-2 rounded-full hover:bg-accentPink hover:text-darkBrown transition">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;