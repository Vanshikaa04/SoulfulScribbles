import hero2 from "../assets/images/hero2.jpeg";
import hero3 from "../assets/images/hero4.jpg";

const Hero = () => {
  return (
    <section className="hero-section w-full">
      <picture>
        <source media="(min-width: 1024px)" srcSet={hero3} />
        <img src={hero2} alt="Soulful Scribble - The Gifting Hub" className="w-full h-auto" />
      </picture>
    </section>
  );
};

export default Hero;