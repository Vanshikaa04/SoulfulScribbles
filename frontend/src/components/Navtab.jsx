import {
  Button,
  Container,
  Dropdown,
  Form,
  Nav,
  Navbar,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FiShoppingCart ,FiMenu} from "react-icons/fi";
import { fadeIn } from "../../../variants";
import { motion } from "framer-motion";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import "./css_folder/Navtab.css";
import { toast } from "react-toastify";

const Navtab = () => {
  const [searchbar, setsearchbar] = useState("");
  const location = useLocation();
  const [Search, setSearch] = useState([]);
  const [showDrawer, setShowDrawer] = useState(false);
  const { getCartcount, setToken, token, setUser } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken('');
    setUser(null);
    sessionStorage.clear(); // or just remove token & user
    navigate("/")
    setShowDrawer(false);
    toast.success("Logged Out Successfully!")
  };

  useEffect(() => {
    setsearchbar(location.pathname.includes("/collection"));
    const q = new URLSearchParams(location.search).get("search") || "";
    setSearch(q); // Keep input in sync with URL
  }, [location]);
  
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (Search.trim()) {
      navigate(`/collection?search=${encodeURIComponent(Search.trim())}`);
    }
  };

  return (
    <>
    <div className="fixed-nav-container">
    {/* Top nav bar */}
    <div className="top-navbar  d-flex align-items-center justify-content-between px-3 py-2 shadow-sm">
      <div className="d-flex align-items-center justify-content-between w-100">
        <div className="d-flex align-items-center gap-3 flex-grow-1">
        <Button
  variant="light"
  className="d-lg-none p-2 border rounded bg-white"
  onClick={() => setShowDrawer(true)}
>
  <FiMenu size={22} />
</Button>



          <motion.div
          className="d-flex align-items-center justify-content-between w-100 flex-wrap gap-2"
          variants={fadeIn("right", 0.0001)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.7 }}
        >
          <div className="nameclass text-center flex-grow-1">Soulful Scribbles</div>
          </motion.div>
        </div>

        {searchbar && (
  <Form
    className="searchbar-container d-none d-md-block"
    onSubmit={handleSearchSubmit}
  >
    <Form.Control
      type="text"
      placeholder="Search Collection..."
      className="searchbar"
      value={Search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </Form>
)}
      </div>
    </div>

    {/* Desktop Navbar */}
    <Navbar expand="lg" sticky="top" className="bg-white shadow-sm" style={{ zIndex: 1050 }}>
      <Container fluid>
        <Navbar.Collapse className="justify-content-center d-none d-lg-flex">
          <Nav className="d-flex align-items-center gap-4" navbarScroll>
            <Nav.Link as={NavLink} className="nav-link" to="/" activeclassname="active">Home</Nav.Link>
            <Nav.Link as={NavLink} className="nav-link" to="/about" activeclassname="active">About</Nav.Link>
            <Nav.Link as={NavLink} className="nav-link" to="/collection" state={{ Search }} activeclassname="active">Collection</Nav.Link>
            <Nav.Link as={NavLink} className="nav-link" to="/workshops" activeclassname="active">Workshops</Nav.Link>
            <Nav.Link as={NavLink} className="nav-link" to="/contact" activeclassname="active">Contact Us</Nav.Link>

            {typeof token === "string" && token.length > 0 ? (
              <Dropdown>
                <Dropdown.Toggle bsPrefix="toggle" className="drop" style={{ backgroundColor: "transparent", border: "none" }}>
                  <FontAwesomeIcon icon={faUser} className="icons text-dark fs-5" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate("/profile")}>My Profile</Dropdown.Item>
                  <Dropdown.Item onClick={() => navigate("/orders")}>Orders</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button className="border" style={{ backgroundColor: "var(--maincolor)" }} href="/login" activeclassname="active">
                Login
              </Button>
            )}

            <Link to="/cart" className="position-relative d-flex align-items-center">
              <FiShoppingCart className="fs-4" style={{ color: "black" }} />
              <p className="p-0 m-0 cart-count">{getCartcount()}</p>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
    {/* Drawer backdrop */}
    <div className={`backdrop ${showDrawer ? "show" : ""}`} onClick={() => setShowDrawer(false)}></div>

    {/* Drawer content */}
    <div className={`side-drawer ${showDrawer ? "open" : ""}`}>
      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom mb-4 ">
        <div className="nameclass " style={{marginTop:"80px"}}>Soulful Scribbles</div>
        <Button variant="light" onClick={() => setShowDrawer(false)}>✕</Button>
      </div>

      <Form onSubmit={handleSearchSubmit}>
  <Form.Control
    type="text"
    placeholder="Search Collection..."
    className="searchbar"
    value={Search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => {
      if (e.key === "Enter") handleSearchSubmit(e);
    }}
  />
</Form>


      <Nav className="flex-column px-4 gap-2 ">
        <Nav.Link as={NavLink} to="/" onClick={() => setShowDrawer(false)}>Home</Nav.Link>
        <Nav.Link as={NavLink} to="/about" onClick={() => setShowDrawer(false)}>About</Nav.Link>
        <Nav.Link as={NavLink} to="/collection" state={{ Search }} onClick={() => setShowDrawer(false)}>Collection</Nav.Link>
        <Nav.Link as={NavLink} to="/workshops" onClick={() => setShowDrawer(false)}>Workshops</Nav.Link>
        <Nav.Link as={NavLink} to="/contact" onClick={() => setShowDrawer(false)}>Contact Us</Nav.Link>

        {token.length > 0 ? (
          <>
            <Nav.Link onClick={() => { navigate("/profile"); setShowDrawer(false); }}>My Profile</Nav.Link>
            <Nav.Link onClick={() => { navigate("/orders"); setShowDrawer(false); }}>Orders</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </>
        ) : (
          <Nav.Link href="/login" onClick={() => setShowDrawer(false)} activeclassname="active">Login</Nav.Link>
        )}

        <Nav.Link as={Link} to="/cart" onClick={() => setShowDrawer(false)} className="position-relative">
          <FiShoppingCart className="fs-5 me-2" />
          {/* Cart */}
          {/* <span className="cart-count">{getCartcount()}</span> */}
        </Nav.Link>
      </Nav>
    </div>
  </>
  );
};

export default Navtab;
