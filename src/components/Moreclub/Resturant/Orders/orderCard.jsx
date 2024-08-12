import React from 'react'
import { Badge } from 'react-bootstrap';

import {  useNavigate, useParams } from 'react-router-dom';

const OrderCard = ({ item }) => {
    const {res_id , slug}= useParams()
  
  const navigate = useNavigate()

  

   
  return (
    <>
      <tr
        className="text-dynamic-white clickable-row"
        onClick={() =>
          navigate(`/resturant/${res_id}/orders/${slug}/${item.order_id}`)
        }
      >
        <td className="text-dynamic-white">{item.order_id}</td>
        <td className="text-dynamic-white">{item.ordered_date}</td>
        <td className="text-dynamic-white">
          {item.full_name}&nbsp;&nbsp;
          <Badge
            className={`fs-6 rounded-pill ${
              item.order_type === "dine-here"
                ? "bg-success text-white"
                : item.order_type === "packed"
                ? "bg-warning text-black"
                : "bg-secondary"
            }`}
          >
            {item.order_type}
          </Badge>
        </td>
        <td className="text-dynamic-white">{item.address}</td>
        <td className="text-dynamic-white">
          <Badge
            className={`fs-5 rounded-pill ${
              item.order_status === "Pending"
                ? "bg-warning text-black"
                : item.order_status === "Cooked"
                ? "bg-primary"
                : item.order_status === "Delivered"
                ? "bg-success"
                : item.order_status === "Cancalled"
                ? "bg-danger"
                : "bg-secondary"
            }
                   `}
          >
            {item.order_status}
          </Badge>
        </td>
      </tr>
    </>
  );
}

export default OrderCard