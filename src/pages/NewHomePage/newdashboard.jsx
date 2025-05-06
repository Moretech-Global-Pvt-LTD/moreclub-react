import React from "react";
import "./newdashbord.css";
import TreasureGrid from "./TreasureModal";

const Newdashboard = () => {
  return (
    <div>
      {/* <div style={{ textAlign: "center" }}>
        <h1 className="treasurehunt-color">More Deals Club Treassure Hunt</h1>
        <p style={{ margin: "20px 0" }}>
          Unlock exclusive treasures Each treasure offers a unique adventure
          waiting to be discovered.
        </p>
      </div> */}

      <section class="treasure-intro">
        <h2>MORE DEALS CLUB TREASSURE HUNT</h2>
        <p>
          Unlock exclusive treasures with More Deals Club – win dream vacations,
          premium city deals in Stockholm, and up to 50% off as a member.
          Contact our treasure hunt team today!.
        </p>
        <a
          href="https://wa.me/9779709007758?text=I'm%20interested%20in%20the%20Greek%20Island%20Getaway"
          class="newbtn newbtn-small newbtn-whatsapp"
        >
          <i class="fab fa-whatsapp"></i>
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
          </svg>
          Contact Our Treassure Team
        </a>
      </section>

      {/* 
      

      {/* Hot Offers Section */}
      <TreasureGrid />


      <section className="booking-section" style={{ marginTop: 0 }}>
        <div className="booking-header">
          <h2>How to win trips and other treasures?</h2>
          <p>
            Follow these simple steps to enter our exclusive giveaway and you
            could be enjoying this luxury vacation for free!
          </p>
        </div>

        <div className="booking-options">
          <div className="booking-card">
            <i className="bi bi-user"></i>
            <h3>Step 1: Refer Friends</h3>
            <p>Refer at least 2 friends or family members to the platform</p>
          </div>

          <div className="booking-card">
            <i className="bi bi-utensils"></i>
            <h3>Step 2: Take Part Of Deals</h3>
            <p>
            Contact directly with our Treasure Hunt team
            </p>
          </div>

          <div className="booking-card">
           
            <h3>Step 3: Qualified</h3>
            <p>
              You're now officially qualified to win a trip to one of our
              amazing destinations — As a member, you're in the
              treasure paradise
            </p>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 30 }}>
          <a
            href="https://wa.me/9779709007758?text=I%20want%20to%20participate%20in%20the%20free%20trip%20giveaway"
            class="newbtn newbtn-small newbtn-whatsapp"
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
            </svg>
            Contact Our Treassure Team
          </a>
        </div>
      </section>

      <div className="section-title">
        <h2>Unlock Food Treasure</h2>
        <p>
          Book catering or restaurant deals from our partners at{" "}
          <a
            href="https://morefood.se"
            target="_blank"
            rel="noopener noreferrer"
          >
            morefood.se
          </a>
        </p>
      </div>

      <div className="treasure-grid">
        <div className="treasure-card">
          <div
            className="treasure-img"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
            }}
          >
            <div className="treasure-badge">More Deals Offer</div>
          </div>
          <div className="treasure-content">
            <h3>Premium Catering Service</h3>
            <div className="treasure-meta">
              <span>
                <i className="bi bi-utensils"></i> 50+ Guests
              </span>
              <span>
                <i className="bi bi-geo-alt"></i> Stockholm
              </span>
            </div>
            <div className="treasure-price">
              Catering up to 30% off <span>Catering up to 10% off</span>
            </div>
            <div className="treasure-features">
              <div className="treasure-feature">
                <i className="bi bi-check"></i>
                <span className="text-dynamic-white">Gourmet menu options</span>
              </div>
              <div className="treasure-feature">
                <i className="bi bi-check"></i>
                <span className="text-dynamic-white">
                  Professional service staff
                </span>
              </div>
            </div>
            <a
              href="https://wa.me/9779709007758?text=I%20want%20more%20information%20about%20catering%20services%20for%20my%20event"
              className="newbtn newbtn-small newbtn-whatsapp"
              style={{ width: "100%" }}
            >
              Contact Our Catering Team
            </a>
          </div>
        </div>

        <div className="treasure-card">
          <div
            className="treasure-img"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')",
            }}
          >
            <div className="treasure-badge">More Deals Offer</div>
          </div>
          <div className="treasure-content">
            <h3>Restaurant Deals</h3>
            <div className="treasure-meta">
              <span>
                <i className="fas fa-hamburger"></i> Dining
              </span>
              <span>
                <i className="fas fa-map-marker-alt"></i> Multiple Locations
              </span>
            </div>
            <div className="treasure-price">
              up to 30% off <span>up to 10% off</span>
            </div>
            {/* Uncomment this if needed */}
            {/* <div className="treasure-features">
        <div className="treasure-feature">
          <i className="fas fa-check"></i>
          <span>Signature burger + fries</span>
        </div>
        <div className="treasure-feature">
          <i className="fas fa-check"></i>
          <span>Free drink included</span>
        </div>
      </div> */}
            <a
              href="https://wa.me/9779709007758?text=I%20want%20to%20order%20in%20the%20More%20Food%20deal"
              className="newbtn newbtn-small newbtn-whatsapp"
              style={{ width: "100%" }}
            >
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="section-title">
        <h2>Unlock Salon Treasure</h2>
        <p>Book premium salon services from our trusted partners</p>
      </div>

      <div className="treasure-grid">
        <div className="treasure-card">
          <div
            className="treasure-img"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1588&q=80')",
            }}
          >
            <div className="treasure-badge">Treatments</div>
          </div>
          <div className="treasure-content">
            <h3>Complete Hair Makeover</h3>
            <div className="treasure-meta">
              <span>
                <i className="fas fa-scissors"></i> Cut & Color
              </span>
              <span>
                <i className="fas fa-map-marker-alt"></i> Premium Salons
              </span>
            </div>
            <div className="treasure-price">
              up to 50% off <span>up to 20% off</span>
            </div>
            <div className="treasure-features">
              <div className="treasure-feature">
                <i className="bi bi-check"></i>
                <span className="text-dynamic-white">
                  Professional consultation
                </span>
              </div>
              <div className="treasure-feature">
                <i className="bi bi-check"></i>
                <span className="text-dynamic-white">
                  Premium Hair Treatment
                </span>
              </div>
            </div>
            <button className="newbtn newbtn-small newbtn-whatsapp" style={{ width: "100%" }}>
              Book Now
            </button>
          </div>
        </div>

        <div className="treasure-card">
          <div
            className="treasure-img"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
            }}
          >
            <div className="treasure-badge">SPA DAY</div>
          </div>
          <div className="treasure-content">
            <h3>Luxury Spa Package</h3>
            <div className="treasure-meta">
              <span>
                <i className="fas fa-spa"></i> Up to 3 Hours
              </span>
              <span>
                <i className="fas fa-map-marker-alt"></i> Top Rated Spas
              </span>
            </div>
            <div className="treasure-price">
              up to 50% off <span>up to 20% off</span>
            </div>
            <div className="treasure-features">
              <div className="treasure-feature">
                <i className="bi bi-check"></i>
                <span className="text-dynamic-white">Massage + facial</span>
              </div>
              <div className="treasure-feature">
                <i className="bi bi-check"></i>
                <span className="text-dynamic-white">
                  Access to relaxation areas
                </span>
              </div>
            </div>
            <button className="newbtn newbtn-small newbtn-whatsapp" style={{ width: "100%" }}>
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Book Meeting Section */}
      <div className="booking-section">
        <div className="booking-header">
          <h2>Ready to Unlock Your Dream Treasure?</h2>
          <p>
            Our Treasure hunt experts are standing by to help you plan the
            perfect getaway. Choose your preferred contact method below.
          </p>
        </div>

        <div className="booking-options">
          <div className="booking-card">
            <i className="bi bi-camera-video"></i>
            <h3>Video Consultation</h3>
            <p>Talk to our Treasure Hunt team</p>
            <a
              href="https://wa.me/9779709007758?text=Hi%2C%20I%27d%20like%20to%20schedule%20a%20video%20call%20about%20my%20travel%20plans"
              target="_blank"
              rel="noopener noreferrer"
              className="newbtn newbtn-small newbtn-whatsapp"
              style={{ marginTop: 15 }}
            >
              Book Now
            </a>
          </div>

          <div className="booking-card">
            <i className="bi bi-telephone"></i>
            <h3>Phone Call</h3>
            <p>Speak directly with our Treasure Hunt team</p>
            <a
              href="https://wa.me/9779709007758?text=Hi%2C%20I%27d%20like%20a%20phone%20call%20to%20discuss%20my%20travel%20plans"
              target="_blank"
              rel="noopener noreferrer"
              className="newbtn newbtn-small newbtn-whatsapp"
              style={{ marginTop: 15 }}
            >
              Call Me
            </a>
          </div>

          <div className="booking-card">
            <i className="bi bi-whatsapp"></i>
            <h3>WhatsApp Chat</h3>
            <p>Instant messaging with our 24/7 Treasure Hunt team</p>
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
        <h3>Join the treasure hunt today!</h3>
        <p style={{ margin: "20px 0" }}>
          Limited Availability - Join the Treasure Hunt Today!
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
