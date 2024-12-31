import React, { useEffect } from "react";
import { Button, Row } from "react-bootstrap";
import QuickLinks from "../../components/dashboard/quickLinks";
import { get_transaction } from "../../redux/api/transactionAPI";
import { useDispatch} from "react-redux";
// import Walletlinks from "../../components/dashboard/Walletlinks";
import { Link } from "react-router-dom";
import EventDashboardDisplay from "../../components/event/EventDashboardDisplay";
import PopularResturant from "../../components/Moreclub/morefood/PopularResturant";
import BusinessTypes from "../../components/dashboard/BusinessTypes";
import PopularSaloon from "../../components/Moreclub/Saloon/PopularSaloon";

const DashboardContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(get_transaction());
  }, [dispatch]);


  return (
    <>
        <Row>
          <BusinessTypes />
        </Row>
        <Row>
          <EventDashboardDisplay />
        </Row>
        <Row className="mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mt-4 mb-3">Popular Restaurants </h4>
            <Link to="/morefood">
              <Button variant="link">View All</Button>
            </Link>
          </div>
          <PopularResturant />
        </Row>
        <Row className="mt-4">
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="mt-4 mb-3">Popular Salons </h4>
            <Link to="/moresaloon">
              <Button variant="link">View All</Button>
            </Link>
          </div>
          <PopularSaloon />
        </Row>

        <Row  className="align-items-center">
          {/* <Col>
            <div className="nft-card card shadow-sm mt-4 mb-4 p-4">
              <Walletlinks />
            </div>
          </Col> */}
          <QuickLinks />
        </Row>

     
    </>
  );
};

export default DashboardContent;
