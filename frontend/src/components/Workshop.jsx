import { Carousel, CarouselItem, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import workshop1 from "../assets/workshops/3.png";
import workshop2 from "../assets/workshops/4.png";
import "./css_folder/workshop.css";

const Workshop = () => {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate("/workshops");
  };

  return (
    <Carousel className="mx-3 workshop-carousel">
      <CarouselItem>
        <div className="carousel-wrapper">
          <img src={workshop1} className="workshop-img" alt="Workshop 1" />
          <Button className="join-btn" onClick={handleJoinNow}>
            Join Now
          </Button>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div className="carousel-wrapper">
          <img src={workshop2} className="workshop-img" alt="Workshop 2" />
          <Button className="join-btn" onClick={handleJoinNow}>
            Join Now
          </Button>
        </div>
      </CarouselItem>
    </Carousel>
  );
};

export default Workshop;
