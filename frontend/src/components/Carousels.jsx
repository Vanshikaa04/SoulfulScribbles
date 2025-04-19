// import { Carousel, Row, Col, Card, Container } from "react-bootstrap";
// import Title from "./Title";
// import Candle from "../assets/candle/candle (5).jpg";
// import Canvas from "../assets/canvas/cartoon (1).jpg";
// import Resin from "../assets/Resin/clock (1).jpg";
// import Decor from "../assets/decor/diyaa (1).jpg";
// import Glass from "../assets/glass/bottle (1).jpg";
// import mandala from "../assets/mandala/book (3).jpg";
// import "./css_folder/carousel.css";
// import { useNavigate } from "react-router-dom";

// const Carousels = () => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const navigate = useNavigate();

//   const featureditems = [
//     { img: Candle, name: "Candles",value :"Candle"},
//     { img: Resin, name: "Resin",value :"Resin" },
//     { img: Canvas, name: "Canvas" ,value :"Canvas"},
//     { img: mandala, name: "Mandala" ,value :"Mandala"},
//     { img: Glass, name: "Glass Decor" ,value :"Glass"},
//     { img: Decor, name: "Platters" ,value :"Decorations"},
//   ];

//   // Split the items into groups of 3 for each slide
//   const chunkedItems = [];
//   for (let i = 0; i < featureditems.length; i += 3) {
//     chunkedItems.push(featureditems.slice(i, i + 3));
//   }

//   return (
//     <Container className="my-5">
//       <Title text1={"Featured"} text2={"Items"} />
//       <Carousel interval={3000} className="maincont"> 
//         {chunkedItems.map((chunk, index) => (
//           <Carousel.Item key={index}>
//             <Row className="row-cols-1 row-cols-md-3 g-4 justify-content-center">
//               {chunk.map((item, index) => (
//                 <Col key={index}>
//                   <Card className="cards"  onClick={()=>navigate("/categoryproducts", { state: { value: item.value} })}>
//                     <Card.Img variant="top" src={item.img} className="img-fluid card-img" />
//                     <Card.Body className="text-center">
//                       <Card.Title className="cardtitle">{item.name}</Card.Title>
//                     </Card.Body>
//                   </Card>
//                 </Col>
//               ))}
//             </Row>
//           </Carousel.Item>
//         ))}
//       </Carousel>
//     </Container>
//   );
// };

// export default Carousels;


import { Carousel, Container } from "react-bootstrap";
import Title from "./Title";
import Candle from "../assets/candle/candle (5).jpg";
import Canvas from "../assets/canvas/cartoon (1).jpg";
import Resin from "../assets/Resin/clock (1).jpg";
import Decor from "../assets/decor/diyaa (1).jpg";
import Glass from "../assets/glass/bottle (1).jpg";
import mandala from "../assets/mandala/book (3).jpg";
import "./css_folder/carousel.css";
import { useNavigate } from "react-router-dom";

const Carousels = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  const featuredItems = [
    { img: Candle, name: "Candles", value: "Candle" },
    { img: Resin, name: "Resin", value: "Resin" },
    { img: Canvas, name: "Canvas", value: "Canvas" },
    { img: mandala, name: "Mandala", value: "Mandala" },
    { img: Glass, name: "Glass Decor", value: "Glass" },
    { img: Decor, name: "Platters", value: "Decorations" },
  ];

  const chunkedItems = [];
  for (let i = 0; i < featuredItems.length; i += 3) {
    chunkedItems.push(featuredItems.slice(i, i + 3));
  }

  return (
    <Container className="my-5">
      <Title text1={"Featured"} text2={"Items"} />

      {/* Desktop View: All items in one row */}
      <div className="desktop-featured">
        <div className="featured-items-wrapper">
          {featuredItems.map((item, index) => (
            <div
              key={index}
              className="circle-img-container"
              onClick={() =>
                navigate("/categoryproducts", { state: { value: item.value } })
              }
            >
              <img src={item.img} alt={item.name} className="circle-img" />
              <div className="img-overlay">
                <span className="img-title">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View: Carousel */}
      <div className="carousel-section mobile-featured">
        <Carousel interval={3000} indicators={false}>
          {chunkedItems.map((chunk, index) => (
            <Carousel.Item key={index}>
              <div className="featured-items-wrapper">
                {chunk.map((item, index) => (
                  <div
                    key={index}
                    className="circle-img-container"
                    onClick={() =>
                      navigate("/categoryproducts", {
                        state: { value: item.value },
                      })
                    }
                  >
                    <img src={item.img} alt={item.name} className="circle-img" />
                    <div className="img-overlay">
                      <span className="img-title">{item.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </Container>
  );
};

export default Carousels;
