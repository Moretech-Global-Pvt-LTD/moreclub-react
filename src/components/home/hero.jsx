import React, { useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Divider from "../divider/Divider";

const Hero = () => {
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
    <div
      class="primary-background"
      style={{ paddingTop: "4rem", paddingBottom: "4rem" }}
    >
      <div class="container text-white ">
        <div class="row align-items-center g-5">
          <div class="col-12 col-sm-12 col-lg-6 ">
            <div class="welcome-content mb-5 mb-md-0 ">
              <div
                class="animated fadeInUp"
                style={{ animationDuration: "1s" }}
              >
                <h2 className="text-white text-center fs-1">
                  Save and Make Money with More Deals Club.
                </h2>
              </div>
              <div
                class="animated fadeInUp "
                style={{ animationDuration: "1s" }}
              >
                {/* <p class="mb-4 text-center">
                  Gain access to exclusive resources, mentorship, and
                  opprtunities to build wealth and secure your financial future.
                  <Link
                    class="btn btn-link rounded-pill me-3 ms-0"
                    to="/learnmore"
                  >
                    Learn More<i class="ms-2 bi bi-arrow-right"></i>
                  </Link>
                </p> */}
                <div className="bg-danger px-4 py-2 mx-5 ">
                  <h3 className="text-white text-center">TRY FOR FREE</h3>
                  <p
                    className="fs-6 fw-thin text-white text-center "
                    style={{ whiteSpace: "nowrap" }}
                  >
                    TAKE YOUR BUSINESS TO NEXT LEVEL
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-lg-6">
            <div className="row video-container">
              <iframe
                ref={iframeRef}
                id="ytplayer"
                type="text/html"
                src="https://www.youtube.com/embed/QagusmnC0Fs?si=v9MmeW8Nv85wzoRm?autoplay=1&loop=1&controls=0&showinfo=0&modestbranding=0&rel=0"
                title="Membersclub - Save and Make Money with More Deals Club"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
            {/* <div class="animated fadeInUp" style={{ animationDuration: "1s" }}>
              <div class="welcome-thumb">
               
                <img src={HomeImageWhite} alt="Welcome" />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
