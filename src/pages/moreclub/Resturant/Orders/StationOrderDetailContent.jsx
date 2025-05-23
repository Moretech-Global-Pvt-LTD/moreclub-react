import React, { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { message } from "antd";
import moment from "moment";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";
import StationOrderFoodCard from "../../../../components/Moreclub/Resturant/Orders/StationOrderFoodCard";

const StationOrderDetailContent = ({ item }) => {
  const { ord_id, id } = useParams();

  const [orderStatus, setOrderStatus] = useState(item.order_status);
  const [actualorderStatus, setActualOrderStatus] = useState(item.order_status);
  const [showModal, setShowModal] = useState(false);
  const [rejectloading, setRejectLoading] = useState(false);
  const [rejectedItems, setRejectedItems] = useState(
    item.order_items.reduce((acc, currentItem) => {
      acc[currentItem.id] = currentItem.food_rejected;
      return acc;
    }, {})
  );
  const [statusLoading, setStatusLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setStatusLoading(true);
      const res = await morefoodAuthenticatedAxios.patch(
        `moreclub/station/restro/${id}/orders/${ord_id}/status/update/`,
        {
          order_status: orderStatus,
        }
      );
      message.success("status updated successfully");
      setOrderStatus(res.data.data.order_status);
      setActualOrderStatus(res.data.data.order_status);
      setShowModal(false);
    } catch (err) {
      message.error("error updating status");
      setOrderStatus(item.order_status);
      setActualOrderStatus(item.order_status);
    } finally {
      setStatusLoading(false);
      setShowModal(false);
    }
  }

  async function handleReject(items) {
    setRejectLoading(true);
    try {
      const res = await morefoodAuthenticatedAxios.patch(
        `moreclub/station/restro/${id}/orders/${items.id}/rejected/`,
        {
          food_rejected: true,
        }
      );
      message.success(`${items.food_item.name} rejected successfully`);
      setRejectedItems((prev) => ({ ...prev, [items.id]: true }));
      setOrderStatus(res.data.data.station_order_status);
    } catch (err) {
      message.error(`Error rejecting ${items.food_item.name}`);
    } finally {
      setRejectLoading(false);
    }
  }

  async function handleCloseModel(e) {
    e.preventDefault();
    setShowModal(false);
  }

  const nonEditableStatuses = [
    "Delivered",
    "Rejected",
    "Delivered to boy",
    "Confirm on hold",
  ];

  const calculatedTotal = item.order_items.reduce((acc, currentItem) => {
    acc +=
      parseFloat(currentItem.food_item.retailer_price) * currentItem.quantity;
    return acc;
  }, 0);

  return (
    <div className="pe-4">
      <Row className="mt-4  flex-xl-row ">
      <Col className="col-12 col-lg-8 col-xl-6 my-xl-0 my-4">
          <h5>Items Ordered</h5>
          {item.order_items.map((items, index) => (
            <StationOrderFoodCard
              key={index}
              item={items}
              rejectedItems={rejectedItems}
              handleReject={handleReject}
              orderStatus={orderStatus}
              rejectloading={rejectloading}
            />
          ))}

          {orderStatus !== "Rejected" && (
            <div className="border-top-2 border-dashed mt-3 pt-2 border-dynamic-white text-dynamic-white fs-6 fw-semibold">
              <div className="d-flex justify-content-between">
                <span>Total</span>
                <span>
                  {item.order_items[0].food_item.currency_symbol}{" "}
                  {calculatedTotal}
                </span>
              </div>
              {/* <div className="d-flex justify-content-between">
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
            </div> */}
            </div>
          )}
        
        </Col>
        <Card className="col-12 col-lg-8 col-xl-6 p-2">
          <h5 as="h5">Order Details</h5>
          <Card.Body className="text-dynamic-white text-start">
            <Row className="mb-3">
              <Col>
                <strong>Order ID:</strong> {item.order.order_id}
              </Col>
              <Col>
                <strong>Ordered Date:</strong>{" "}
                {moment
                  .utc(item.order.ordered_date)
                  .local()
                  .format("MMM DD YYYY")}{" "}
                {moment.utc(item.order.ordered_date).local().format("h:mm a")}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Customer Name:</strong> {item.order.full_name}
              </Col>

              <Col>
                <strong>Customer Address:</strong> {item.order.address}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Station Name:</strong> {item.station.station}
              </Col>

              <Col>
                <strong>Station Address:</strong> {item.station.address}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <strong>Email:</strong> {item.order.email}
              </Col>
              <Col>
                <strong>Phone No:</strong> {item.order.phone_no}
              </Col>
            </Row>

            <Row className="mb-3">
              <Col>
                <strong>Order Type:</strong>
                <Badge
                  className={`ml-2 ${
                    item.order.order_type === "dine-here"
                      ? "bg-success"
                      : "bg-warning"
                  }`}
                >
                  {item.order.order_type}
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
                      : orderStatus === "Ready"
                      ? "bg-success"
                      : orderStatus === "Delivered to boy"
                      ? "bg-secondary"
                      : orderStatus === "Delivered to boy"
                      ? "bg-success"
                      : orderStatus === "Confirm on hold"
                      ? ""
                      : "bg-danger"
                  }`}
                >
                  {orderStatus === "Confirm on hold"
                    ? "Waiting for Station Confirmation"
                    : orderStatus}
                </Badge>
                {!nonEditableStatuses.includes(orderStatus) && (
                  <Button variant="link" onClick={() => setShowModal(true)}>
                    <i class="bi bi-pencil-square"></i>
                  </Button>
                )}
                {/* {orderStatus !== "Rejected" ?
                               
                                     orderStatus !== "Delivered to boy" &&
                                    <Button variant="link" onClick={() => setShowModal(true)}>
                                    <i class="bi bi-pencil-square"></i> 
                                    </Button> :
                                    <></>
                                } */}
              </Col>
            </Row>

            <Row className="mt-3">
              <Col></Col>
            </Row>
          </Card.Body>
        </Card>

        
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
              <Form.Label className="text-dynamic-white">
                Order Status
              </Form.Label>
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
                    <option value="Rejected">Rejected</option>
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
                  </>
                )}
                {actualorderStatus === "Delivered to boy" && (
                  <>
                    <option value="Delivered to boy">Delivered to boy</option>
                  </>
                )}
              </Form.Control>
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button
                onClick={handleCloseModel}
                className="mt-4"
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={statusLoading || orderStatus === actualorderStatus}
                className="mt-4"
              >
                {statusLoading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}{" "}
                Confirm
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default StationOrderDetailContent;
