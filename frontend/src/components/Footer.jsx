import { Card,Row, Col } from "react-bootstrap";
import { Image, Container } from "react-bootstrap";
import exchange from "../assets/exchange.png";
import returnimg from "../assets/return.png";
import report from "../assets/report.png";
import "./css_folder/policy.css";
import { FiInstagram, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <Card variant="primary" className="dark my-5 ">
      <div className="container w-100 p-0">
        <div className="row text-center my-5">
          <div className="col-md-3 mx-5">
            <h1 style={{ color: "var(--maincolor)" }}>Soulful Scribbles</h1>
            <p>
            Welcome to Soulful Scribbles – Where Creativity Meets Craftsmanship!
            </p>
          </div>
          <div className="col-md-3 mx-5 ">
            <h5 className=" d-flex flex-column gap-3 my-3 ">
              <a
                href="/about"
                style={{ color: "var(--maincolor)", textDecoration: "none" }}
              >
                About Us
              </a>
              <a
                href="/collection"
                style={{ color: "var(--maincolor)", textDecoration: "none" }}
              >
                Collections
              </a>
              <a
                href="/contact"
                style={{ color: "var(--maincolor)", textDecoration: "none" }}
              >
                Contact Us
              </a>
            </h5>
          </div>
          <div className="col-md-3 mx-5 ">
           
            At Soulful Scribbles, we offer a wide range of
            beautifully handcrafted products, designed with passion and
            precision. Our mission is to bring you artistic, high-quality, and
            unique handmade items at affordable prices, ensuring that everyone
            can experience the charm of handcrafted creativity. Whether you&apos;re
            looking for elegant resin art, home decor, festive essentials, or
            personalized gifts, our collection is carefully curated to suit
            every occasion and preference.
          </div>
        </div>
        <Container className="policy  d-flex flex-wrap justify-content-center gap-4 text-center my-5">
          <div className="main">
            <Image src={exchange} alt="img" className="img-size mx-5" fluid />
            <p className="service">Easy Exchange</p>
          </div>
          <div className="main">
            <Image src={returnimg} alt="img" className="img-size mx-5" fluid />
            <p className="service">Feasible Returns</p>
          </div>
          <div className="main">
            <Image src={report} alt="img" className="img-size mx-5" fluid />
            <p className="service">Report Issues</p>
          </div>
        </Container>
      </div>

      <Container
  fluid
  className="text-white my-2 py-4"
  style={{ backgroundColor: "var(--maincolor)" }}
>
  <Row className=" justify-content-center text-center  px-3">
    <Col xs={12} md={6}>
      <h4 className="mb-3 ">Get in Touch With Us:</h4>
    </Col>
    </Row>
    <Row className=" justify-content-center text-center  px-3">
    <Col xs={3} md={1} className=" justify-content-center">
      <a href="https://www.instagram.com/soulful.scribble__?igsh=MXBmaGlwcXRudnc3aA=="  className="text-white fs-3">
        <FiInstagram />
      </a>
    </Col>  
    <Col xs={3} md={1} className="justify-content-center ">
      <a href="https://mail.google.com/mail/?view=cm&to=soulful.scribble234@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-white fs-3">
        <FiMail />
      </a>
    </Col>
  </Row>
</Container>

      <p className="text-center my-5">
        &copy; 2025 Soulful Scribbles. All rights reserved.
      </p>
    </Card>
  );
};

export default Footer;
