import GalleryImageUpload from "../../../../components/Moreclub/Resturant/Gallery/GalleryUplaod";
import React, { useState } from "react";
import { Button, Card, Col, Placeholder, Row } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { morefoodURL } from "../../../../config/config";
import { axiosInstance } from "../../../..";
import ImageContainer from "../../../../components/Moreclub/Resturant/Gallery/GalleryImageContainer";

const GalleryContent = () => {
  const { res_id, cat_id, slug } = useParams();
  const [showForm, setShowForm] = useState(false);

  // const { data, isLoading, isError } = useQuery({
  //   queryKey: [`Resturant SubMenu List ${cat_id}`],
  //   queryFn: async () => {
  //     const response = await axiosInstance.get(
  //       `${morefoodURL}moreclub/user/food/items/${cat_id}/${res_id}/`
  //     );
  //     const data = await response.data.data;
  //     return data;
  //   },
  //   staleTime: 100,
  // });

  // if (isLoading) {
  //   return (
  //     <div className="">
  //       <div className="row gap-2">
  //         <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
  //           <Placeholder xs={12} style={{ height: "8rem" }} />
  //         </Placeholder>
  //         <Placeholder as="p" animation="glow" className="rounded  w-25 me-2">
  //           <Placeholder xs={12} style={{ height: "8rem" }} />
  //         </Placeholder>
  //         <Placeholder as="p" animation="glow" className="rounded  w-25">
  //           <Placeholder xs={12} style={{ height: "8rem" }} />
  //         </Placeholder>
  //         <Placeholder as="p" animation="glow" className="rounded w-25 me-2">
  //           <Placeholder xs={12} style={{ height: "8rem" }} />
  //         </Placeholder>
  //       </div>
  //     </div>
  //   );
  // }

  // if (isError) {
  //   return <div className="text-dynamic-white">Error: retriving</div>;
  // }

  const data = [
    { id: 1, url: "https://via.placeholder.com/300x200", width:"300", height:"200" },
    { id: 2, url: "https://via.placeholder.com/400x300", width:"400", height:"300" },
    { id: 3, url: "https://via.placeholder.com/200x400", width:"200", height:"400"},
    { id: 4, url: "https://via.placeholder.com/250x250", width:"250", height:"250"},
    { id: 1, url: "https://via.placeholder.com/300x200", width:"300", height:"200" },
    { id: 2, url: "https://via.placeholder.com/400x300", width:"400", height:"300" },
    { id: 3, url: "https://via.placeholder.com/200x400", width:"200", height:"400"},
    { id: 4, url: "https://via.placeholder.com/250x250", width:"250", height:"250"},
    
  ];

  async function showAddPhoto() {
    setShowForm(true);
  }

  async function hideAddPhoto() {
    setShowForm(false);
  }

  const name = slug.replace("-", " ");
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
          {showForm && <GalleryImageUpload />}
        </Col>
      </Row>

      
      <div className='masonry-gallery'>
        {data.map((item, index) => (
          <ImageContainer key={item.id} item={item} onClick={() => console.log(index)} />
        ))
        }
</div>

    </div>
  );
};

export default GalleryContent;

