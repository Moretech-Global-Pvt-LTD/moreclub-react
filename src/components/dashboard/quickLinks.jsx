import React from "react";
import { Card, Col, Row } from "react-bootstrap";
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
         
          <Row xs={3} sm={3} md={3} lg={3} xl={4} xxl={6} className="mt-4">
            <Link to={`/scan`} className="d-flex flex-column my-2 ">
              <Col className="d-flex flex-column  ">
                <Card className=" flex-grow-1 p-0">
                  <div className="d-flex justify-content-center py-2 px-0">
                    <h1 className="my-0 py-0 mx-0"><i class="bi bi-qr-code-scan text-dynamic-white"></i></h1>
                  </div>
                  <Card.Title className="text-dynamic-white text-center fs-6">
                    Scan
                  </Card.Title>
                </Card>
              </Col>
            </Link>
            {/* <Link to={`/coupon`} className="d-flex flex-column my-2 ">
              <Col className="d-flex flex-column  ">
                <Card className=" flex-grow-1 p-0">
                  <div className="d-flex justify-content-center py-2 px-0">
                    <h1 className="my-0 py-0 mx-0"><i class="bi bi-cash text-dynamic-white"></i></h1>
                  </div>
                  <Card.Title className="text-dynamic-white text-center fs-6">
                    Buy Coupons
                  </Card.Title>
                </Card>
              </Col>
            </Link> */}
            <Link to={`/pricing`} className="d-flex flex-column my-2 ">
              <Col className="d-flex flex-column  ">
                <Card className=" flex-grow-1 p-0">
                  <div className="d-flex justify-content-center py-2 px-0">
                    <h1 className="my-0 py-0 mx-0"><i class="bi bi-ticket-detailed-fill text-dynamic-white"></i></h1>
                  </div>
                  <Card.Title className="text-dynamic-white text-center fs-6">
                    Upgrade
                  </Card.Title>
                </Card>
              </Col>
            </Link>
            <Link to={`/my-network`} className="d-flex flex-column my-2 ">
              <Col className="d-flex flex-column  ">
                <Card className=" flex-grow-1 p-0">
                  <div className="d-flex justify-content-center py-2 px-0">
                    <h1 className="my-0 py-0 mx-0"><i class="bi bi-diagram-3-fill text-dynamic-white"></i></h1>
                  </div>
                  <Card.Title className="text-dynamic-white text-center fs-6">
                    Network
                  </Card.Title>
                </Card>
              </Col>
            </Link>
            {user && user.user?.user_type !== "NORMAL" && (
              <>
                {business && business.businessProfile.is_verified &&
                  <>
                    {permisions.permission &&
                      permisions.permission.billing &&
                    <>
                    {/* <Link to={`/billing`} className="d-flex flex-column my-2 ">
                      <Col className="d-flex flex-column  ">
                        <Card className=" flex-grow-1 p-0">
                          <div className="d-flex justify-content-center py-2 px-0">
                            <h1 className="my-0 py-0 mx-0"><i class="bi bi-receipt text-dynamic-white"></i></h1>
                          </div>
                          <Card.Title className="text-dynamic-white text-center fs-6">
                            Billing
                          </Card.Title>
                        </Card>
                      </Col>
                    </Link> */}
                    <Link to={`/business-transactions`} className="d-flex flex-column my-2 ">
                      <Col className="d-flex flex-column  ">
                        <Card className=" flex-grow-1 p-0">
                          <div className="d-flex justify-content-center py-2 px-0">
                            <h4 className="my-0 py-0 mx-0"><i class="bi bi-journal text-dynamic-white"></i></h4>
                          </div>
                          <Card.Title className="text-dynamic-white text-center fs-6">
                            Business Transaction
                          </Card.Title>
                        </Card>
                      </Col>
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
