import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { axiosInstance } from '../../../..';
import { morefoodURL } from '../../../../config/config';
import { message } from 'antd';
import moment from 'moment';

const StationOrderCards = ({ item, restaurant, stationId, orderStatus, setOrderStatus }) => {

    const [showResturant, setShowResturant] = useState(false);
    const [received, setReceived] = useState(item.received_item_quantity_restaurant);
    const [isLoading, setIsLoading] = useState(false);
    const [isRecieved, setIsRecieved] = useState(item.is_received_from_restaurant);
    const [isPaid, setIsPaid] = useState(item.is_paid_to_restaurant);

    const hideShowRestaurant = () => {
        setShowResturant(false);
    }
    const viewShowRestaurant = () => {
        if (!item.is_received_from_restaurant) {
            if (orderStatus !== "Cancalled") { 
                setShowResturant(true);
            }
        }
    }



    const handleReceived = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await axiosInstance.patch(`${morefoodURL}moreclub/station/${stationId}/order-item/${item.id}/confirm/`, {
                is_received_from_restaurant: true,
                received_item_quantity_restaurant: received
            });
            message.success("Quantity updated successfully");
            setIsRecieved(res.data.data.is_received_from_restaurant);
            setReceived(res.data.data.received_item_quantity_restaurant);
            setIsPaid(res.data.data.is_paid_to_restaurant);
            setOrderStatus("Cooked");
        } catch (err) {
            console.log(err);
            setReceived(item.received_item_quantity_restaurant);
            message.error("Error updating quantity");
            setShowResturant(false);
        } finally {
            // setReceived(item.received_item_quantity_restaurant);
            setShowResturant(false);
            setIsLoading(false);
        }
    }



    return (
        <>
            <div className="station-order-card" key={item.id}>
                <img
                    src={item.food_item.image}
                    alt={item.food_item.name}
                    className="station-order-card-image"
                />
                <div className="station-order-card-content">
                    <div className="station-order-card-header">
                        <div className="station-order-card-restaurant">{restaurant}</div>
                        <span className={`station-order-card-received-status ${isPaid ? "received" : "not-received"}`}>Payment: {isPaid ? "Received" : "Pending"}</span>
                    </div>
                    <div className="station-order-card-date">{item.received_item_from_restaurant_date ? <>Received on :{moment.utc(item.received_item_from_restaurant_date).local().format('MMM DD YYYY')}  {moment.utc(item.received_item_from_restaurant_date).local().format("h:mm a") }</>:<>Pending</> } </div>
                    <div className="station-order-card-food-name">{item.food_item.name}</div>
                    <div className="station-order-card-footer">
                        <div className="station-order-card-received">
                            <span className={`station-order-card-received-status ${isRecieved ? "received" : "not-received"}`}
                                onClick={viewShowRestaurant}
                            >
                                Restaurant: {received} Received
                            </span>
                            <span className="station-order-card-quantity">{item.quantity}</span>
                        </div>
                        <div className="station-order-card-price">Rs {item.price}</div>
                    </div>
                </div>
            </div>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                size="sm"
                centered
                show={showResturant}
                onHide={hideShowRestaurant}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter text-center" className="text-dynamic-white">
                        Restaurant orders
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column gap-2">

                        <div className="station-order-card-received">
                            <span className={`station-order-card-received-status ${item.is_received_from_restaurant ? "received" : "not-received"}`}>
                                Restaurant: {isRecieved ? "Received" : "Pending"}
                            </span>
                            <span className='text-dynamic-white'>Total Qty:</span><span className="station-order-card-quantity"> {item.quantity}</span>
                        </div>
                        {/* <div className="station-order-card-received">
                            Total Quantity: <span className="station-order-card-quantity">{item.quantity}</span>
                        </div> */}
                        <Form onSubmit={handleReceived}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label className="text-dynamic-white">Quantity Received</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter Quantity"
                                    name="quantity"
                                    value={received}
                                    onChange={(e) => setReceived(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <div className='d-flex justify-content-center'>
                            <Button type="submit" className="btn btn-primary btn-sm">{isLoading && <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>} save</Button>
                            </div>
                        </Form>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default StationOrderCards