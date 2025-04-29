import React, { useEffect, useRef } from 'react';
import './newhome.css';
import { Link } from 'react-router-dom';

const TreasureHunt = () => {
    useEffect(() => {
        const navbar = document.getElementById('navbar');
        const sections = document.querySelectorAll('section');
        const links = document.querySelectorAll('.treasure-nav-links li a');
    
        // Create an Intersection Observer to watch sections
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const id = entry.target.id;
              const link = document.querySelector(`a[href="#${id}"]`);
    
              // Ensure the link exists before manipulating it
              if (link) {
                if (entry.isIntersecting) {
                  link.classList.add('active'); // Highlight the link when section is in view
                } else {
                  link.classList.remove('active'); // Remove highlight when section goes out of view
                }
              }
            });
          },
          {
            threshold: 0.5, // Trigger when 50% of the section is in the viewport
          }
        );
    
        // Start observing each section
        sections.forEach((section) => {
          observer.observe(section);
        });
    
        // Handle navbar position when scrolling
        const handleScroll = () => {
          if (window.scrollY > navbar.offsetTop) {
            navbar.classList.add('fixed'); // Add fixed class when navbar reaches top
          } else {
            navbar.classList.remove('fixed'); // Remove fixed class when back to normal
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        return () => {
          window.removeEventListener('scroll', handleScroll);
          sections.forEach((section) => {
            observer.unobserve(section); // Clean up observer on component unmount
          });
        };
      }, []);
    

  return (
    <div className='position-relative'>
      {/* Hero Section */}
      <header className="treasure-hero">
        <div className="treasure-hero-content">
          <h1>Treasure Hunt Travel Adventures</h1>
          <p>Win exotic vacations by becoming a member and referring friends</p>
          <Link to="login" className="treasure-btn">Join Now - Get 50% Off First Trip</Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="treasure-navbar" id="navbar">
        <div className="treasure-container d-flex align-items-center justify-content-between">
          <a href="#" className="treasure-logo">Treasure Hunt</a>
          <ul className="treasure-nav-links">
          <li><a href="#about">About</a></li>
            <li><a href="#benefits">Benefits</a></li>
            <li><a href="#destinations">Destinations</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><Link to="/login" className="treasure-btn treasure-btn-small">Member Login</Link></li>
          </ul>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="treasure-section">
        <div className="treasure-container">
          <h2>Unlock World Travel Rewards</h2>
          <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            Our exclusive travel club offers members the chance to win dream vacations to exotic destinations. 
            Earn points for referrals and unlock incredible discounts up to 50% on luxury getaways. 
            With just 2 successful referrals, you become eligible for our grand prize drawings.
          </p>
        </div>
      </section>

      {/* Membership Benefits */}
      <section id="benefits" className="treasure-section treasure-dark-bg">
        <div className="treasure-container">
          <h2>Member Benefits</h2>
          <div className="treasure-benefits">
            {[
              { icon: 'fas fa-gem', title: 'Exclusive Deals', desc: 'Access to members-only pricing with discounts up to 50% on all travel packages' },
              { icon: 'fas fa-trophy', title: 'Win Free Trips', desc: 'Eligibility for our monthly vacation giveaways when you refer 2 friends' },
              { icon: 'fas fa-globe-americas', title: 'Global Network', desc: 'Premium access to our worldwide network of luxury resorts and experiences' },
              { icon: 'fas fa-concierge-bell', title: 'VIP Treatment', desc: 'Personalized travel concierge service for all your vacation planning needs' }
            ].map((benefit, index) => (
              <div className="treasure-benefit" key={index}>
                <i className={benefit.icon}></i>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Destinations Section */}
      <section id="destinations" className="treasure-section">
        <div className="treasure-container">
          <h2>Exotic Destinations</h2>
          <p style={{ textAlign: 'center', marginBottom: '40px' }}>
            These could be your next dream vacations
          </p>
          <div className="treasure-destinations-grid">
            {[
              { className: 'treasure-destination-card treasure-greece', title: 'Greek Island Getaway', price: '$1,299', features: ['7-day luxury villa stay', 'Private yacht cruise', 'Ancient ruins tour', 'Gourmet dining experience'] },
              { className: 'treasure-destination-card treasure-nepal', title: 'Himalayan Adventure', price: '$1,599', features: ['10-day guided trek', 'Luxury mountain lodges', 'Cultural immersion', 'Spa retreat included'] },
              { className: 'treasure-destination-card treasure-maldives', title: 'Maldives Paradise', price: '$2,199', features: ['Overwater bungalow', 'All-inclusive luxury', 'Private island dining', 'Scuba diving package'] },
              { className: 'treasure-destination-card treasure-thailand', title: 'Thai Luxury Escape', price: '$1,499', features: ['5-star beach resort', 'Elephant sanctuary visit', 'Private chef experience', 'Island hopping tour'] }
            ].map((destination, index) => (
              <div
                key={index}
                className={destination.className}
                onClick={() => window.location.href='https://www.moredealsclub.com/login'}
              >
                <div className="treasure-destination-content">
                  <h3>{destination.title}</h3>
                  <ul>
                    {destination.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <a href="https://www.moredealsclub.com/login" className="treasure-btn treasure-btn-small treasure-pulse">
                    Member Price: {destination.price}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="treasure-section treasure-dark-bg">
        <div className="treasure-container">
          <h2>How To Win Your Dream Vacation</h2>
          <div className="treasure-steps">
            {[
              { number: '1', title: 'Become a Member', desc: 'Sign up for our exclusive travel club to access member benefits' },
              { number: '2', title: 'Refer Friends', desc: 'Share your unique referral link with at least 2 friends who join' },
              { number: '3', title: 'Earn Eligibility', desc: 'With 2 successful referrals, you qualify for prize drawings' },
              { number: '4', title: 'Win & Travel', desc: 'Selected winners receive all-expense paid luxury vacations' }
            ].map((step, index) => (
              <div className="treasure-step" key={index}>
                <div className="treasure-step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <a href="https://www.moredealsclub.com/login" className="treasure-btn">Start Your Journey Now</a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="treasure-section">
        <div className="treasure-container">
          <h2>Our Happy Travelers</h2>
          <div className="treasure-testimonials">
            {[
              { img: 'https://randomuser.me/api/portraits/women/32.jpg', name: 'Sarah J.', title: 'Maldives Winner', quote: 'Thanks to Treasure Hunt, we enjoyed a Maldives vacation at half the regular price. The overwater bungalow was beyond our dreams!' },
              { img: 'https://randomuser.me/api/portraits/men/45.jpg', name: 'Michael T.', title: 'Gold Member', quote: 'I never thought I could afford a luxury Greek vacation. With my member discount and bonus points, it became reality!' },
              { img: 'https://randomuser.me/api/portraits/women/68.jpg', name: 'Priya K.', title: 'Thailand Winner', quote: 'After referring just 3 friends, I won an all-expense paid trip to Thailand. The entire experience was magical!' }
            ].map((testimonial, index) => (
              <div className="treasure-testimonial" key={index}>
                <div className="treasure-testimonial-content">
                  <p>"{testimonial.quote}"</p>
                  <div className="treasure-testimonial-author">
                    <img src={testimonial.img} alt={testimonial.name} />
                    <div>
                      <h4>{testimonial.name}</h4>
                      <p>{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="treasure-section treasure-dark-bg">
        <div className="treasure-container">
          <h2>Talk To Our Travel Experts</h2>
          <p style={{ textAlign: 'center', marginBottom: '40px' }}>
            Have questions? Our concierge team is ready to help plan your perfect getaway
          </p>
          <form className="treasure-contact-form">
            <input type="text" placeholder="Your Name" />
            <input type="email" placeholder="Your Email" />
            <input type="tel" placeholder="Phone Number" />
            <textarea placeholder="Your Travel Dreams..."></textarea>
            <button type="submit" className="treasure-btn">Get Personalized Offers</button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="treasure-container">
          <h3>Treasure Hunt Travel Adventures</h3>
          <p>Unlocking the world's greatest travel experiences for our members</p>
          <div className="treasure-social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-pinterest"></i></a>
          </div>
          <p style={{ marginTop: '30px' }}>
            &copy; 2023 moredealsclub.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TreasureHunt;
