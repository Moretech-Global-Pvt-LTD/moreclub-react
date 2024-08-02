import React from "react";
import { Badge, Card, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { axiosInstance } from "../../..";
import { message } from "antd";
import { morefoodURL } from "../../../config/config";
import { useQueryClient } from "@tanstack/react-query";

const MenuCard = ({
  id,
  logo,
  name,
  price,
  short_description,
  currency_Symbol,
  actual_price,
  discount_percentage,
}) => {
  const { res_id, cat_id } = useParams();
    const queryClient = useQueryClient();

  async function handleDelete() {
    try {
      await axiosInstance
        .delete
        // `${morefoodURL}moreclub/user/menus/${id}/${res_id}/`
        (`${morefoodURL}moreclub/user/food/items/${cat_id}/${id}/${res_id}/`)
        
      message.success("Menu Deleted successfully");
       queryClient.invalidateQueries({
         queryKey: [`Resturant SubMenu List ${cat_id}`],
       });
    } catch (err) {
      message.error("error deleting ");
    }
  }

  return (
    <>
      <div
        // to={`/resturant/${res_id}/${cat_id}/${id}`}
        className="d-flex flex-column flex-grow-1 position-relative"
        style={{ height: "100%" }}
      >
        <Badge
          className="bg-danger position-absolute top-0 end-0"
          onClick={() => handleDelete()}
          style={{ zIndex: 10, cursor: "pointer" }}
        >
          <i class="bi bi-trash"></i>
        </Badge>
        <Card className="nearby-offers-card flex-grow-1">
          <Card.Body className="row ">
            <Col xs={7}>
              <Link to={`/resturant/${res_id}/${cat_id}/${id}`}>
                <Card.Title className="text-dynamic-white fs-6 text-center line">
                  {name}
                </Card.Title>
                <Card.Text className="d-flex gap-2 text-warning">
                  {currency_Symbol}&nbsp;{price}{" "}
                  {discount_percentage && (
                    <span
                      className="text-dynamic-white"
                      style={{ textDecorationLine: "line-through" }}
                    >
                      {currency_Symbol}&nbsp;{actual_price}
                    </span>
                  )}
                  {discount_percentage && (
                    <span className="text-dynamic-white text-end">
                      {discount_percentage}% Off
                    </span>
                  )}
                </Card.Text>
                <Card.Text className="text-dynamic-white line-clamp-2">
                  {short_description},
                </Card.Text>
              </Link>
            </Col>
            <Col xs={5} className="mx-auto mb-0">
              <img
                src={logo}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: "10rem",
                  objectFit: "contain",
                  backgroundColor: "#fff",
                }}
                alt="Profile"
                className="img-fluid  mb-3 profile-image "
              />
            </Col>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default MenuCard;
