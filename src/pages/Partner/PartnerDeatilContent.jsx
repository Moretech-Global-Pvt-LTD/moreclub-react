import React from "react";
import { Card, Col, ListGroup, ListGroupItem, Placeholder, Row } from "react-bootstrap";
import MapboxComponent from "../../components/Googlemap/MapboxComponent";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../..";
import { baseURL } from "../../config/config";

const PartnerDeatilContent = () => {

  const { partnerId } = useParams();
  const { data:company, isLoading, isError } = useQuery({
    queryKey: [`partners ${partnerId}`],
    queryFn: async () => {
      const response = await axiosInstance.get(
        `${baseURL}business/our/partners/${partnerId}/`
      );
      return response.data.data;
    },
    staleTime: 1000,
  });

  if (isLoading) {
    return (
      <div>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} size="lg" style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
        <Placeholder as="p" animation="glow" className="rounded">
          <Placeholder xs={12} style={{ height: "7rem" }} />
        </Placeholder>
      </div>
    );
  }

  if (isError) {
    <div className="text-dynamic white">Error getting data</div>;
  }

  return (
    <div className="mt-5">
      <Row>
        <Col md={4}>
          <Card className="mb-3">
            <div className="d-flex justify-content-center mt-3 ">
              {!company?.business_logo ? (
                <div
                  className="partner-logo-wrapper ms-0 me-0 d-flex justify-content-center align-items-center text-uppercase"
                  style={{
                    width: "8rem",
                    height: "8rem",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                    fontSize: "6rem",
                  }}
                >
                  {company?.business_name[0]}
                </div>
              ) : (
                <img
                  src={company?.business_logo}
                  style={{
                    width: "8rem",
                    height: "8rem",
                    objectFit: "contain",
                    backgroundColor: "#fff",
                  }}
                  alt="Profile"
                  className="img-fluid rounded-circle mb-3 profile-image"
                />
              )}
            </div>
            <Card.Body>
              <Card.Title className="text-dynamic-white text-center text-warning">
                {company?.business_name}
              </Card.Title>
              <p>
                <i class="bi bi-geo-alt-fill"></i>&nbsp;<strong>Address:</strong> {company?.business_address}
              </p>
              <p>
                <strong><i class="bi bi-telephone-fill"></i>&nbsp;Phone:</strong><a href={`https://wa.me/${company?.business_phone}`}>{company?.business_phone}</a>
              </p>
              <p>
                <i class="bi bi-envelope-fill"></i>&nbsp;<strong>Email:</strong> <a href={`mailto:${company?.business_email}`}>{company?.business_email}</a>
              </p>
              <p>
                <strong><i class="bi bi-globe"></i> &nbsp;</strong> {company?.business_email}
              </p>
              <p>
                <strong><i class="bi bi-facebook"></i>&nbsp;</strong> {company?.business_email}
              </p>
              <p>
                <i class="bi bi-instagram"></i>&nbsp; {company?.business_email}
              </p>
            </Card.Body>
          </Card>
          <Card className="my-2">
            <Card.Body>
              <Card.Title className="text-dynamic-white text-center text-warning">
                {"Discounts Offered At"}
              </Card.Title>
              {company?.business_discounts &&
                company.business_discounts.map((item) => (
                  <Card.Text>
                    <strong>{item?.business_type}:</strong>{" "}
                    {item?.discount}%
                  </Card.Text>
                ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              {/* <Card.Title>Company Details</Card.Title> */}
              <div className="d-flex gap-2 align-items-center">
                <img src={company?.qr_code} alt="qr" className="w-25" />
                <ListGroup className="list-group-flush w-75">
                  <ListGroupItem>
                    <strong>Location:</strong> {company?.business_address}
                  </ListGroupItem>
                  <ListGroupItem>
                    <strong>Referrals:</strong> {company?.no_of_refer}
                  </ListGroupItem>
                </ListGroup>
              </div>
              <div className="mt-4">
                <h5>Google Map Location</h5>
                {company?.lat && company?.lng &&
                <MapboxComponent
                  lat={company.lat}
                  lng={company.lng}
                  detail={company.business_address}
                  title={company.business_name}
                />
                  
               }
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PartnerDeatilContent;
