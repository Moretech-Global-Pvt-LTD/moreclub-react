import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Testimonials = () => {
  return (
    <Container>
      <Row xs={1} sm={2} md={3}>
        {[1, 2, 3, 4, 5, 6].map(() => (
          <Col>
            <div className="row stat-video-container">
              <iframe
                id="ytplayer"
                type="text/html"
                src="https://www.youtube.com/embed/QagusmnC0Fs?si=v9MmeW8Nv85wzoRm?autoplay=1&loop=1&controls=0&showinfo=0&modestbranding=0&rel=0"
                title="Membersclub - Save and Make Money with More Deals Club"
                frameborder="0"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>

            <p>Name</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Testimonials;
