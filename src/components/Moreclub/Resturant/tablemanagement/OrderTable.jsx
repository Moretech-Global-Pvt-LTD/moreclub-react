import React, { useState } from "react";
import { Drawer } from "antd";
import { Badge, Button } from "react-bootstrap";

import OrderView from "./OrderView";
import { useParams } from "react-router-dom";

const OrderTable = ({ table, handleStatusChange }) => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const { res_id } = useParams();

  const [placement, setPlacement] = useState("bottom");
  const showDrawer = (placement) => {
    setDrawerVisible(true);
    setPlacement(placement);
  };

  const closeDrawer = () => setDrawerVisible(false);

  const occupied = table.new_orderd
    ? table.new_orderd
    : table.billed_called ||
      table.called ||
      table.waiter_called ||
      table.ordered;
  return (
    <div
      className={`pure-g table-order-view pure-u-1 pure-u-md-1-3 pure-u-lg-1-4 ${
        occupied && "bg-danger"
      } `}
    >
      <div className=" rounded ">
        <div className="pure-u-1 relative padding-small">
          {/* Table Status Indicators */}
          {table.billed_called || table.called || table.waiter_called ? (
            <div className="table-pulse-dot absolute top-right"></div>
          ) : null}

          {/* Table Info */}
          <h3 className="font-bold text-black">{table.name}</h3>
          <p className="pure-text text-black">Chairs: {table.capacity}</p>

          {/* Status Badges */}
          <div className="pure-g margin-small">
            {table.billed_called && (
              <Badge className="bg-secondary pure-badge">
                {"Want to Checkout"}
              </Badge>
            )}
            {table.called && (
              <Badge className="bg-warning text-black pure-badge">
                {"Calling"}
              </Badge>
            )}
            {table.waiter_called && (
              <Badge className="bg-success pure-badge">
                {"Calling Waiter"}
              </Badge>
            )}
            {table.new_orderd && (
              <Badge className="bg-success pure-badge">{"new_order"}</Badge>
            )}
          </div>

          {/* {table.ordered && ( */}
          <div className="d-flex justify-content-center ">
            <div className="d-block d-md-none">
              <Button
                type="primary"
                className="pure-button pure-button-primary"
                onClick={() => showDrawer("bottom")}
              >
                View Orders
              </Button>
            </div>
            <div className="d-none d-md-block">
              <Button
                type="primary"
                className="pure-button pure-button-primary"
                onClick={() => showDrawer("right")}
              >
                View Orders
              </Button>
            </div>
          </div>
          {/* )} */}
        </div>
      </div>

      <Drawer
        title={`Order Details for ${table.name}`}
        placement={placement}
        onClose={closeDrawer}
        visible={isDrawerVisible}
        width={400}
      >
        <OrderView table={table} res_id={res_id} />
      </Drawer>
    </div>
  );
};

export default OrderTable;
