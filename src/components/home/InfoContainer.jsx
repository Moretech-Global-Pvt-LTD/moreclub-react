import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import FreeButton from "./FreeButton";
import About1 from "../../images/about/expectation.png";
import About2 from "../../images/about/ourmission.png";
import InfoDescription from "./InfoDescription";

// const data = [
//   {
//     image: About1, // replace with actual path
//     heading: "Grow Your Business With...",
//     subheadings: [
//       {
//         title: "ALL THE TOOLS YOU NEED IN ONE PLATFORM",
//         description:
//           "The HighLevel Platform is everything that marketers need to manage their leads, websites, funnels, calendars and many other services that are needed to maintain a customer.",
//       },
//       {
//         title: "YOUR OWN WHITE LABELING PLATFORM",
//         description:
//           "Out of the box, the platform allows you to White Label the Desktop Application. Your clients will see your brand, down to the URL.",
//       },
//     ],
//     testimonial: {
//       text: "I have personally provided HighLevel to all of my elite clients in my mentorship program, and they have been utilizing it for prospecting, sales, fulfillment, keeping things closer, making sure prospects never slip through the cracks, and utilizing things to save their time. If you’re considering using HighLevel, use it. It’s going to help your business scale!",
//       author: "Alex Schlinsky",
//       position: "Founder of Prospecting On Demand™",
//       image: "/path-to-testimonial-image1.png", // replace with actual path
//     },
//   },
//   {
//     image: About2, // replace with actual path
//     heading: "Grow Your Business With...",
//     subheadings: [
//       {
//         title: "ALL THE TOOLS YOU NEED IN ONE PLATFORM",
//         description:
//           "The HighLevel Platform is everything that marketers need to manage their leads, websites services that are needed to maintain a customer.",
//       },
//       {
//         title: "ALL THE TOOLS YOU NEED IN ONE PLATFORM",
//         description:
//           "The HighLevel Platform is everything that marketers need to manage their leads, websites services that are needed to maintain a customer.",
//       },
//       {
//         title: "YOUR OWN WHITE LABELING PLATFORM",
//         description:
//           "Out of the box, the platform allows you to White Label the Desktop Application.",
//       },
//     ],
//   },
//   {
//     image: About2, // replace with actual path
//     heading: "Grow Your Business With...",
//     subheadings: [
//       {
//         title: "ALL THE TOOLS YOU NEED IN ONE PLATFORM",
//         description:
//           "The HighLevel Platform is everything that marketers need to manage their leads, websites services that are needed to maintain a customer.",
//       },
//       {
//         title: "ALL THE TOOLS YOU NEED IN ONE PLATFORM",
//         description:
//           "The HighLevel Platform is everything that marketers need to manage their leads, websites services that are needed to maintain a customer.",
//       },
//       {
//         title: "YOUR OWN WHITE LABELING PLATFORM",
//         description:
//           "Out of the box, the platform allows you to White Label the Desktop Application.",
//       },
//     ],
//   },
// ];

const InfoContainer = ({ data }) => {
  return (
    <Container>
      {data.map((item, index) => (
        <>
          <Row
            className="align-items-center d-flex my-2 py-2 position-relative"
            key={index}
          >
            {index % 2 === 0 ? (
              <>
                <Col md={6} className="mt-4">
                  <InfoDescription item={item} />
                </Col>
                <Col
                  md={6}
                  className="position-relative "
                  style={{ zIndex: "50" }}
                >
                  <div>
                    <div className="image-container text-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="img-fluid"
                      />
                    </div>
                    <div className="d-flex justify-content-center">
                      <FreeButton />
                    </div>
                  </div>
                </Col>
              </>
            ) : (
              <>
                <Col md={6} className="order-md-2 mt-4">
                  <InfoDescription item={item} />
                </Col>
                <Col
                  md={6}
                  className="order-md-1 position-relative"
                  style={{ zIndex: "50" }}
                >
                  <div className="image-container text-center">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="img-fluid"
                    />
                    <div className="d-flex justify-content-center">
                      <FreeButton />
                    </div>
                  </div>
                </Col>
              </>
            )}
          </Row>
          <div className="d-none d-lg-block">
            {index < data.length - 1 && (
              <div className="connector-container">
                <div
                  className={
                    index % 2 !== 0
                      ? "connector connector-left"
                      : "connector connector-right"
                  }
                >
                  {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                  <path
                    fill="currentColor"
                    style={{ width: "100%", height: "100%" }}
                    d="M237.43 130.55C215.84 176.57 197 198 178 198c-23.83 0-39.2-32.76-55.47-67.45C109.26 102.17 94.17 70 78 70c-9.18 0-25 10.5-48.53 60.55a6 6 0 0 1-10.86-5.1C40.16 79.43 59 58 78 58c23.83 0 39.2 32.76 55.47 67.45C146.74 153.83 161.83 186 178 186c9.18 0 25.05-10.5 48.53-60.55a6 6 0 0 1 10.86 5.1Z"
                  />
                </svg> */}
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path
                      d="M0,50 C15,0 85,100 100,50"
                      stroke="#ccc"
                      strokeWidth="1"
                      fill="none"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </>
      ))}
    </Container>
  );
};

export default InfoContainer;
