import { useRef, useState } from "react";
import { gsap } from "gsap";
import image1 from "../assets/chatgptimgs/resinmake.png";
import image2 from "../assets/chatgptimgs/candlemaking_chat.png";
import bird from "../assets/bird.png";
import birdFlipped from "../assets/birdflipped.png"; // Rotated bird image
import "../components/css_folder/workshop.css";

export default function RingCarousel() {
  const scrollRef = useRef(null);
  const birdRef = useRef(null);
  const [image, setImage] = useState(image1);
  const [birdImage, setBirdImage] = useState(bird);
  const images = [image1, image2];

  const handleScroll = (direction) => {
    if (!scrollRef.current) return;

    let nextImage = direction === "left" ? image1 : image2;
    setImage(nextImage);

    // Change bird image based on direction
    setBirdImage(direction === "left" ? birdFlipped : bird);

    gsap.fromTo(
      birdRef.current,
      {
        x: "50vw",  // Start from center horizontally
        y: direction === "left" ? "90vh" : "-10vh",  // Start from bottom or top
        scale: 0.5,
        opacity: 0,
      },
      {
        x: "50vw",  // Stay centered horizontally
        y: direction === "left" ? "-10vh" : "90vh",  // Move diagonally opposite
        scale: 0.1,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
      }
    );

    setTimeout(() => {
      gsap.to(birdRef.current, { opacity: 0, duration: 0.5 });
    }, 1500);
  };

  return (
    <div className="wrapper">
      <div className="click-zone left" onClick={() => handleScroll("left")}>
        <span>⬅ Click to Scroll Left</span>
      </div>

      <div ref={scrollRef} className="scroll-container">
        <img src={image} alt="Display" className="display-image" />
      </div>

      <div className="click-zone right" onClick={() => handleScroll("right")}>
        <span>Click to Scroll Right ➡</span>
      </div>

      <img ref={birdRef} src={birdImage} alt="Bird" className="bird" />
    </div>
  );
}
