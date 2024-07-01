import { Link } from "react-router-dom";
// import ScrollAnimation from "react-animate-on-scroll";
import HomeImageWhite from "../../images/Home/HeroWhite.png";
import { useEffect, useRef } from "react";

export default function HeroOne() {
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
    <div class="welcome-area" style={{ marginTop: "10px" }}>
      <div class="container">
        <div class="row align-items-center">
          <div class="col-12 col-sm-10 col-md-6">
            <div class="welcome-content mb-5 mb-md-0">
              <div
                class="animated fadeInUp"
                style={{ animationDuration: "1s" }}
              >
                <h2>Save and Make Money with MoreDeals Club.</h2>
              </div>
              <div
                class="animated fadeInUp "
                style={{ animationDuration: "1s" }}
              >
                <p class="mb-4 ">
                  Gain access to exclusive resources, mentorship, and
                  opprtunities to build wealth and secure your financial future.
                  <Link
                    class="btn btn-link rounded-pill me-3 ms-0"
                    to="/learnmore"
                  >
                    Learn More<i class="ms-2 bi bi-arrow-right"></i>
                  </Link>
                </p>
              </div>
              <div
                class="animated fadeInUp"
                style={{ animationDuration: "1s" }}
              >
                <div class="hero-btn-group">
                  <Link
                    class="btn btn-primary rounded-pill mt-3 me-3"
                    to="/register-membership"
                  >
                    Get Started<i class="ms-2 bi bi-arrow-right"></i>
                  </Link>
                  <Link
                    class="btn btn-danger rounded-pill mt-3 me-3"
                    to="/scan"
                  >
                    Refer<i class="ms-2 bi bi-arrow-right"></i>
                  </Link>
                  {/* <a
                    class="btn btn-minimal hover-primary mt-3"
                    href="/collections"
                  >
                    <i class="me-2 bi bi-grid-3x3-gap"></i>All Collections
                  </a> */}
                  {/* <a
                    class="btn btn-minimal hover-primary mt-3"
                    href="/get-membership"
                  >
                    <i class="me-2 bi bi-grid-3x3-gap"></i>Scan
                  </a> */}
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-6">
            <div className="row video-container">
              <iframe
                ref={iframeRef}
                id="ytplayer"
                type="text/html"
                src="https://www.youtube.com/embed/KuuKQZ64HNo?autoplay=1&loop=1&playlist=KuuKQZ64HNo&controls=0&showinfo=0&modestbranding=0&rel=0"
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
}
