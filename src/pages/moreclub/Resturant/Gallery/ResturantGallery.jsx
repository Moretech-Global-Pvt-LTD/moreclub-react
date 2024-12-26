import GalleryImageUpload from "../../../../components/Moreclub/Resturant/Gallery/GalleryUplaod";
import React, { useState } from "react";
import { Button, Card, Col, Placeholder, Row } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { QueryClient, useQuery } from "@tanstack/react-query";

import { morefoodURL } from "../../../../config/config";
import { axiosInstance } from "../../../..";
import ImageContainer from "../../../../components/Moreclub/Resturant/Gallery/GalleryImageContainer";
import { useDispatch, useSelector } from "react-redux";
import { setRestaurantGallery } from "../../../../redux/slices/gallerySlice";
import FewImage from "../../../../components/Moreclub/Resturant/Gallery/fewimage";

const RestaurantGalleryContent = () => {
  const { res_id } = useParams();
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();
  const queryClient = new QueryClient();
  const gallery = useSelector((state) => state.gallery);
  const { data, isLoading, isError } = useQuery({
    queryKey: [`Resturant Gallery ${res_id}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${morefoodURL}moreclub/user/restaurants/gallery/${res_id}/`
      );
      const data = await response.data.data;
      dispatch(setRestaurantGallery(data));
      return data;
    },
    staleTime: 300000,
  });

  if (isLoading) {
    return (
      <div className="d-flex  flex-wrap gap-2">
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ width: "16rem", height: "16rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ width: "16rem", height: "16rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ width: "16rem", height: "16rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ width: "16rem", height: "16rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ width: "16rem", height: "16rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ width: "16rem", height: "16rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ width: "16rem", height: "16rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ width: "16rem", height: "16rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ width: "16rem", height: "16rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ width: "16rem", height: "16rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ width: "16rem", height: "16rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
          <Placeholder xs={12} style={{ width: "16rem", height: "16rem" }} />
        </Placeholder>
      </div>
    );
  }

  if (isError) {
    return <div className="text-dynamic-white">Error: retriving</div>;
  }

  async function showAddPhoto() {
    setShowForm(true);
  }

  async function hideAddPhoto() {
    setShowForm(false);
    queryClient.invalidateQueries({
      queryKey: [`Resturant Gallery ${res_id}`],
    });
  }

  // const name = slug.replace(/-/g, " ");

  return (
    <div>
      <div className="d-flex align-items-center justify-content-end my-2">
        {/* <h4 className="normal-case"> {name} Item</h4> */}
        {showForm ? (
          <Button variant="danger" onClick={() => hideAddPhoto()}>
            Cancel
          </Button>
        ) : (
          <Button variant="warning" onClick={() => showAddPhoto()}>
            Upload Image
          </Button>
        )}
      </div>
      <Row>
        <Col xs={12} lg={8} xxl={6}>
          {showForm && <GalleryImageUpload onFinish={hideAddPhoto} />}
        </Col>
      </Row>

      <div className="d-flex flex-wrap gap-2">
        {gallery.restaurantGallery &&
          gallery.restaurantGallery.length <= 10 &&
          gallery.restaurantGallery.map((item, index) => (
            <FewImage key={item.id} item={item} />
          ))}
      </div>

      <div className="masonry-gallery">
        {gallery.restaurantGallery &&
          gallery.restaurantGallery &&
          gallery.restaurantGallery.length > 10 &&
          gallery.restaurantGallery.map((item, index) => (
            <ImageContainer
              key={item.id}
              item={item}
              onClick={() => console.log(index)}
            />
          ))}
      </div>

      {gallery.restaurantGallery && gallery.restaurantGallery.length === 0 && (
        <p className="text-center text-dynamic-white">No Image Found</p>
      )}
    </div>
  );
};

export default RestaurantGalleryContent;
