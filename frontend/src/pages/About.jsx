import { Container, Row, Col, Image, Button } from "react-bootstrap";
import soulfulimg from "../assets/soulfulscribblelogo.png"
const About = () => {
  return (
    <Container className="py-5 text-center">
      <Row className="align-items-center">
        <Col lg={6} className="mb-4">
          <Image
            src={soulfulimg}
            alt="Soulful Scribbles"
            fluid
            rounded
          />
        </Col>
        <Col lg={6} className="text-lg-start">
          <h1 className="fw-bold " style={{color: "var(--maincolor)"}}>Welcome to Soulful Scribbles</h1>
          <p className="lead text-muted p-3">
            At <strong>Soulful Scribbles</strong>, we bring creativity to life
            through exquisite handmade products. Our collection features
            mesmerizing resin art, beautifully crafted candles, intricate
            mandala designs, stunning wall pieces, and elegant glass
            decorations.
          </p>
          <p>
            We specialize in creating customized treasures, including keychains,
            resin clocks, and canvases tailored to your taste. From sacred pooja
            dishes to decorative platters for special occasions like Haldi, Ring
            Ceremony, and Sangeet, our pieces are made with love and care.
          </p>
          <p>
            Beyond our collection, we offer <strong>exclusive workshops</strong>
            —both remotely and in-person—to help you explore your artistic side.
            Whether you&apos;re a beginner or an experienced creator, our workshops
            provide hands-on guidance in resin art, candle making, and more.
          </p>
          <Button  style={{backgroundColor: "var(--maincolor)"}} size="lg" className="mt-3" href="/collection">
            Explore Our Creations
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2 style={{color: "var(--maincolor)"}}>Join Our Creative Journey</h2>
          <p className="text-muted">
            Soulful Scribbles isn&apos;t just a store; it&apos;s a community
            where art meets passion. Join our workshops, explore custom designs,
            and own a piece of handcrafted beauty. Let’s create something
            magical together!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default About;
