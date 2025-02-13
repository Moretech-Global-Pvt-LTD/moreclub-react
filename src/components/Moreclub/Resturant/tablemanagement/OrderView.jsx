import React from "react";
import OrderFoodCard from "./OrderCard";
import OfferFoodCard from "./OfferOrderCard";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { updateTableWS } from "../../../../redux/slices/tableSlice";
import { useQuery } from "@tanstack/react-query";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";
import { Placeholder } from "react-bootstrap";
import UniversalErrorbox from "../../../Layout/UniversalErrorBox";

const OrderView = ({table , res_id}) => {
  const dispatch = useDispatch();
  const slug = res_id

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["order detail for table", table.id],
  //   queryFn: async () => {
  //     const response = await morefoodAuthenticatedAxios.get(
  //       `moreclub/restaurant/${slug}/${table.id}/get/table/orders/`
  //     );
  //     const data = await response.data.data;
  //     return data;
  //   },
  //   staleTime: 60000,
  // });


  // if (isLoading) {
  //   return (
     
  //     <div className="d-flex  g-2">
  //       <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
  //         <Placeholder xs={12} style={{ height: "10rem" }} />
  //       </Placeholder>
  //       <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
  //         <Placeholder xs={12} style={{ height: "10rem" }} />
  //       </Placeholder>
  //       <Placeholder as="p" animation="glow" className="rounded  w-25">
  //         <Placeholder xs={12} style={{ height: "10rem" }} />
  //       </Placeholder>
  //     </div>
 
  //   );
  // }

  // if (isError) {
  //   return <UniversalErrorbox message="Something went wrong while fetching the order list" 
  //   retry={["order detail for table", table.id]}
  //   />
  // }

 
  const orderDetails = [
    {
        "id": "3ab1935e-e84c-4742-b1bb-03d95b50d8ce",
        "order_id": "MRMKK",
        "restaurant": "4311fad6-81b6-428a-a781-33522f4e73b0",
        "order_type": "dine-here",
        "ordered_date": "2025-02-09T07:03:09",
        "currency_code": "NPR",
        "total_price": "400.00",
        "table_no": "110",
        "is_paid": false,
        "order_items": {
            "variation": [
                {
                    "id": "3b548278-a78a-4971-9131-d9d5e7830efe",
                    "name": "Margarita Pizza",
                    "currency_symbol": "Rs",
                    "variation_type": "8f638fd2-1f56-4d18-91d0-18056a9d72f7",
                    "value": "Regular",
                    "price": "400.00",
                    "discount_price": null,
                    "food_item": "33cf08f5-c4f9-47d2-800a-9a44a6a1e91b",
                    "image": "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/food_item/burger_klpogj",
                    "variation_type_name": "size"
                },
                {
                    "id": "3b548278-a78a-4971-9131-d9d5e7830efe",
                    "name": "Margarita Pizza",
                    "currency_symbol": "Rs",
                    "variation_type": "8f638fd2-1f56-4d18-91d0-18056a9d72f7",
                    "value": "Regular",
                    "price": "400.00",
                    "discount_price": null,
                    "food_item": "33cf08f5-c4f9-47d2-800a-9a44a6a1e91b",
                    "image": "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/food_item/burger_klpogj",
                    "variation_type_name": "size"
                },
                {
                    "id": "a333ed5b-04a0-44ea-8ee0-0b8eae5c7144",
                    "name": "Margarita Pizza",
                    "currency_symbol": "Rs",
                    "variation_type": "8f638fd2-1f56-4d18-91d0-18056a9d72f7",
                    "value": "Large",
                    "price": "500.00",
                    "discount_price": "490.00",
                    "food_item": "33cf08f5-c4f9-47d2-800a-9a44a6a1e91b",
                    "image": "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/food_item/burger_klpogj",
                    "variation_type_name": "size"
                }
            ],
            "descriptions": [
                "Margarita Pizza only",
                "Margarita Pizza only",
                "Margarita Pizza only"
            ]
        }
    },
    {
        "id": "fccccd2f-a8dc-4a50-bf8e-74513987d316",
        "order_id": "LHN27",
        "restaurant": "4311fad6-81b6-428a-a781-33522f4e73b0",
        "order_type": "dine-here",
        "ordered_date": "2025-02-09T07:03:54",
        "currency_code": "NPR",
        "total_price": "400.00",
        "table_no": "110",
        "is_paid": false,
        "order_items": {
            "variation": [
                {
                    "id": "3b548278-a78a-4971-9131-d9d5e7830efe",
                    "name": "Margarita Pizza",
                    "currency_symbol": "Rs",
                    "variation_type": "8f638fd2-1f56-4d18-91d0-18056a9d72f7",
                    "value": "Regular",
                    "price": "400.00",
                    "discount_price": null,
                    "food_item": "33cf08f5-c4f9-47d2-800a-9a44a6a1e91b",
                    "image": "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/food_item/burger_klpogj",
                    "variation_type_name": "size"
                },
                {
                    "id": "3b548278-a78a-4971-9131-d9d5e7830efe",
                    "name": "Margarita Pizza",
                    "currency_symbol": "Rs",
                    "variation_type": "8f638fd2-1f56-4d18-91d0-18056a9d72f7",
                    "value": "Regular",
                    "price": "400.00",
                    "discount_price": null,
                    "food_item": "33cf08f5-c4f9-47d2-800a-9a44a6a1e91b",
                    "image": "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/food_item/burger_klpogj",
                    "variation_type_name": "size"
                },
                {
                    "id": "a333ed5b-04a0-44ea-8ee0-0b8eae5c7144",
                    "name": "Margarita Pizza",
                    "currency_symbol": "Rs",
                    "variation_type": "8f638fd2-1f56-4d18-91d0-18056a9d72f7",
                    "value": "Large",
                    "price": "500.00",
                    "discount_price": "490.00",
                    "food_item": "33cf08f5-c4f9-47d2-800a-9a44a6a1e91b",
                    "image": "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/food_item/burger_klpogj",
                    "variation_type_name": "size"
                }
            ],
            "descriptions": [
                "Margarita Pizza only",
                "Margarita Pizza only",
                "Margarita Pizza only"
            ]
        }
    },
    {
        "id": "013f27a5-71c2-4561-b64e-de1465c7a1eb",
        "order_id": "SXTJB",
        "restaurant": "4311fad6-81b6-428a-a781-33522f4e73b0",
        "order_type": "dine-here",
        "ordered_date": "2025-02-09T07:04:53",
        "currency_code": "NPR",
        "total_price": "490.00",
        "table_no": "110",
        "is_paid": false,
        "order_items": {
            "variation": [
                {
                    "id": "3b548278-a78a-4971-9131-d9d5e7830efe",
                    "name": "Margarita Pizza",
                    "currency_symbol": "Rs",
                    "variation_type": "8f638fd2-1f56-4d18-91d0-18056a9d72f7",
                    "value": "Regular",
                    "price": "400.00",
                    "discount_price": null,
                    "food_item": "33cf08f5-c4f9-47d2-800a-9a44a6a1e91b",
                    "image": "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/food_item/burger_klpogj",
                    "variation_type_name": "size"
                },
                {
                    "id": "3b548278-a78a-4971-9131-d9d5e7830efe",
                    "name": "Margarita Pizza",
                    "currency_symbol": "Rs",
                    "variation_type": "8f638fd2-1f56-4d18-91d0-18056a9d72f7",
                    "value": "Regular",
                    "price": "400.00",
                    "discount_price": null,
                    "food_item": "33cf08f5-c4f9-47d2-800a-9a44a6a1e91b",
                    "image": "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/food_item/burger_klpogj",
                    "variation_type_name": "size"
                },
                {
                    "id": "a333ed5b-04a0-44ea-8ee0-0b8eae5c7144",
                    "name": "Margarita Pizza",
                    "currency_symbol": "Rs",
                    "variation_type": "8f638fd2-1f56-4d18-91d0-18056a9d72f7",
                    "value": "Large",
                    "price": "500.00",
                    "discount_price": "490.00",
                    "food_item": "33cf08f5-c4f9-47d2-800a-9a44a6a1e91b",
                    "image": "https://res.cloudinary.com/duehpgb6o/image/upload/v1/media/food_item/burger_klpogj",
                    "variation_type_name": "size"
                }
            ],
            "descriptions": [
                "Margarita Pizza only",
                "Margarita Pizza only",
                "Margarita Pizza only"
            ]
        }
    }
]

  const handlePayout = async() => {
    console.log("Payout");

    await dispatch(
            updateTableWS({
              table: {
                id: parseInt(table.id),
                billed_called: false,
                called: false,
                waiter_called: false,
                ordered: false,
                new_ordered: false,
                messages:"",
              },
            })
          );
  };


  return (
    <>
      {orderDetails.map((order) => (
         <>
         {order.order_items.variation.map((orders, index) => (
           <OrderFoodCard
             key={orders.id}
             item={orders}
             index={index}
             descriptions={order.order_items.descriptions[index]}
             currency={orderDetails.currency_symbol}
           />
         ))}
         {/* {order.offer.map((orders) => (
           <OfferFoodCard
             item={orders}
             currency={orderDetails.currency_symbol}
           />
         ))} */}
 
         
       </>
      ))}
      <div className="border-top-2 border-dashed mt-3 pt-2 border-dynamic-white text-dynamic-white fs-6 fw-semibold">
           <div className="d-flex justify-content-between">
             <span>Total</span>
             <span>
               {/* {orderDetails.currency_symbol}&nbsp;{orderDetails.total_price} */}
             </span>
           </div> 
         </div>
         <Button variant="warning" className="w-100" onClick={handlePayout}>
           <span className="fs-6 fw-semibold">PaidOut</span>
         </Button>
      {/* {orderDetails.length > 0 ? (
        
      )}}
      <>
        {orderDetails.items.map((orders) => (
          <OrderFoodCard
            item={orders}
            currency={orderDetails.currency_symbol}
          />
        ))}
        {orderDetails.offer.map((orders) => (
          <OfferFoodCard
            item={orders}
            currency={orderDetails.currency_symbol}
          />
        ))}

        <div className="border-top-2 border-dashed mt-3 pt-2 border-dynamic-white text-dynamic-white fs-6 fw-semibold">
          <div className="d-flex justify-content-between">
            <span>Total</span>
            <span>
              {orderDetails.currency_symbol}&nbsp;{orderDetails.total_price}
            </span>
          </div> 
        </div>
        <Button variant="warning" className="w-100" onClick={handlePayout}>
          <span className="fs-6 fw-semibold">PaidOut</span>
        </Button>
      </>
      {/* ) : (
          <p>No orders available for this table.</p>
        )} */}
    </>
  );
};

export default OrderView;
