import React from "react";
import { Badge, Card} from "react-bootstrap";
import { Link} from "react-router-dom";
import { morefoodimageURL, morefoodURL } from "../../../../config/config";
import { axiosInstance } from "../../../..";
import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";

const CategoryCard = ({ id, res_id, logo, name, item }) => {

  const queryClient = useQueryClient();
  const slug = name.replace(/ /g, "-");
  
   async function handleDelete() {
     try {
       await axiosInstance.delete(
         `${morefoodURL}moreclub/user/menus/${id}/${res_id}/`
       );
       queryClient.invalidateQueries({
         queryKey: [`Resturant Menu List ${res_id}`],
       });
       message.success("Menu Deleted successfully");
     } catch (err) {
       message.error("error deleting");
       queryClient.invalidateQueries({
         queryKey: [`Resturant Menu List ${res_id}`],
       });
     }
   }

  return (
    <div className="d-flex flex-column position-relative" style={{ height: "100%" }}>
      <Badge className="bg-danger position-absolute top-0 end-0" style={{zIndex:10, cursor:"pointer"}} onClick={() => handleDelete()}>
        <i class="bi bi-trash"></i>
      </Badge>
      <Card className="nearby-offers-card flex-grow-1">
        <div className="mx-auto mt-2 mb-0">
          <img
            src={`${morefoodimageURL}${logo}`}
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
              backgroundColor: "#fff",
            }}
            alt="Profile"
            className="img-fluid rounded-circle mb-3 profile-image"
          />
        </div>
        <Link to={`/resturant/${res_id}/menu/${id}/${slug}`}>
          <Card.Body className="pt-0">
            <Card.Title className="text-dynamic-white text-center line">
              {name}
            </Card.Title>
            <Card.Text className="text-warning">{item} items</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </div>
  );
};

export default CategoryCard;
