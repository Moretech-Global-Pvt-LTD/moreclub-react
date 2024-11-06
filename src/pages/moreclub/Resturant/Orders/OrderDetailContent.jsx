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
import { axiosInstance } from "../../../..";
import { morefoodURL } from "../../../../config/config";
import { message } from "antd";

const OrderDetailsContent = ({item}) => {
  const { ord_id, res_id, slug } = useParams();
  
  const [orderStatus, setOrderStatus] = useState(item.order_status);
  const [showModal, setShowModal] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axiosInstance.patch(
        `${morefoodURL}moreclub/user/orders/${ord_id}/${res_id}/`,
        {
          order_status: orderStatus,
        }
      );

      message.success('status updated successfully');
      setOrderStatus(res.data?.data?.order_status);
      setShowModal(false);
    } catch (err) {
      message.error('error updating status');
      setOrderStatus(item.order_status);
      console.log(err);
    }
  }

  const totalAmount = item.items.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  return (
    <div className="pe-4">
      <Row className="mt-4  flex-xl-row-reverse ">
        <Card className="col-12 col-lg-8 col-xl-6 p-2">
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
                      : orderStatus === "Cooked"
                      ? "bg-primary"
                      : orderStatus === "Delivered"
                      ? "bg-success"
                      : "bg-danger"
                  }`}
                >
                  {orderStatus}
                </Badge>
                <Button variant="link" onClick={() => setShowModal(true)}>
                  <i class="bi bi-pencil-square"></i>
                </Button>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col></Col>
            </Row>
          </Card.Body>
        </Card>

        <Col className="col-12 col-lg-8 col-xl-6 my-xl-0 my-4">
          <h5>Items Ordered</h5>
          <Table responsive className="bg-white text-dynamic-white">
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
                <tr key={index}>
                  <td className="text-dynamic-white">{items.food_item.name}</td>
                  <td className="text-dynamic-white">{items.quantity}</td>
                  <td className="text-dynamic-white">{items.price}</td>
                  <td className="text-dynamic-white">
                    {" "}
                    ${items.price * items.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={3} className="text-dynamic-white">
                  Total
                </td>
                <td className="text-dynamic-white">{totalAmount}</td>
              </tr>
            </tfoot>
          </Table>
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
            Update Order Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formOrderStatus">
              <Form.Label className="text-black">Order Status</Form.Label>
              <Form.Control
                as="select"
                name="orderstatus"
                value={orderStatus}
                defaultValue={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cooked">Cooked</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancalled">Cancelled</option>
              </Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button
                onClick={(e) => {
                  e.preventDefault() && setShowModal(false);
                }}
                className="mt-4"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button type="submit" className="mt-4">
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
