import React from "react";
import OrderFoodCard from "./OrderCard";
import OfferFoodCard from "./OfferOrderCard";
import { Button, message } from "antd";
import { useDispatch } from "react-redux";
import { updateTableWS } from "../../../../redux/slices/tableSlice";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";
import { Placeholder } from "react-bootstrap";
import UniversalErrorbox from "../../../Layout/UniversalErrorBox";

const OrderView = ({ table, res_id }) => {
  const dispatch = useDispatch();
  const slug = res_id;
  const query = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["order detail for table", table.id],
    queryFn: async () => {
      const response = await morefoodAuthenticatedAxios.get(
        `moreclub/restaurant/${slug}/${table.id}/get/table/orders/`
      );
      const data = await response.data.data;
      return data;
    },
    staleTime: 6000,
  });

  if (isLoading) {
    return (
      <div className="d-flex  g-2">
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ height: "10rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
          <Placeholder xs={12} style={{ height: "10rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded  w-25">
          <Placeholder xs={12} style={{ height: "10rem" }} />
        </Placeholder>
      </div>
    );
  }

  if (isError) {
    return (
      <UniversalErrorbox
        message="Something went wrong while fetching the order list"
        retry={["order detail for table", table.id]}
      />
    );
  }

  const handlePayout = async () => {
    try {
      const res = await morefoodAuthenticatedAxios.post(
        `moreclub/restaurant/${slug}/${table.id}/update/`
      );

      if (res.data.success) {
        await dispatch(
          updateTableWS({
            table: {
              id: parseInt(table.id),
              billed_called: false,
              called: false,
              waiter_called: false,
              ordered: false,
              new_ordered: false,
              messages: "",
            },
          })
        );
        query.invalidateQueries({
          queryKey: ["order detail for table", table.id],
        });
      }
    } catch (err) {
      message.error("Error in Payout");
      console.log(err);
    }
  };

  return (
    <>
      {data.length === 0 && (
        <p className="text-center text-dynamic-white">
          No orders available for this table.
        </p>
      )}

      {data.map((order) => (
        <>
          {order.order_items.variation.map((orders, index) => (
            <OrderFoodCard
              key={orders.id}
              item={orders}
              index={index}
              descriptions={order.order_items.descriptions[index]}
              currency={order.currency_symbol}
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
      {data.length > 0 && (
        <>
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
        </>
      )}
    </>
  );
};

export default OrderView;
