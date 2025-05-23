import React from "react";
import {Col, Image,  Row } from "react-bootstrap";

import { Link, useParams } from "react-router-dom";



const GalleryContent = () => {
  const { res_id,  slug } = useParams();
  

  return (
    <div>
      <div className="d-flex align-items-center my-2">
        

        <Row xs={2} lg={3} xl={4} className="px-1 " >
          <Col className="">
            <Link to={`/resturant/${res_id}/gallery/${slug}/restaurant`} className="card bg-secondary">
              <Image
                src={'/images/moreclub/morefood/Restaturant.png'}
                alt="Restaurant Gallery"
                className="px-0"
              />
              <div>
                <p className="text-center pt-2 text-white">Restaurant Gallery</p>
              </div>

            </Link>

          </Col>
          <Col className=" ">
            <Link to={`/resturant/${res_id}/gallery/${slug}/user-upload`} className="card bg-secondary">
              <Image
                src={`/images/moreclub/morefood/user.png`}
                alt="User Gallery"
                className=""
              />
              <div>
                <p className="text-center pt-2 text-white">User Gallery</p>
              </div>
            </Link>

          </Col>

        </Row>




      </div>
     

    </div>
  );
};

export default GalleryContent;

