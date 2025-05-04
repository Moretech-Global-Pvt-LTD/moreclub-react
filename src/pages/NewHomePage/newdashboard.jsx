import React from "react";
import "./newdashbord.css";

const Newdashboard = () => {
  return (
    <div>
      <div className="newdashboard-header">
        <h1>Greek Island Getaway</h1>
        <div
          className="alert text-dynamic-white"
          style={{
            background: "rgba(212, 175, 55, 0.1)",
            padding: "10px 15px",
            borderRadius: "8px",
          }}
        >
          <i className="bi bi-gift" style={{ color: "#d4af37" }}></i> Limited
          availability - Book now!
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M2 19c0 1.7 1.3 3 3 3h14c1.7 0 3-1.3 3-3v-8H2zM19 4h-2V3c0-.6-.4-1-1-1s-1 .4-1 1v1H9V3c0-.6-.4-1-1-1s-1 .4-1 1v1H5C3.3 4 2 5.3 2 7v2h20V7c0-1.7-1.3-3-3-3"
              />
            </svg>
          </div>
          <div className="stat-info">
            <h3>5-7 Days</h3>
            <p>Luxury Villa Stay</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 48 48"
            >
              <defs>
                <mask id="ipTShip0">
                  <g
                    fill="none"
                    stroke="#fff"
                    stroke-linejoin="round"
                    stroke-width="4"
                  >
                    <path
                      stroke-linecap="round"
                      d="M6 20.377L24 14l18 6.377L36.667 34H11.333z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill="#555555"
                      d="M13 8h22l-.002 9.896L24 14l-11 3.896z"
                    />
                    <path
                      stroke-linecap="round"
                      d="M24 8V4m0 20v-8M10 40l3.5 4l3.5-4l3.5 4l3.5-4l3.5 4l3.5-4l3.5 4l3.5-4"
                    />
                  </g>
                </mask>
              </defs>
              <path
                fill="currentColor"
                d="M0 0h48v48H0z"
                mask="url(#ipTShip0)"
              />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Private</h3>
            <p>Island Cruise</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            {/* <i className="bi bi-restaurant"></i> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M16 6v8h3v8h2V2c-2.76 0-5 2.24-5 4m-5 3H9V2H7v7H5V2H3v7c0 2.21 1.79 4 4 4v9h2v-9c2.21 0 4-1.79 4-4V2h-2z"
              />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Gourmet</h3>
            <p>Dining Experience</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="42.86"
              height="40"
              viewBox="0 0 1920 1792"
            >
              <path
                fill="currentColor"
                d="m960 0l960 384v128h-128q0 26-20.5 45t-48.5 19H197q-28 0-48.5-19T128 512H0V384zM256 640h256v768h128V640h256v768h128V640h256v768h128V640h256v768h59q28 0 48.5 19t20.5 45v64H128v-64q0-26 20.5-45t48.5-19h59zm1595 960q28 0 48.5 19t20.5 45v128H0v-128q0-26 20.5-45t48.5-19z"
              />
            </svg>
          </div>
          <div className="stat-info">
            <h3>Guided</h3>
            <p>Skiathos Tour</p>
          </div>
        </div>
      </div>

      {/* Hot Offers Section */}
      <div className="section-title">
        <h2>Greek Island Package</h2>
        {/* <a
    href="#"
    style={{ color: "#d4af37", textDecoration: "none", fontWeight: 600 }}
  >
    View All
  </a> */}
      </div>

      <div className="offers-grid">
        {/* Offer 3 */}
        {/* <div className="offer-card ">
    <div
      className="offer-img"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1530&q=80')",
      }}
    >
      <div className="offer-badge">MEMBERS ONLY</div>
    </div>
    <div className="offer-content">
      <h3>Santorini Luxury Getaway</h3>
      <div className="offer-meta">
        <span>
          <i className="bi bi-calendar-event"></i> 5-7 Days
        </span>
        <span>
          <i className="bi bi-geo-alt"></i> Greece
        </span>
      </div>
      <div className="offer-price">
        $3,999      </div>
      <div className="offer-actions">
      <a href="https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package" className="newbtn newbtn-small">
          Details
        </a>
        <a href="https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package" className="newbtn newbtn-small newbtn-whatsapp">
          Book Now
        </a>
      </div>
    </div>
  </div> */}

        <a
          href="https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="offer-card">
            <div
              className="offer-img"
              style={{
                backgroundImage:
                  "url('https://cdn.pixabay.com/photo/2016/07/22/20/18/greece-1535702_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1530&q=80')",
              }}
            >
              <div className="offer-badge">MEMBERS ONLY</div>
            </div>
            <div className="offer-content">
              <h3>Skiathos Luxury Getaway</h3>
              <div className="offer-meta">
                <span>
                  <i className="bi bi-calendar-event"></i> 5-7 Days
                </span>
                <span>
                  <i className="bi bi-geo-alt"></i> Greece
                </span>
              </div>
              <div className="offer-price">$3,999</div>
              <div className="offer-actions">
                <span className="newbtn newbtn-small">Details</span>
                <span className="newbtn newbtn-small newbtn-whatsapp">
                  Book Now
                </span>
              </div>
            </div>
          </div>
        </a>

        {/* Offer 1 */}
        <div className="offer-card locked-offer">
          <div
            className="offer-img"
            style={{
              backgroundImage:
                "url('https://cdn.pixabay.com/photo/2018/03/19/14/55/pagoda-3240169_1280.jpg?ixlib=rb-4.0.3&auto=format&fit=crop&w=1486&q=80')",
            }}
          >
            <div className="offer-badge">LIMITED</div>
          </div>

          <div className="offer-content">
            <h3>Bali Luxury Retreat</h3>
            <div className="offer-meta">
              <span>
                <i className="bi bi-calendar-event"></i> 7 Days
              </span>
              <span>
                <i className="bi bi-geo-alt"></i> Indonesia
              </span>
            </div>
            <div className="offer-price">$5,999</div>
            <div className="offer-actions">
              <a
                href="https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package"
                target="_blank"
                rel="noopener noreferrer"
                className="newbtn newbtn-small"
              >
                Details
              </a>
              <a
                href="https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package"
                target="_blank"
                rel="noopener noreferrer"
                className="newbtn newbtn-small newbtn-whatsapp"
              >
                Book Now
              </a>
            </div>
          </div>
        </div>

        {/* Offer 2 */}
        <div className="offer-card locked-offer">
          <div
            className="offer-img"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
            }}
          >
            <div className="offer-badge">EXCLUSIVE</div>
          </div>
          <div className="offer-content">
            <h3>Maldives Paradise</h3>
            <div className="offer-meta">
              <span>
                <i className="bi bi-calendar-event"></i> 5 Days
              </span>
              <span>
                <i className="bi bi-geo-alt"></i> Maldives
              </span>
            </div>
            <div className="offer-price">$5,999</div>
            <div className="offer-actions">
              <a href="#" className="newbtn newbtn-small">
                Details
              </a>
              <a href="#" className="newbtn newbtn-small newbtn-whatsapp">
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Book Meeting Section */}
      <div className="booking-section">
        <div className="booking-header">
          <h2>Need Help With Your Greek Getaway?</h2>
          <p>
            Our travel experts are ready to help you plan your perfect Greek
            vacation
          </p>
        </div>

        <div className="booking-options">
          <div className="booking-card">
            <i className="bi bi-camera-video"></i>
            <h3>Video Call</h3>
            <p>Schedule a 1-on-1 video consultation with our travel expert</p>
            <a
              href="https://wa.me/9779709007758?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20video%20call%20about%20my%20travel%20plans"
              target="_blank"
              rel="noopener noreferrer"
              className="newbtn newbtn-small"
              style={{ marginTop: 15 }}
            >
              Book Now
            </a>
          </div>

          <div className="booking-card">
            <i className="bi bi-telephone"></i>
            <h3>Phone Call</h3>
            <p>Get immediate callback from our travel expert</p>
            <a
              href="https://wa.me/9779709007758?text=Hi%2C%20I%27d%20like%20a%20phone%20call%20to%20discuss%20my%20travel%20plans"
              target="_blank"
              rel="noopener noreferrer"
              className="newbtn newbtn-small"
              style={{ marginTop: 15 }}
            >
              Call Me
            </a>
          </div>

          <div className="booking-card">
            <i className="bi bi-whatsapp"></i>
            <h3>WhatsApp Chat</h3>
            <p>Instant messaging with our 24/7 support team</p>
            <a
              href="https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package"
              target="_blank"
              rel="noopener noreferrer"
              className="newbtn newbtn-small newbtn-whatsapp"
              style={{ marginTop: 15 }}
            >
              Chat Now
            </a>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <h3>Ready for Your Greek Adventure?</h3>
        <p style={{ margin: "20px 0" }}>
          Book now and get exclusive member benefits
        </p>
        <a
          href="https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package"
          target="_blank"
          rel="noopener noreferrer"
          className="newbtn newbtn-cta"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
            />
          </svg>{" "}
          BOOK VIA WHATSAPP
        </a>
      </div>
    </div>
  );
};

export default Newdashboard;
