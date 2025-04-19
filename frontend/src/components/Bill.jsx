import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import {  Container, Row, Col } from "react-bootstrap";

const Bill = () => {
    const {totalamount ,currency,   shipmentfee,} =useContext(ShopContext);
  return (
    <>
    <Title text1={"Cart "} text2={"Total"} />
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6} className="border rounded p-4 shadow-sm bg-light">
          {/* Subtotal */}
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
            <h5 className="fw-bold text-dark mb-0">Subtotal:</h5>
            <p className="fs-5 text-dark mb-0">{currency} {totalamount()}.00</p>
          </div>

          {/* Shipment Fee */}
          <div className="d-flex justify-content-between align-items-center border-bottom pb-3 mt-3">
            <h5 className="fw-bold text-dark mb-0">Shipment Fee:</h5>
            <p className="fs-5 text-dark mb-0">{currency} {shipmentfee}.00</p>
          </div>

          <div className="d-flex justify-content-between align-items-center mt-5 ">
            <h5 className="fw-bold text-dark mb-0">Total:</h5>
            <p className="fs-5 text-dark mb-0">{currency} {totalamount()==0?0 :totalamount()+shipmentfee}.00</p>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Bill
