
import './user-dashboard.css';

export const NavigationLinks = () => (
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