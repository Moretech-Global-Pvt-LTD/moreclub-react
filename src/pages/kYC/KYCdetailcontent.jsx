import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { imageURL } from "../../config/config";
import { Link } from "react-router-dom";

const KYCdetailcontent = ({ data }) => {
  return (
    <div style={{ marginTop: "20px" }}>
      <Row>
        <Col md={3}>
          <Row>
            {!data.user?.user_profile?.display_picture ? (
              <div
                className="partner-logo-wrapper mx-auto d-flex justify-content-center align-items-center text-uppercase"
                style={{
                  width: "9rem",
                  height: "9rem",
                  objectFit: "contain",
                  backgroundColor: "#fff",
                  fontSize: "6rem",
                }}
              >
                {data.user.first_name[0]}
              </div>
            ) : (
              <img
                src={`${data.user?.user_profile?.display_picture}`}
                style={{
                  width: "9rem",
                  height: "9rem",
                  objectFit: "contain",
                  backgroundColor: "#fff",
                }}
                alt="Profile"
                className="img-fluid mx-auto rounded-circle mb-3 profile-image"
              />
            )}
            <Row>
              <img
                src={`${data.user?.qr_code}`}
                style={{
                  width: "10rem",
                  height: "10rem",
                  objectFit: "contain",
                  backgroundColor: "#fff",
                }}
                alt="qr code"
                className="img-fluid mx-auto mb-3 profile-image"
              />
            </Row>
          </Row>
        </Col>
        <Col md={9}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <h6>Personal Information</h6>
                <Link to={"/KYC/update"}>
                  <Button variant="success">Update KYC</Button>
                </Link>
              </div>

              <p>
                <strong>Name:</strong> {data.user.first_name}&nbsp;
                {data.user.last_name}
              </p>
              <p>
                <strong>Gender:</strong> {data.user.user_profile.gender}
              </p>
              <p>
                <strong>DOB (AD):</strong>{" "}
                {data.user.user_profile.date_of_birth}
              </p>
              <p>
                <strong>Email:</strong> {data.user.email}
              </p>
              <h6>Other Information</h6>
              {/* <p><strong>Father's/Husband's Name:</strong> {data.user.fatherHusbandName}</p> */}
              {/* <p><strong>Grandfather's/Father-in-law's Name:</strong> {data.user.grandfatherFatherInLawName}</p> */}
              <p>
                <strong>Marital Status:</strong> {data.kyc.maritalStatus}
              </p>
              <p>
                <strong>Occupation:</strong> {data.kyc.occupation}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h6>Address Information</h6>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h6>Address 1</h6>
              <p>
                <strong>Country:</strong> {data.user.user_profile.country}
              </p>
              <p>
                <strong>city:</strong> {data.user.user_profile.city}
              </p>
              <p>
                <strong>street:</strong> {data.user.user_profile.street}
              </p>
              {/* <p><strong>address:</strong> {data.user.user_profile.address}</p> */}
              <p>
                <strong>Zip code:</strong> {data.user.user_profile.zip_code}
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h6>Address 2</h6>
              <p>
                <strong>Country:</strong> {data.kyc.state_province}
              </p>
              <p>
                <strong>city:</strong> {data.kyc.city}
              </p>
              <p>
                <strong>Street:</strong> {data.kyc.street}
              </p>
              {/* <p><strong>Address:</strong> {data.kyc.address}</p> */}
              <p>
                <strong>Postal Code:</strong> {data.kyc.postal_code}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h5 className="mt-3">Document Information</h5>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          {!!data.user?.user_profile?.display_picture && (
            <img
              src={`${data.user?.user_profile?.display_picture}`}
              style={{
                width: "10rem",
                height: "10rem",
                objectFit: "contain",
                backgroundColor: "#fff",
              }}
              alt="Profile"
              className="img-fluid mb-3 profile-image"
            />
          )}
        </Col>
        <Col md={4}>
          {data.kyc?.document && (
            <img
              src={`${data.kyc.document.document_file}`}
              style={{
                width: "10rem",
                height: "10rem",
                objectFit: "contain",
                backgroundColor: "#fff",
              }}
              alt={data.kyc.document.document_type}
              className="img-fluid mb-3 profile-image"
            />
          )}
        </Col>
        {/* {data.user.documentPhotos.map((photo, index) => (
        <Col md={4} key={index}>
          <Card>
            <Card.Img variant="top" src={photo} alt={`Document Photo ${index + 1}`} />
            <Card.Body>
              <Card.Title>Document Photo {index + 1}</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))} */}
      </Row>
    </div>
  );
};

export default KYCdetailcontent;
