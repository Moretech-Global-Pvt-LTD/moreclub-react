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
import StationOrderCards from "../../../../components/Moreclub/Resturant/station/StationOrderCards";
import { message } from "antd";
import moment from "moment";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";

const StationOrderDetailsContent = ({ item }) => {
    const { ord_id, id, name } = useParams();

    const [orderStatus, setOrderStatus] = useState(item.order_status);
    const [actualorderStatus, setActualOrderStatus] = useState(item.order_status);
    const [statusloading, setStatusLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setStatusLoading(true);
            const res = await morefoodAuthenticatedAxios.patch(
                `moreclub/station/${id}/orders/${ord_id}/status/update/`,
                {
                    order_status: orderStatus,
                }
            );
            message.success('status updated successfully');
            setOrderStatus(res.data.data.order_status);
            setActualOrderStatus(res.data.data.order_status);

            setShowModal(false);
        } catch (err) {
            console.log(err);
            message.error('error updating status');
            setOrderStatus(item.order_status);
            setActualOrderStatus(item.order_status);
            setShowModal(false);
        }
        setStatusLoading(false);
    }

    const nonEditableStatuses = ["Delivered", "Pending", "Cooked","Confirmed","Cancalled"];

    return (
        <div className="pe-4">
            <Row className="mt-4  flex-xl-row ">
            <Col className="col-12 col-lg-8 col-xl-6 my-xl-0 my-4">
                    <h5>Items Ordered</h5>

                    <div className="station-order-card-container">
                        {Object.entries(item.order_items).map(([restaurant, items]) =>
                            <div>


                                <div className="station-order-card-header mb-2">
                                    <div className="station-order-card-restaurant">{restaurant} &nbsp; &nbsp;<Badge
                                        size="lg"
                                        className={`ml-2 ${items?.restaurant_status === "Pending"
                                            ? "bg-warning"
                                            : items?.restaurant_status === "Confirmed"
                                                ? "bg-primary"
                                                : items?.restaurant_status === "Ready"
                                                    ? "bg-success"
                                                    : items?.restaurant_status === "Delivered to boy" ? "bg-success" :
                                                        items?.restaurant_status === "Delivered to boy" ? "bg-success" :
                                                            "bg-danger"
                                            }`}
                                    >
                                        {items?.restaurant_status}
                                    </Badge>
                                    </div>
                                    <span className={`station-order-card-received-status ${items?.restaurant_payment ? "received" : "not-received"}`}>Payment: {items?.restaurant_payment ? "Received" : "Pending"}</span>
                                </div>

                                {items.food_item.map((orders) => (
                                    <StationOrderCards item={orders} resturant_status={items.restaurant_status} restaurant={restaurant} stationId={item.station} orderStatus={orderStatus} setOrderStatus={setOrderStatus} />
                                ))}
                            </div>

                        )}
                    </div>
                </Col>
                <Card className="col-12 col-lg-8 col-xl-6 p-2">
                    <h5 as="h5">Order Details</h5>
                    <Card.Body className="text-dynamic-white text-start">
                        <Row className="mb-3">
                            <Col>
                                <strong>Order ID:</strong> {item.order_id}
                            </Col>
                            <Col>
                                <strong>Ordered Date:</strong> {moment.utc(item.arrival_time).local().format('MMM DD YYYY')}  {moment.utc(item.arrival_time).local().format("h:mm a")}
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
                                <strong>Order Type: </strong>
                                <Badge
                                    className={`ml-2 ${item.order_type === "dine-here"
                                        ? "bg-success"
                                        : "bg-warning"
                                        }`}
                                >
                                    {item.order_type}
                                </Badge>
                            </Col>
                            <Col>
                                <strong>Order Status: </strong>
                                <Badge
                                    className={`ml-2 ${orderStatus === "Pending"
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
                                {!nonEditableStatuses.includes(orderStatus) && (

                                    <Button variant="link" onClick={() => setShowModal(true)}>
                                        <i class="bi bi-pencil-square"></i>
                                    </Button>
                                )}
                            </Col>

                        </Row>


                    </Card.Body>
                </Card>

                

            </Row>
            <Row>

            </Row>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                size="md"
                centered
                show={showModal}
                onHide={() => setShowModal(false)}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter text-center text-dynamic-white">
                        <h4 className="fw-bold text-dynamic-white text-center">Update Order Status</h4>
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
                                {actualorderStatus === "Pending" &&
                                    <>
                                        <option value="Pending">Pending</option>
                                        <option value="Cancalled">Cancelled</option>
                                        <option value="Confirmed">Confirmed</option>
                                    </>
                                }

                                {actualorderStatus === "Confirmed" &&
                                    <>
                                        <option value="Confirmed">Confirmed</option>
                                        <option value="Cooked">Cooked</option>
                                        <option value="Ready">Ready</option>

                                    </>
                                }
                                {actualorderStatus === "Ready" &&
                                    <>
                                        <option value="Ready">Ready</option>
                                        {/* <option value="Delivered to boy">Delivered to boy</option> */}
                                        <option value="Delivered">Delivered</option>
                                    </>
                                }
                                {actualorderStatus === "Delivered" &&
                                    <>
                                        <option value="Delivered">Delivered</option>
                                    </>
                                }
                            </Form.Control>
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button
                                onClick={() => {
                                    setShowModal(false);
                                }}
                                className="mt-4"
                                variant="secondary"
                            >
                                Cancel
                            </Button>
                            <Button type="submit" className="mt-4">
                                {statusloading && <span className="spinner-border spinner-border-sm"></span>} Confirm
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default StationOrderDetailsContent;
