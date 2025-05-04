import React from "react";
import "./newuserdashboard.css";

const NewUserDashboard = () => {
  return (
    <div className="new-user-treasure-hunt-container">
      <section className="new-user-main-section">
        <h1 className="new-user-main-title">More Deals Club Treasure Hunt</h1>
        <p className="new-user-desc">
          Unlock exclusive treasures Each treasure offers a unique adventure
          waiting to be discovered.
        </p>
      </section>

      <header className="new-user-hero-section">
        <h2 className="new-user-title">More Deals Club Treasure Hunt</h2>
        <p className="new-user-desc">
          Unlock exclusive treasures with the More Deals Club – win dream
          vacations, premium city deals in Stockholm, and epic sorts of fun
          adventures.
        </p>
        <button className="new-user-contact-btn green">
          Contact Our Treasures Team
        </button>
      </header>

      <section className="new-user-prize-cards">
        <div className="new-user-card">
          <div className="new-user-card-image new-user-card-image-greece"></div>
          <span className="new-user-badge">UNLOCKED</span>
          <div className=" new-user-card-body">
            <h3>Greek Island Getaway</h3>
            <div className="new-user-card-info">
              <p className="icon-calendar">5-7 Days</p>
              <p className="icon-location">Skiathos, Greece</p>
            </div>
            <h4>Win a trip, valued at €1,500</h4>
            <ul>
              <li className="icon-accommodation">Luxury villa accommodation</li>
              <li className="icon-cruise">Island cruise</li>
            </ul>
            <button>View Treasure</button>
          </div>
        </div>

        <div className="new-user-card">
          <div className="new-user-card-image new-user-card-image-nepal"></div>
          <div className=" new-user-card-body">
            <h3>Hidden Treasure</h3>
            <p>Unlock this treasure to reveal an exclusive travel package.</p>
            <button>Unlock Treasure</button>
          </div>
        </div>

        <div className="new-user-card">
          <div className="new-user-card-image new-user-card-image-maldives"></div>
          <div className=" new-user-card-body">
            <h3>Hidden Treasure</h3>
            <p>Unlock this treasure to reveal an exclusive travel package.</p>
            <button>Unlock Treasure</button>
          </div>
        </div>
      </section>

      <section className="new-user-steps-section">
        <h2>How to win trips and other treasures?</h2>
        <p>
          Follow these simple steps to enter our exclusive giveaway and you
          could be enjoying this luxury vacation for free!
        </p>
        <div className="new-user-steps">
          <div className="new-user-step step-one">
            <h4>Step 1: Refer Friends</h4>
            <p>Refer at least 2 friends or family members to the platform</p>
          </div>
          <div className="new-user-step step-two">
            <h4>Step 2: Take Part Of Deals</h4>
            <p>
              Get the best deals on food, salons & other services from our
              partners
            </p>
          </div>
          <div className="new-user-step step-three">
            <h4>Step 3: Qualified</h4>
            <p>
              You're now officially qualified to win a trip to one of our
              amazing destinations — As a member, you're in the treasure
              paradise
            </p>
          </div>
        </div>
        <button className="new-user-contact-btn green">
          Contact Our Treasures Team
        </button>
      </section>

      <section className="new-user-offer-section">
        <h2>Unlock Food Treasure</h2>
        <p>
          Book catering or restaurant deals from our partners at morefood.se
        </p>
        <div className="new-user-offer-cards">
          <div className="new-user-offer-card">
            <div className="new-user-offer-card-image new-user-offer-card-image-catering "></div>
            <span className="new-user-badge special">SPECIAL OFFER</span>
            <div className="new-user-card-body">
              <h3>Premium Catering Service</h3>
              <div className="new-user-card-info">
                <p className="icon-cutlery">50+ Guests</p>
                <p className="icon-location-gray">Stockholm</p>
              </div>
              <h4>Catering up to 30% off</h4>
              <ul>
                <li className="icon-tick">Gourmet menu options</li>
                <li className="icon-tick">Professional service staff</li>
              </ul>
              <button>Contact Our Catering Team</button>
            </div>
          </div>

          <div className="new-user-offer-card">
            <div className="new-user-offer-card-image new-user-offer-card-image-booburgers "></div>
            <span className="new-user-badge special">LIMITED TIME</span>
            <div className="new-user-card-body">
              <h3>Boo Burgers Deal</h3>
              <div className="new-user-card-info">
                <p className="icon-burger">Burger Meal</p>
                <p className="icon-location-gray">Multiple Locations</p>
              </div>
              <h4>Up to 20% off </h4>
              <ul>
                <li className="icon-tick">Signature burger + fries</li>
                <li className="icon-tick">Free drink included</li>
              </ul>
              <button>Order via WhatsApp</button>
            </div>
          </div>
        </div>
      </section>

      <section className="new-user-offer-section">
        <h2>Unlock Salon Treasure</h2>
        <p>Book premium salon services from our trusted partners</p>
        <div className="new-user-offer-cards">
          <div className="new-user-offer-card">
            <div className="new-user-offer-card-image new-user-offer-card-image-hair"></div>
            <span className="new-user-badge special">NEW CLIENTS</span>
            <div className="new-user-card-body">
              <h3>Complete Hair Makeover</h3>
              <div className="new-user-card-info">
                <p className="icon-scissor">Cut & Color</p>
                <p className="icon-location-gray">Premium Salons</p>
              </div>
              <h4>Up to 50% off </h4>
              <ul>
                <li className="icon-tick">Professional consultation</li>
                <li className="icon-tick">Premium Hair Treatment</li>
              </ul>
              <button>Book Now</button>
            </div>
          </div>
          <div className="new-user-offer-card">
            <div className="new-user-offer-card-image new-user-offer-card-image-spa"></div>
            <span className="new-user-badge special">SPA DAY</span>
            <div className="new-user-card-body">
              <h3>Luxury Spa Package</h3>
              <div className="new-user-card-info">
                <p className="icon-spa">3 Hours</p>
                <p className="icon-location-gray">Top Rated Spas</p>
              </div>
              <h4>Up to 50% off </h4>
              <ul>
                <li className="icon-tick">Massage + facial</li>
                <li className="icon-tick">Access to relaxation areas</li>
              </ul>
              <button>Book Spa Day</button>
            </div>
          </div>
        </div>
      </section>

      <section className="new-user-steps-section">
        <h2>Ready to Unlock Your Dream Treasure?</h2>
        <p>
          Our Treasure hunt experts are standing by to help you plan the perfect
          getaway. Choose your preferred contact method below.
        </p>
        <div className="new-user-steps">
          <div className="new-user-step step-video">
            <h4>Video Consultation</h4>
            <p>Talk to our Treasure Hunt team</p>
            <button className="new-user-contact-method-btn brown">
              Book Now
            </button>
          </div>
          <div className="new-user-step step-phone">
            <h4>Phone Call</h4>
            <p>Speak directly with our Treasure Hunt team</p>
            <button className="new-user-contact-method-btn brown">
              Call Now
            </button>
          </div>
          <div className="new-user-step step-whatsapp">
            <h4>WhatsApp</h4>
            <p>Instant messaging with our 24/7 Treasure Hunt team</p>
            <button className="new-user-contact-method-btn green">
              Chat Now
            </button>
          </div>
        </div>
      </section>
      <section className="new-user-footer">
        <h3>Join the treasure hunt today!</h3>
        <p>Limited Availability - Join the Treasure Hunt Today!</p>
        <button className="new-user-contact-btn gold">
          Chat Now via WhatsApp
        </button>
      </section>
    </div>
  );
};

export default NewUserDashboard;
