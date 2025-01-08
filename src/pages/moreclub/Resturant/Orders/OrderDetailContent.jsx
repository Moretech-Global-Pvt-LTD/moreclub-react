import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Row,
  Col,
  Badge,
  Card,
  Table,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { message } from "antd";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";
import RestaurantOrderFoodCard from "../../../../components/Moreclub/Resturant/Orders/RestaurantOrderFoodCard";
import RestarurantOfferFoodCard from "../../../../components/Moreclub/Resturant/Orders/RestarurantOfferFoodCard";

const OrderDetailsContent = ({ item }) => {
  const { ord_id, res_id } = useParams();

  const [orderStatus, setOrderStatus] = useState(item.order_status);
  const [showModal, setShowModal] = useState(false);
  const [actualorderStatus, setActualOrderStatus] = useState(item.order_status);
  const [statusLoading, setStatusLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setStatusLoading(true);
      const res = await morefoodAuthenticatedAxios.patch(
        `moreclub/user/orders/${ord_id}/${res_id}/`,
        {
          order_status: orderStatus,
        }
      );

      message.success("status updated successfully");
      setOrderStatus(res.data?.data?.order_status);
      setActualOrderStatus(res.data?.data?.order_status);
      setShowModal(false);
    } catch (err) {
      message.error("error updating status");
      setOrderStatus(item.order_status);
      setActualOrderStatus(item.order_status);
      console.log(err);
    }
    setStatusLoading(false);
  }

  // const totalAmount = item.items.reduce(
  //   (total, item) => total + item.quantity * item.price,
  //   0
  // );

  return (
    <div className="pe-4">
      <Row className="mt-4  flex-xl-row ">
        <Col className="col-12 col-lg-8 col-xl-6 my-xl-0 my-4 gy-2">
          <h5>Ordered Items</h5>
          {item.items.map((orders) => (
            <RestaurantOrderFoodCard
              item={orders}
              currency={item.currency_symbol}
            />
          ))}
          {item.offer.map((orders) => (
            <RestarurantOfferFoodCard
              item={orders}
              currency={item.currency_symbol}
            />
          ))}
          <div
            className="border-top-2 border-dashed mt-3 pt-2 border-dynamic-white text-dynamic-white fs-6 fw-semibold"
          >
            <div className="d-flex justify-content-between">
              <span>Total</span>
              <span>
                {item.currency_symbol}&nbsp;{item.total_price}
              </span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Discount</span>
              <span>
                {item.currency_symbol}&nbsp;
                {parseFloat(
                  parseFloat(item.total_price) -
                    parseFloat(item.user_sent_amount)
                ).toFixed(2)}
              </span>
            </div>

            <div
              className="border-top-2 border-dashed mt-3 pt-2 border-dynamic-white  d-flex justify-content-between"
            >
              <span>Grand Total</span>
              <span>
                {item.currency_symbol}&nbsp;{item.user_sent_amount}
              </span>
            </div>
          </div>

          {/* <Table responsive className="bg-white text-dynamic-white">
            <thead>
              <tr className="text-dynamic-white">
                <th className="text-dynamic-white">Item Name</th>
                <th className="text-dynamic-white">Quantity</th>
                <th className="text-dynamic-white">Price</th>
                <th className="text-dynamic-white">Total</th>
              </tr>
            </thead>
            <tbody>
              {item.items.map((items, index) => (
                <>
                  <tr key={index}>
                    <td className="text-dynamic-white">{items.name}</td>
                    <td className="text-dynamic-white">{items.quantity}</td>
                    <td className="text-dynamic-white">
                      {item.currency_symbol} {items.price}
                    </td>
                    <td className="text-dynamic-white">
                      {" "}
                      {item.currency_symbol} {items.price * items.quantity}
                    </td>
                  </tr>
                  {items.related_food_item.map((rf, index) => (
                    <tr key={index}>
                      <td className="text-dynamic-white">{rf.name}</td>
                      <td className="text-dynamic-white">{items.quantity}</td>
                      <td className="text-dynamic-white">
                        {item.currency_symbol} {rf.price}
                      </td>
                      <td className="text-dynamic-white">
                        {" "}
                        {item.currency_symbol} {rf.price * items.quantity}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-dynamic-white">
                  Total
                </td>
                <td className="text-dynamic-white">
                  {item.currency_symbol} {item.total_price}
                </td>
              </tr>
            </tfoot>
          </Table> */}
        </Col>
        <Col className="col-12 col-lg-8 col-xl-6 ">
          <Card className="p-2 ">
            <h5 as="h5">Order Details</h5>
            <Card.Body className="text-dynamic-white text-start">
              <Row className="mb-3">
                <Col>
                  <strong>Order ID:</strong> {item.order_id}
                </Col>
                <Col>
                  <strong>Ordered Date:</strong> {item.ordered_date}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <strong>Customer Name:</strong> {item.full_name}
                </Col>
                <Col>
                  <strong>Address:</strong> {item.address}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <strong>Email:</strong> {item.email}
                </Col>
                <Col>
                  <strong>Phone No:</strong> {item.phone_no}
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <strong>Order Type:</strong>
                  <Badge
                    className={`ml-2 ${
                      item.order_type === "dine-here"
                        ? "bg-success"
                        : "bg-warning"
                    }`}
                  >
                    {item.order_type}
                  </Badge>
                </Col>
                <Col>
                  <strong>Order Status:</strong>
                  <Badge
                    className={`ml-2 ${
                      orderStatus === "Pending"
                        ? "bg-warning"
                        : orderStatus === "Confirmed"
                        ? "bg-primary"
                        : orderStatus === "Delivered"
                        ? "bg-success"
                        : orderStatus === "Ready"
                        ? "bg-info"
                        : orderStatus === "Delivered to boy"
                        ? "bg-secondary"
                        : "bg-danger"
                    }`}
                  >
                    {orderStatus}
                  </Badge>
                  {actualorderStatus !== "Delivered" ? (
                    actualorderStatus !== "Cancalled" && (
                      <Button variant="link" onClick={() => setShowModal(true)}>
                        <i class="bi bi-pencil-square"></i>
                      </Button>
                    )
                  ) : (
                    <></>
                  )}
                </Col>
              </Row>

              <Row className="mt-3">
                <Col></Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal
        aria-labelledby="contained-modal-title-vcenter"
        size="md"
        centered
        show={showModal}
        onHide={() => setShowModal(false)}
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter text-center">
            <h4 className="text-dynamic-white">Update Order Status</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formOrderStatus">
              <Form.Label>Order Status</Form.Label>
              <Form.Control
                as="select"
                name="orderstatus"
                value={orderStatus}
                defaultValue={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                required
              >
                {actualorderStatus === "Pending" && (
                  <>
                    <option value="Pending">Pending</option>
                    <option value="Cancalled">Cancelled</option>
                    <option value="Confirmed">Confirmed</option>
                  </>
                )}

                {actualorderStatus === "Confirmed" && (
                  <>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Ready">Ready</option>
                  </>
                )}
                {actualorderStatus === "Ready" && (
                  <>
                    <option value="Ready">Ready</option>
                    <option value="Delivered to boy">Delivered to boy</option>
                    <option value="Delivered">Delivered</option>
                  </>
                )}

                {actualorderStatus === "Delivered to boy" && (
                  <>
                    <option value="Delivered to boy">Delivered to boy</option>
                    <option value="Delivered">Delivered</option>
                  </>
                )}

                {/* <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cooked">Cooked</option>
                <option value="Delivered">Delivered</option> */}
                {/* <option value="Cancalled">Cancelled</option> */}
              </Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setShowModal(false);
                }}
                className="mt-4"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" className="mt-4">
                {statusLoading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                Confirm
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OrderDetailsContent;
