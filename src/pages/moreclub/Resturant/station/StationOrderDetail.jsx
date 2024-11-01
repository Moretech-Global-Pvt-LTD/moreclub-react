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
import StationOrderCards from "../../../../components/Moreclub/Resturant/station/StationOrderCards";

const StationOrderDetailsContent = ({ item }) => {
    const { ord_id, id, name } = useParams();

    const [orderStatus, setOrderStatus] = useState(item.order_status);
    const [showModal, setShowModal] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axiosInstance.patch(
                `${morefoodURL}moreclub/user/station/${id}/orders/${ord_id}`,
                {
                    order_status: orderStatus,
                }
            );
        } catch (err) {
            console.log(err);
        }
    }



    // const totalAmount = item.order_items.reduce(
    //     (total, item) => total + item.quantity * item.price,
    //     0
    // );
    const orderItems = {
        "Into The Wild": [
            {
                id: "1f453065-e725-4cfc-9210-6c2679675384",
                food_item: {
                    id: "6767dac5-0be0-4676-bf69-bc650db9178b",
                    name: "Sandwich box",
                    image: "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/food_item/diwine_p9icep",
                    short_description: "sandwich adjha dajkd ca ckja",
                },
                quantity: 2,
                price: 200,
                is_received_from_restaurant: false,
                received_item_quantity_restaurant: 0,
                received_item_from_restaurant_date: null,
                is_paid_to_restaurant: false,
            },
        ],
        "Mountain Feast": [
            {
                id: "2a2e6f5c-6b7f-4563-92bf-9a4974c0b5d2",
                food_item: {
                    id: "0bd27f0c-7b6f-4d1f-87d1-8f123e1de56e",
                    name: "Pizza box",
                    image: "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/food_item/another_item_image",
                    short_description: "Delicious cheese pizza with toppings",
                },
                quantity: 1,
                price: 150,
                is_received_from_restaurant: true,
                received_item_quantity_restaurant: 1,
                received_item_from_restaurant_date: "2024-10-20",
                is_paid_to_restaurant: true,
            },
        ],
    };


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
                                    className={`ml-2 ${item.order_status === "Pending"
                                        ? "bg-warning"
                                        : item.order_status === "Cooked"
                                            ? "bg-primary"
                                            : item.order_status === "Delivered"
                                                ? "bg-success"
                                                : "bg-danger"
                                        }`}
                                >
                                    {item.order_status}
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
                    
                    <div className="station-order-card-container">
                        {Object.entries(item.order_items).map(([restaurant, items]) =>
                            items.map((orders) => (
                                <StationOrderCards item={orders} restaurant={restaurant} stationId={item.station} />
                            ))
                        )}
                    </div>
                </Col>

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
                                onClick={() => {
                                    setShowModal(false);
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

export default StationOrderDetailsContent;
