import React, { useEffect } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import RestaurantLayout from "../../../../components/Layout/RestaurantLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchSections } from "../../../../redux/api/tableApi";
import RestaurantCardSkeleton from "../../../../components/Skeleton/RestaurantCardSkeleton";
import UniversalErrorbox from "../../../../components/Layout/UniversalErrorBox";

const Tableadmin = () => {
  const { res_id, slug } = useParams();
  const section = useSelector((state) => state.table);

  

    const dispatch = useDispatch();

  useEffect(() => {
    if (res_id) {
       dispatch(fetchSections(res_id));
    }
  }, [res_id, dispatch]);




  if (section.loading) {
    return (
        <RestaurantLayout>
            <RestaurantCardSkeleton />
        </RestaurantLayout>
    );
  }

  if (section.error) {
    return <RestaurantLayout>
        <UniversalErrorbox message="Something went wrong while fetching the Restaurant tables" 
        />
    </RestaurantLayout>
  }





  return (
    <RestaurantLayout>
      <Row xs={2} sm={2} md={3} lg={4} xl={5} xxl={6} className="mt-4">
        {/* {section.sections && section.sections.length > 0 && ( */}
        <Link
          to={`/restaurant/${res_id}/table/order/${slug}`}
          className="d-flex flex-column my-2 "
        >
          <Col className="d-flex flex-column my-2">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={"/images/moreclub/morefood/table.png"}
                  alt="table order"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", width: "5rem" }}
                />
              </Card.Body>
              <Card.Title className="text-dynamic-white text-center fs-6">
                Tables Order
              </Card.Title>
            </Card>
          </Col>
        </Link>
            
        {/* )} */}
        <Link
          to={`/restaurant/${res_id}/table/manage/${slug}`}
          className="d-flex flex-column my-2"
        >
          <Col className="d-flex flex-column my-2">
            <Card className="p-2 flex-grow-1">
              <Card.Body className="d-flex justify-content-center">
                <img
                  src={"/images/moreclub/morefood/tablesetup.svg"}
                  alt="manage"
                  className="px-2 py-1 rounded "
                  style={{ height: "5rem", width: "5rem" }}
                />
              </Card.Body>
              <Card.Title className="text-dynamic-white text-center fs-6">
                Manage Tables
              </Card.Title>
            </Card>
          </Col>
        </Link>
      </Row>
    </RestaurantLayout>
  );
};

export default Tableadmin;
