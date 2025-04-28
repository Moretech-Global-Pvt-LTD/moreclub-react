import React from 'react';
import './user-dashboard.css';

const UserDashboard = () => {
  return (
    <div className="user-dashboard-container">
      <div className="user-dashboard-dashboard">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
};

const Sidebar = () => (
  <div className="user-dashboard-sidebar">
    <Profile />
    <NavigationLinks />
    <ReferralBox />
  </div>
);

const Profile = () => (
  <div className="user-dashboard-profile">
    <img
      src="https://randomuser.me/api/portraits/men/32.jpg"
      alt="Profile"
      className="user-dashboard-profile-img"
    />
    <h3>John D.</h3>
    <p>Gold Member</p>
  </div>
);

const NavigationLinks = () => (
  <ul className="user-dashboard-nav-links">
    <li><a href="#" className="active"><i className="fas fa-home"></i> Dashboard</a></li>
    <li><a href="#"><i className="fas fa-suitcase"></i> My Trips</a></li>
    <li><a href="#"><i className="fas fa-gem"></i> Exclusive Offers</a></li>
    <li><a href="#"><i className="fas fa-users"></i> Refer Friends</a></li>
    <li><a href="#"><i className="fas fa-calendar-alt"></i> Book Meeting</a></li>
    <li><a href="#"><i className="fas fa-cog"></i> Settings</a></li>
    <li><a href="#"><i className="fas fa-sign-out-alt"></i> Logout</a></li>
  </ul>
);

const ReferralBox = () => (
  <div className="user-dashboard-referral-box">
    <h4>Your Referral Link</h4>
    <div className="user-dashboard-referral-link">https://moredealsclub.com/ref/johndoe123</div>
    <button className="user-dashboard-btn user-dashboard-btn-small" style={{ width: '100%' }}>Copy Link</button>
  </div>
);

const MainContent = () => (
  <div className="user-dashboard-main-content">
    <DashboardHeader />
    <StatsCards />
    <HotOffers />
    <BookingSection />
    <CallToAction />
  </div>
);

const DashboardHeader = () => (
  <div className="user-dashboard-dashboard-header">
    <h1>Welcome Back, John!</h1>
    <div className="user-dashboard-alert">
      <i className="fas fa-gift" /> You're 1 referral away from a free trip!
    </div>
  </div>
);

const StatsCards = () => (
  <div className="user-dashboard-stats-cards">
    <StatCard icon="plane" count={3} label="Upcoming Trips" />
    <StatCard icon="users" count={5} label="Referrals" />
    <StatCard icon="coins" count={1250} label="Reward Points" />
    <StatCard icon="percentage" count={50} label="Current Discount" />
  </div>
);

const StatCard = ({ icon, count, label }) => (
  <div className="user-dashboard-stat-card">
    <div className="user-dashboard-stat-icon">
      <i className={`fas fa-${icon}`}></i>
    </div>
    <div className="user-dashboard-stat-info">
      <h3>{count}</h3>
      <p>{label}</p>
    </div>
  </div>
);

const HotOffers = () => (
  <>
    <div className="user-dashboard-section-title">
      <h2>Hot Travel Offers</h2>
      <a href="#" style={{ color: '#d4af37' }}>View All</a>
    </div>

    <div className="user-dashboard-offers-grid">
      <OfferCard
        title="Bali Luxury Retreat"
        days="7 Days"
        location="Indonesia"
        price="$1,299"
        oldPrice="$2,599"
        badge="LIMITED"
        image="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1486&q=80"
      />
      <OfferCard
        title="Maldives Paradise"
        days="5 Days"
        location="Maldives"
        price="$2,199"
        oldPrice="$4,399"
        badge="EXCLUSIVE"
        image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
      />
      <OfferCard
        title="Santorini Getaway"
        days="6 Days"
        location="Greece"
        price="$1,599"
        oldPrice="$3,199"
        badge="MEMBERS ONLY"
        image="https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1530&q=80"
      />
    </div>
  </>
);

const OfferCard = ({ title, days, location, price, oldPrice, badge, image }) => (
  <div className="user-dashboard-offer-card">
    <div className="user-dashboard-offer-img" style={{ backgroundImage: `url(${image})` }}>
      <div className="user-dashboard-offer-badge">{badge}</div>
    </div>
    <div className="user-dashboard-offer-content">
      <h3>{title}</h3>
      <div className="user-dashboard-offer-meta">
        <span><i className="fas fa-calendar-alt"></i> {days}</span>
        <span><i className="fas fa-map-marker-alt"></i> {location}</span>
      </div>
      <div className="user-dashboard-offer-price">{price} <span>{oldPrice}</span></div>
      <div className="user-dashboard-offer-actions">
        <a href="#" className="user-dashboard-btn user-dashboard-btn-small">Details</a>
        <a href="#" className="user-dashboard-btn user-dashboard-btn-small user-dashboard-btn-whatsapp">Book Now</a>
      </div>
    </div>
  </div>
);

const BookingSection = () => (
  <div className="user-dashboard-booking-section">
    <div className="user-dashboard-booking-header">
      <h2>Need Personalized Assistance?</h2>
      <p>Our travel experts are ready to help you plan your perfect vacation</p>
    </div>
    <div className="user-dashboard-booking-options">
      <BookingCard icon="video" title="Video Call" description="Schedule a 1-on-1 video consultation with our travel designer" />
      <BookingCard icon="phone-alt" title="Phone Call" description="Get immediate callback from our travel specialist" />
      <BookingCard icon="whatsapp" title="WhatsApp Chat" description="Instant messaging with our 24/7 support team" />
    </div>
  </div>
);

const BookingCard = ({ icon, title, description }) => (
  <div className="user-dashboard-booking-card">
    <i className={`fas fa-${icon}`}></i>
    <h3>{title}</h3>
    <p>{description}</p>
    <a href="#" className="user-dashboard-btn user-dashboard-btn-small" style={{ marginTop: '15px' }}>Book Now</a>
  </div>
);

const CallToAction = () => (
  <div className="user-dashboard-call-to-action">
    <h3>Ready for Your Next Adventure?</h3>
    <p>Get 50% off your next trip when you refer 2 friends</p>
    <a href="#" className="user-dashboard-btn user-dashboard-btn-cta">Refer Friends & Earn Rewards</a>
  </div>
);

export default UserDashboard;