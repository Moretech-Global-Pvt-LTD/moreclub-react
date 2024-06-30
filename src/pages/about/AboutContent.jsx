import React, { useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./About.css"; // Import your CSS file for styling
import About1 from "../../images/about/expectation.png";
import About2 from "../../images/about/ourmission.png";

const AboutContent = () => {
  const iframeRef = useRef(null);

  const adjustIframeHeight = () => {
    const iframe = iframeRef.current;
    const aspectRatio = 9 / 16; // 16:9 aspect ratio
    const width = iframe.clientWidth;
    const height = width * aspectRatio;
    iframe.style.height = `${height}px`;
  };

  useEffect(() => {
    adjustIframeHeight();
    window.addEventListener("resize", adjustIframeHeight);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("resize", adjustIframeHeight);
    };
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center">Welcome to MoreDeals Club!</h1>
          <div className="about-content">
            <p>
              At MoreDeals Club, we're committed to fostering a vibrant
              community of like-minded individuals who share a passion for
              technology, entrepreneurship, and wellness.
            </p>
            <p>
              Our platform serves as a central hub where members can connect,
              collaborate, and flourish together. Built on the foundation of
              meaningful connections and mutual growth, MoreDeals Club offers a
              unique space where members can unlock exclusive opportunities and
              access premium services tailored to their interests and
              aspirations.
            </p>
          </div>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={6}>
          <div className="about-content">
            <h2>Discover the possibilities. Join MoreDeals Club today</h2>
            <p>
              Once you become part of our network, you'll gain access to
              exclusive discounts and benefits, helping alleviate financial
              constraints and enhancing your overall experience.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <div className="video-container">
            <div className="row video-container">
              <iframe
                ref={iframeRef}
                id="ytplayer"
                type="text/html"
                src="https://www.youtube.com/embed/KuuKQZ64HNo?autoplay=1&loop=1&playlist=KuuKQZ64HNo&controls=0&showinfo=0&modestbranding=0&rel=0"
                title="Membersclub - Save and Make Money with More Deals Club"
                frameborder="0"
                allow="accelerometer;  clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>

            {/* <iframe
              width="100%"
              height="315"
              src="https://www.youtube.com/embed/0EUKcQFSzAs?si=FSKaSdjWwYx7ogUc"
              title="About Us Video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe> */}
          </div>
        </Col>
      </Row>

      <Row className="align-items-center d-flex flex-md-row-reverse">
        <Col md={6}>
          <div className="about-content">
            <h2>What sets us apart</h2>
            <p>
              MoreDeals Club is our innovative referral program, designed to
              reward members for actively expanding our community. With every
              successful referral, both the referrer and the new member unlock
              special benefits, fostering a culture of shared success and mutual
              support.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <div className="image-container">
            <img src={About1} alt="about-1" className="img-fluid" />
          </div>
        </Col>
      </Row>
      <Row className="align-items-center">
        <Col md={6}>
          <div className="about-content">
            <h2>Our Mission</h2>
            <p>
              Our mission is simple: to empower individuals to realize their
              full potential by providing a supportive and dynamic environment
              where they can learn, grow, and succeed together. Join us on this
              exciting journey as we cultivate a community where collaboration
              thrives, ideas flourish, and connections endure. Together, we're
              shaping the future of business, leadership, personal development,
              and beyond. Discover the possibilities.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <div className="image-container">
            <img src={About2} alt="about-2" className="img-fluid" />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutContent;
