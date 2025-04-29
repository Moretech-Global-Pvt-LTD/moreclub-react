import React from "react";
import './newdashbord.css';
import { useSelector } from "react-redux";

const Newdashboard = () => {

    const user = useSelector((state) => state.userReducer);

  return (
    <div>

<div className="newdashboard-header">
  <h1>Welcome Back, {user?.user?.first_name}!</h1>
  <div
    className="alert text-dynamic-white"
    style={{
      background: "rgba(212, 175, 55, 0.1)",
      padding: "10px 15px",
      borderRadius: "8px",
    }}
  >
    <i className="bi bi-gift" style={{ color: "#d4af37" }}></i> You're 1 referral away from a free trip!
  </div>
</div>

{/* Stats Cards */}
<div className="stats-cards">
  <div className="stat-card">
    <div className="stat-icon">
      <i className="bi bi-airplane"></i>
    </div>
    <div className="stat-info">
      <h3>3</h3>
      <p>Upcoming Trips</p>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon">
      <i className="bi bi-people"></i>
    </div>
    <div className="stat-info">
      <h3>5</h3>
      <p>Referrals</p>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon">
      <i className="bi bi-currency-dollar"></i>
    </div>
    <div className="stat-info">
      <h3>1,250</h3>
      <p>Reward Points</p>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon">
      <i className="bi bi-percent"></i>
    </div>
    <div className="stat-info">
      <h3>50%</h3>
      <p>Current Discount</p>
    </div>
  </div>
</div>

{/* Hot Offers Section */}
<div className="section-title">
  <h2>Hot Travel Offers</h2>
  <a
    href="#"
    style={{ color: "#d4af37", textDecoration: "none", fontWeight: 600 }}
  >
    View All
  </a>
</div>

<div className="offers-grid">
  {/* Offer 1 */}
  <div className="offer-card">
    <div
      className="offer-img"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1486&q=80')",
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
      <div className="offer-price">
        $1,299 <span>$2,599</span>
      </div>
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

  {/* Offer 2 */}
  <div className="offer-card">
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
      <div className="offer-price">
        $2,199 <span>$4,399</span>
      </div>
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

  {/* Offer 3 */}
  <div className="offer-card">
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
      <h3>Santorini Getaway</h3>
      <div className="offer-meta">
        <span>
          <i className="bi bi-calendar-event"></i> 6 Days
        </span>
        <span>
          <i className="bi bi-geo-alt"></i> Greece
        </span>
      </div>
      <div className="offer-price">
        $1,599 <span>$3,199</span>
      </div>
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
    <h2>Need Personalized Assistance?</h2>
    <p>Our travel experts are ready to help you plan your perfect vacation</p>
  </div>

  <div className="booking-options">
    <div className="booking-card">
      <i className="bi bi-camera-video"></i>
      <h3>Video Call</h3>
      <p>Schedule a 1-on-1 video consultation with our travel designer</p>
      <a href="#" className="newbtn newbtn-small" style={{ marginTop: 15 }}>
        Book Now
      </a>
    </div>

    <div className="booking-card">
      <i className="bi bi-telephone"></i>
      <h3>Phone Call</h3>
      <p>Get immediate callback from our travel specialist</p>
      <a href="#" className="newbtn newbtn-small" style={{ marginTop: 15 }}>
        Call Me
      </a>
    </div>

    <div className="booking-card">
      <i className="bi bi-whatsapp"></i>
      <h3>WhatsApp Chat</h3>
      <p>Instant messaging with our 24/7 support team</p>
      <a
        href="https://wa.me/1234567890?text=Hi%20Treasure%20Hunt%20Travel%20Team,%20I%20need%20help%20with%20my%20booking"
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
  <h3>Ready for Your Next Adventure?</h3>
  <p style={{ margin: "20px 0" }}>
    Get 50% off your next trip when you refer 2 friends
  </p>
  <a href="#" className="newbtn newbtn-cta">
    Refer Friends & Earn Rewards
  </a>
</div>

</div>

  );
};

export default Newdashboard;
