import { useState } from 'react';
import toast from 'react-hot-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error('Please enter an email');
    // Here you could integrate with a real newsletter service, but for now just show success.
    toast.success('Thank you for subscribing!');
    setEmail('');
  };

  return (
    <section className="py-20 bg-pastelPink">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-4xl font-bold text-darkBrown mb-4">Let's Connect</h2>
        <p className="text-darkBrown/80 mb-8">
          Stay up-to-date with our latest offerings, special promotions, and more.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-full border border-darkBrown/20 focus:outline-none focus:ring-2 focus:ring-accentPink"
            required
          />
          <button
            type="submit"
            className="bg-darkBrown text-softWhite px-6 py-3 rounded-full hover:bg-accentPink hover:text-darkBrown transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;