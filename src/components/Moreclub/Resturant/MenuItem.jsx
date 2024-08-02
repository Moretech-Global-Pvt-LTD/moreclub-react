import React, { useState } from "react";

import { Button, Col, Placeholder, Row } from "react-bootstrap";
import MenuItemsForm from "./MenuItemForm";
import MenuCard from "./MenuCard";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../..";
import { morefoodURL } from "../../../config/config";

const MenuItem = () => {
  const {res_id,cat_id, slug}= useParams()
  const [showForm, setShowForm] = useState(false);


    const { data, isLoading, isError } = useQuery({
      queryKey: [`Resturant SubMenu List ${cat_id}`],
      queryFn: async () => {
        const response = await axiosInstance.get(
          `${morefoodURL}moreclub/user/food/items/${cat_id}/${res_id}/`
        );
        const data = await response.data.data;
        return data;
      },
      staleTime: 100,
    });

    if (isLoading) {
      return (
        <div className="">
          <div className="row gap-2">
            <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
              <Placeholder xs={12} style={{ height: "8rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
              <Placeholder xs={12} style={{ height: "8rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded  w-25">
              <Placeholder xs={12} style={{ height: "8rem" }} />
            </Placeholder>
            <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
              <Placeholder xs={12} style={{ height: "8rem" }} />
            </Placeholder>
          </div>
        </div>
      );
    }

    if (isError) {
      return <div className="text-dynamic-white">Error: retriving</div>;
    }

  async function showAddCategory() {
    setShowForm(true);
  }

  async function hideAddCategory() {
    setShowForm(false);
  }

  const name = slug.replace("-", " ");
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between my-2">
        <h4 className="normal-case"> {name} Item</h4>
        {showForm ? (
          <Button variant="danger" onClick={() => hideAddCategory()}>
            Cancel
          </Button>
        ) : (
          <Button variant="warning" onClick={() => showAddCategory()}>
            Add Item
          </Button>
        )}
      </div>
      <Row>
        <Col xs={12} lg={8} xxl={6}>
          {showForm && <MenuItemsForm res_id={res_id} cat_id={cat_id} />}
        </Col>
      </Row>

      <Row
        xs={1}
        sm={1}
        md={1}
        lg={2}
        xl={2}
        xxl={3}
        className="gx-3 gy-3 my-4"
      >
        {data.map((item) => (
          <Col className="d-flex flex-column">
            <MenuCard
              id={item.id}
              logo={item.image}
              name={item.name}
              price={item.item_price}
              short_description={item.short_description}
              currency_Symbol={item.currency_symbol}
              actual_price={item.actual_price}
              discount_percentage={item.discount_percentage}
            />
          </Col>
        ))}
      </Row>
      {data && data.length === 0 && (
        <p className="normal-case text-center">
          Add some food items in your {name} Menu
        </p>
      )}
    </div>
  );
};

export default MenuItem;
