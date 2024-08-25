import React from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  const user = useSelector((state) => state.userReducer);
  const permisions = useSelector((state)=>state.permissionReducer)
  const business = useSelector((state) => state.businessReducer);
  return (
    <>
      <Col lg={8}>
        <div className="nft-card  shadow-sm mt-4 mb-4 p-4">
          <h6>Quick links</h6>
          <Row className="" xs={2} sm={2} lg={3}  gap={1}>
            <Link to="/scan" className="col p-1 ">
              <p className="fs-6 mt-2 mb-2 border-bottom pb-2 text-center card"> Scan</p>
            </Link>
            <Link to="/coupon" className="col p-1">
              <p className="card text-center fs-6 mt-2 mb-2 border-bottom pb-2">Buy Coupons</p>
            </Link>
            <Link to="/pricing" className="col p-1" >
              <p className="card text-center fs-6 mt-2 mb-2 border-bottom pb-2">
                Upgrade Package
              </p>
            </Link>
            <Link to="/my-network" className="col p-1" >
              <p className="card text-center fs-6 mt-2 mb-2 border-bottom pb-2">
                My network
              </p>
            </Link>
            {user && user.user?.user_type !== "NORMAL" &&  (
              <>
              {business && business.businessProfile.is_verified &&
              <>
              {permisions.permission &&
            permisions.permission.billing && 
              <>
                <Link to="/billing"className="col p-1">
                  <p className="card text-center fs-6 mt-2 mb-2 border-bottom pb-2">Billing</p>
                </Link>
                <Link to="/business-transactions" className="col p-1">
                  <p className="card text-center fs-6 mt-2 mb-2 border-bottom pb-2">
                    Billing Transactions
                  </p>
                </Link>
              
              </>
              
              }
              </>
              
              }
              </>

            )}
          </Row>
        </div>
      </Col>
    </>
  );
};

export default QuickLinks;
