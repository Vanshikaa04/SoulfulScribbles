import { Card } from "react-bootstrap";
import { Image, Container } from "react-bootstrap";
import exchange from "../assets/exchange.png";
import returnimg from "../assets/return.png";
import report from "../assets/report.png";
import "./css_folder/policy.css";

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
           
            At Soulful Scribbles, we take pride in offering a wide range of
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
        className="text-white my-2 h-auto w-100 p-0"
        style={{ backgroundColor: "var(--maincolor" }}
      >
        <h1 className="mx-3 my-4">Our Pride</h1>
        <div>
          <p className="my-2 mx-3 mb-5">
            We use safe, qualitative, and long-lasting materials in all our
            products, ensuring that they are not only visually appealing but
            also durable and comfortable to use. Most of our items are
            waterproof, making them resistant to everyday wear and tear while
            maintaining their beauty over time. Our range includes a variety of
            stunning products, such as handmade candles, resin keychains, resin
            jewelry, resin clocks, wall pieces, and mandala art. For art lovers,
            we offer unique bookmarks, canvas paintings, and beautifully
            decorated glassware and bottles that add a touch of elegance to any
            space. We also specialize in traditional and festive decor such as
            pooja thalis, diyas, aasan, aarti thalis, and Karwa Chauth pooja
            thalis, which make perfect additions to your celebrations. One of
            our standout features is our customization option, allowing
            customers to personalize their orders according to their
            preferences. Whether it’s selecting a specific size, shape, or
            design, we go the extra mile to create pieces that reflect your
            unique taste and style. Our customization service ensures that your
            product is truly one of a kind, tailored to your specific needs and
            desires. To make your shopping experience smooth and enjoyable, we
            offer fast and reliable PAN India shipping, ensuring that your
            orders are delivered within 3 to 5 days. We understand the
            importance of flexibility, which is why we provide multiple payment
            options, including Cash on Delivery (COD) and secure online
            payments, giving you the convenience to shop without any worries.
            Additionally, we value customer satisfaction and offer a hassle-free
            7-day return and exchange policy, allowing you to shop with
            confidence. At Soulful Scribbles, we prioritize transparency and
            community engagement. Customers can read and leave reviews on each
            product, helping others make informed decisions while also sharing
            their own experiences. This allows us to continually improve and
            provide you with the best handcrafted creations. Your privacy and
            security are extremely important to us. Our website is built with
            strong encryption protocols to ensure that your personal information
            and payment details remain safe and protected at all times. We are
            committed to maintaining a secure and seamless shopping environment,
            allowing you to browse and order with complete peace of mind. With
            Soulful Scribbles, you are not just purchasing a product—you are
            investing in art, craftsmanship, and heartfelt creativity. Whether
            you are looking for a thoughtful gift, a custom home decor piece, or
            a festive essential, we have something special for you. Experience
            the magic of handcrafted artistry—shop with Soulful Scribbles today
            and bring home creativity with a personal touch! ✨🎨🛍
          </p>
        </div>
      </Container>

      <p className="text-center my-5">
        &copy; 2025 Soulful Scribbles. All rights reserved.
      </p>
    </Card>
  );
};

export default Footer;
