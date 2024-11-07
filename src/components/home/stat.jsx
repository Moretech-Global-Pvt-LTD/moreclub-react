import React, { useEffect, useRef } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Statcard from "./Statcard";

export default function Stat() {
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
      <Row className="my-4">
        <Col md={4}>
          <div class="col-12">
            <div className="row stat-video-container">
              <iframe
                ref={iframeRef}
                id="ytplayer"
                type="text/html"
                src="https://www.youtube.com/embed/pZ5rVUQGiy4?si=pIqh530XA2HtHLnm?autoplay=1&loop=1&controls=0&showinfo=0&modestbranding=0&rel=0"
                title="Membersclub - Save and Make Money with More Deals Club"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            <p className="text-center mt-2">Watch Demo</p>
          </div>
        </Col>
        <Col
          md={8}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="text-center">
            <h2>We're In The Business Of Helping You Save and Earn</h2>
            <p>
              More Deals Club is your all-in-one platform for incredible savings
              and effortless earnings. Get the tools, support, and rewards you
              need to maximize your shopping and referral benefits. Join us
              today and start saving big while earning cash rewards with every
              referral!
            </p>
            <div className="d-none d-lg-block">
              <Statcard />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="d-block d-lg-none">
        <Statcard />
      </Row>
    </Container>
  );
}
