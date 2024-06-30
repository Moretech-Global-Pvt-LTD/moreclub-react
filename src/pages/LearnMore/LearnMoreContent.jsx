import React from "react";
import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import "./LearnMore.css";
import About1 from "../../images/about/expectation.png";
import About2 from "../../images/about/ourmission.png";



const LearnMoreContents = () => {
  return (
    <Container>
      <h1 className="text-center mb-2">Know About MoreDeal Club</h1>
      <Row className="align-items-center">
        <Col md={6}>
          <div className="about-content">
            <h2>Refer your Friends</h2>
            <p>
              Our club platform operates on a unique model that fosters member
              growth through a dynamic referral program. When existing members
              refer new individuals to join our platform, they not only expand
              our community but also unlock exclusive benefits for themselves.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <div className="video-container">
            <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/0EUKcQFSzAs?si=FSKaSdjWwYx7ogUc"
              title="About Us Video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </Col>
      </Row>
      <Row className="align-items-center d-flex flex-md-row-reverse">
        <Col md={6}>
          <div className="about-content">
            <h2>Benifits from Referals</h2>
            <p>
              With every successful referral, our members receive kickbacks from
              the purchases made by their referred clients within our partner
              network. These kickbacks serve as a token of appreciation for
              their pivotal role in expanding our network and enriching our
              platform's value proposition. This system creates a mutually
              beneficial scenario: new members gain access to our premium
              services and benefits, while existing members are rewarded for
              their advocacy and contribution to our platform's growth.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <div className="image-container">
            <img src={About1} alt="learnmore-1" className="img-fluid" />
          </div>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={6}>
          <div className="about-content">
            <h2> Our Objectives with the referral program</h2>
            <p>
              By harnessing the power of our referral program, we aim to
              cultivate a vibrant community of engaged members while
              simultaneously attracting new clients to our platform. Overall,
              our referral program epitomizes our dedication to nurturing mutual
              success and fostering organic growth within our community, thereby
              generating value for both our members and investors alike.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <div className="image-container">
            <img src={About2} alt="learnmore-2" className="img-fluid" />
          </div>
        </Col>
      </Row>
     
    </Container>
  );
};

export default LearnMoreContents;
