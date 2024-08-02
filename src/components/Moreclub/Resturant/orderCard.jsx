import React, { useState } from 'react'
import { Badge, Button, Form } from 'react-bootstrap';
import { axiosInstance } from '../../..';
import { morefoodURL } from '../../../config/config';
import { useParams } from 'react-router-dom';

const OrderCard = ({ item }) => {
    const {res_id}= useParams()
    const [orderStatus, setOrderStatus] = useState(item.order_status);

    

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const res = await axiosInstance.patch(
                `${morefoodURL}moreclub/user/orders/${item.id}/${res_id}/`,{
                  order_status:orderStatus
              }
            );
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }


   
  return (
    <div className="card p-4 my-4">
      <span className="my-2 ">
        <Badge className="fs-6 rounded-pill bg-warning text-black">
          {item.order_type}
        </Badge>
      </span>
      <p>
        <span className="fw-bold fs-5">Order Id:&nbsp;</span>
        {item.order_id}
      </p>
      <h5>Name :&nbsp;{item.full_name}</h5>

      <h6>Orders</h6>
      <div className="d-flex flex-wrap gap-2">
        {item.order_items &&
          item.order_items.map((foo) => (
            <Badge className="fs-5 rounded-pill">{foo.food_item.name}</Badge>
          ))}
      </div>
      <p>Note: {item.note}</p>
      <ul>
        {item.order_items.map((ord) => (
          <li>{ord.food_item.name}</li>
        ))}
        <li>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formmin_order ">
              <Form.Label>Country</Form.Label>
              <Form.Control
                as="select"
                name="orderstatus"
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                required
              >
                <option value={""}>{"Select Country"}</option>
                <option value={"Pending"}>Pending</option>
                <option value={"Cooked"}>Cooked</option>
                <option value={"Delivered'"}>Delivered</option>
                <option value={"Cancalled'"}>Cancelled</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit" className="mt-4">
              Confirm
            </Button>
          </Form>
        </li>
      </ul>
    </div>
  );
}

export default OrderCard