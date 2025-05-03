import React, { useEffect, useRef } from "react";
import "./newhome.css";
import { Link } from "react-router-dom";

const TreasureHunt = () => {
  useEffect(() => {
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll(".treasure-nav-links li a");

    // Create an Intersection Observer to watch sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id;
          const link = document.querySelector(`a[href="#${id}"]`);

          // Ensure the link exists before manipulating it
          if (link) {
            if (entry.isIntersecting) {
              link.classList.add("active"); // Highlight the link when section is in view
            } else {
              link.classList.remove("active"); // Remove highlight when section goes out of view
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
        navbar.classList.add("fixed"); // Add fixed class when navbar reaches top
      } else {
        navbar.classList.remove("fixed"); // Remove fixed class when back to normal
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => {
        observer.unobserve(section); // Clean up observer on component unmount
      });
    };
  }, []);

  return (
    <div className="position-relative">
      <a
  href="https://wa.me/9779709007758?text=I'm%20interested%20in%20the%20Greek%20Island%20Getaway%20package"
  className="whatsapp-button"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Chat on WhatsApp"
>
  {/* Replace below with your preferred WhatsApp SVG */}
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M20.52 3.48A11.8 11.8 0 0012 0a11.87 11.87 0 00-10 18.35L0 24l5.83-1.9A11.87 11.87 0 0012 24a11.86 11.86 0 008.52-20.52zM12 21.5a9.6 9.6 0 01-4.9-1.34l-.35-.21-3.45 1.13 1.13-3.36-.22-.34A9.63 9.63 0 1112 21.5zm5.27-7.68c-.29-.15-1.73-.85-1.99-.95s-.46-.15-.65.15-.75.94-.92 1.13-.34.22-.63.07a7.85 7.85 0 01-2.32-1.43 8.79 8.79 0 01-1.63-2.03c-.17-.3 0-.47.13-.61s.29-.34.44-.51a2.09 2.09 0 00.29-.48.56.56 0 000-.52c-.07-.15-.65-1.58-.89-2.17s-.46-.47-.65-.47h-.56a1.09 1.09 0 00-.8.38 3.36 3.36 0 00-1 2.51A5.91 5.91 0 0010 15.62a5.55 5.55 0 003.11.91h.12a5.17 5.17 0 003.42-2.06c.24-.34.24-.64.17-.76s-.27-.23-.55-.37z" />
  </svg>
</a>

      {/* Hero Section */}
      <header className="treasure-hero">
        <div className="treasure-hero-content">
          <h1 className="treasurehunt-color">More Deals Treassure Hunt</h1>
          <p>Win Exclusive Trip To Skiathos Greece</p>
          <Link to="register-membership" className="treasure-btn text-black">
            Join Now
          </Link>
        </div>
      </header>

      {/* Navigation */}
      <nav className="treasure-navbar" id="navbar">
        <div className="treasure-container d-flex align-items-center justify-content-between">
          <a href="#" className="treasure-logo treasurehunt-color">
            Greek Getaway
          </a>
          <ul className="treasure-nav-links">
            
            <li>
              <a href="#benefits">Benefits</a>
            </li>
            <li>
              <a href="#destinations">Package Details</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
            <li>
              {/* <Link to="/login" className="treasure-btn treasure-btn-small">
                Member Login
              </Link> */}
              <a
                        href="https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package"
                        className="treasure-btn treasure-btn-small treasure-pulse text-black newbtn-whatsapp me-auto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                          />
                        </svg>{" "}
                        Book Now
                      </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="treasure-section">
        <div className="treasure-container">
          <h2>Exclusive Greek Island Experience</h2>
          <p
            style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
          >
            Our Greek Island Getaway is the perfect blend of luxury and
            adventure. Enjoy 5-7 days in a private villa with breathtaking
            views, Island Cruise, guided tours of Skiathos and gourmet dining
            experiences. This exclusive package is currently the only one
            available, with more destinations coming soon.
          </p>
        </div>
      </section>

      {/* Membership Benefits */}
      {/* <section id="benefits" className="treasure-section treasure-dark-bg">
        <div className="treasure-container">
          <h2>Member Benefits</h2>
          <div className="treasure-benefits">
            {[
              {
                icon: "fas fa-gem",
                title: "Exclusive Deals",
                desc: "Access to members-only pricing with discounts up to 50% on all travel packages",
              },
              {
                icon: "fas fa-trophy",
                title: "Win Free Trips",
                desc: "Eligibility for our monthly vacation giveaways when you refer 2 friends",
              },
              {
                icon: "fas fa-globe-americas",
                title: "Global Network",
                desc: "Premium access to our worldwide network of luxury resorts and experiences",
              },
              {
                icon: "fas fa-concierge-bell",
                title: "VIP Treatment",
                desc: "Personalized travel concierge service for all your vacation planning needs",
              },
            ].map((benefit, index) => (
              <div className="treasure-benefit" key={index}>
                <i className={benefit.icon}></i>
                <h3>{benefit.title}</h3>
                <p>{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Destinations Section */}
      <section id="destinations" className="treasure-section treasure-dark-bg">
        <div className="treasure-container">
          <h2 className="treasurehunt-color">Package Details</h2>
          <p style={{ textAlign: "center", marginBottom: "40px" }}>
            Everything included in your Greek Island adventure
          </p>
          <div className="treasure-destinations-grid">
            {[
              {
                className: "treasure-destination-card treasure-greece",
                title: "Greek Island Getaway",
                price: "$3,999",
                features: [
                  "5 to 7 day luxury villa stay",
                  "Island cruise",
                  "Ancient ruins tour",
                  "guided tours of Skiathos",
                  "Private transfers",
                  "24/7 concierge service",
                ],
                booknow: true,
                url: "",
              },
              {
                className:
                  "treasure-destination-card treasure-nepal locked-offer",
                title: "Himalayan Adventure",
                price: "$1,599",
                features: [
                  "10-day guided trek",
                  "Luxury mountain lodges",
                  "Cultural immersion",
                  "Spa retreat included",
                ],
                booknow: false,
              },
              {
                className:
                  "treasure-destination-card treasure-maldives locked-offer",
                title: "Maldives Paradise",
                price: "$2,199",
                features: [
                  "Overwater bungalow",
                  "All-inclusive luxury",
                  "Private island dining",
                  "Scuba diving package",
                ],
                booknow: false,
              },
            ].map((destination, index) => (
              <div
                key={index}
                className={destination.className}
                onClick={() =>
                  (window.location.href = "https://www.moredealsclub.com/login")
                }
              >
                <div className="treasure-destination-content">
                  <h3>{destination.title}</h3>
                  <ul>
                    {destination.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  {destination.booknow ? (
                    <div className="d-flex flex-column gap-2">
                      <a
                        href="https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package"
                        className="treasure-btn treasure-btn-small treasure-pulse text-black newbtn-whatsapp me-auto"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                          />
                        </svg>{" "}
                        Book Now
                      </a>

                      <a
                        href="https://www.moredealsclub.com/register-membership"
                        className="treasure-btn treasure-btn-small treasure-pulse text-black me-auto"
                      >
                        Member Price: {destination.price}
                      </a>
                    </div>
                  ) : (
                    <a
                      href="#"
                      className="rounded-pill  treasure-btn-small text-black btn-secondary "
                      disabled
                    >
                      comming soon
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      {/* <section id="how-it-works" className="treasure-section treasure-dark-bg">
        <div className="treasure-container">
          <h2 className='treasurehunt-color'>How To Book Your Greek Getaway</h2>
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
      </section> */}

      {/* Membership Benefits Section */}
      <section id="benefits" className="treasure-section">
        <div className="treasure-container">
          <h2 className="treasurehunt-color">Package Benefits</h2>
    <div className="treasure-benefits">
      {[
        {
          svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="56" height="48" viewBox="0 0 576 512">
            <path fill="currentColor" d="m346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h512c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1l67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4M462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5zm-354.8 13.8c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8l3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z" />
          </svg>
          ),
          title: "Luxury Accommodation",
          desc:
            "Stay in a private villa with stunning sea views and premium amenities",
        },
        {
          svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
	<path fill="currentColor" d="M4 10.4V4a1 1 0 0 1 1-1h5V1h4v2h5a1 1 0 0 1 1 1v6.4l1.086.326a1 1 0 0 1 .683 1.2l-1.517 6.068A4.99 4.99 0 0 1 16 16a5 5 0 0 1-4 2a5 5 0 0 1-4-2a4.99 4.99 0 0 1-4.252 1.994l-1.516-6.068a1 1 0 0 1 .682-1.2zm2-.6L12 8l2.754.826l1.809.543L18 9.8V5H6zM4 20a5.98 5.98 0 0 0 4-1.528A5.98 5.98 0 0 0 12 20a5.98 5.98 0 0 0 4-1.528A5.98 5.98 0 0 0 20 20h2v2h-2a7.96 7.96 0 0 1-4-1.07A7.96 7.96 0 0 1 12 22a7.96 7.96 0 0 1-4-1.07A7.96 7.96 0 0 1 4 22H2v-2z" />
</svg>
          ),
          title: "Private Yacht Cruise",
          desc:
            "Exclusive full-day yacht tour with captain and gourmet lunch included",
        },
        {
          svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="51.44" height="48" viewBox="0 0 1920 1792">
	<path fill="currentColor" d="m960 0l960 384v128h-128q0 26-20.5 45t-48.5 19H197q-28 0-48.5-19T128 512H0V384zM256 640h256v768h128V640h256v768h128V640h256v768h128V640h256v768h59q28 0 48.5 19t20.5 45v64H128v-64q0-26 20.5-45t48.5-19h59zm1595 960q28 0 48.5 19t20.5 45v128H0v-128q0-26 20.5-45t48.5-19z" />
</svg>
          ),
          title: "Cultural Tours",
          desc:
            "Guided visits to ancient ruins and historical sites with expert guides",
        },
        {
          svg: (
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
            <g fill="none" fill-rule="evenodd">
              <path d="m12.594 23.258l-.012.002l-.071.035l-.02.004l-.014-.004l-.071-.036q-.016-.004-.024.006l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.016-.018m.264-.113l-.014.002l-.184.093l-.01.01l-.003.011l.018.43l.005.012l.008.008l.201.092q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.003-.011l.018-.43l-.003-.012l-.01-.01z" />
              <path fill="currentColor" d="M9 4a1 1 0 0 1 1-1h4a1 1 0 1 1 0 2h-1v1.035c5.44.49 9.01 6.132 6.929 11.336A1 1 0 0 1 19 18H5a1 1 0 0 1-.928-.629C1.99 12.167 5.56 6.525 11 6.035V5h-1a1 1 0 0 1-1-1M3 20a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H4a1 1 0 0 1-1-1" />
            </g>
          </svg>
          ),
          title: "VIP Treatment",
          desc:
            "Personalized concierge service throughout your stay",
        },
      ].map((benefit, index) => (
        <div className="treasure-benefit treasurehunt-color" key={index}>
          {benefit.svg}
          <h3 className="treasurehunt-color">{benefit.title}</h3>
          <p className="text-dynamic-white">{benefit.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

       

      {/* How It Works Section */}
      <section id="how-it-works" className="treasure-section treasure-dark-bg">
        <div className="treasure-container">
          <h2 className="treasurehunt-color">How To Book Your Greek Getaway</h2>
          <div className="treasure-steps">
            {[
              {
                number: "1",
                title: "Contact Us",
                desc: "Message us on WhatsApp or call +977 9709007758 to check availability",
              },
              {
                number: "2",
                title: "Confirm Dates",
                desc: "Select your preferred travel dates and villa options",
              },
              {
                number: "3",
                title: "Secure Booking",
                desc: "Pay deposit to secure your reservation",
              },
              {
                number: "4",
                title: "Travel Preparation",
                desc: "Receive all travel documents and prepare for your luxury getaway",
              },
            ].map((step, index) => (
              <div className="treasure-step" key={index}>
                <div className="treasure-step-number">{step.number}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <a
              href="https://wa.me/9779709007758?text=I'm%20interested%20in%20the%20Greek%20Island%20Getaway%20package"
              className="treasure-btn treasure-btn-whatsapp newbtn-whatsapp"
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
              </svg>{" "} Book Now
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="treasure-section">
        <div className="treasure-container">
          <h2 className="treasurehunt-color">Our Happy Travelers</h2>
          <div className="treasure-testimonials">
            {[
              {
                img: "https://randomuser.me/api/portraits/women/32.jpg",
                name: "Sarah J.",
                title: "Athens, May 2023",
                quote:
                  "The Greek Island Getaway exceeded all our expectations. The villa was stunning and the private yacht day was the highlight of our trip!",
              },
              {
                img: "https://randomuser.me/api/portraits/men/45.jpg",
                name: "Michael T.",
                title: "Santorini, June 2023",
                quote:
                  "Booking through WhatsApp was so convenient. The team answered all our questions immediately and arranged everything perfectly.!",
              },
              {
                img: "https://randomuser.me/api/portraits/women/68.jpg",
                name: "Priya K.",
                title: "Mykonos, July 2023",
                quote:
                  "The ancient ruins tour with a private guide gave us insights we would never have gotten on our own. Truly a once-in-a-lifetime experience.!",
              },
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
          <h2 className="treasurehunt-color">Contact Our Travel Experts</h2>
          <p style={{ textAlign: "center", marginBottom: "40px" }}>
            Have questions about the Greek Island Getaway? Contact us directly
            on WhatsApp for instant assistance
          </p>
          <div className="d-flex flex-column mx-auto ms-auto me-auto">
            <a
              href="https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package"
              target="_blank"
              rel="noopener noreferrer"
              className="treasure-btn treasure-btn-small treasure-pulse  newbtn-whatsapp ms-auto me-auto"
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
            <h3 className="mx-auto text-white mt-2">
              Or call us at:{" "}
              <span className="treasurehunt-color">+977 9709007758</span>{" "}
            </h3>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="treasure-container">
          <h3>Greek Island Getaway</h3>
          <p>Your luxury Mediterranean escape</p>
          <div className="treasure-social-links">
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M14.5 2.75c-2.861 0-5.25 2.389-5.25 5.25v1.75H6.5a.25.25 0 0 0-.25.25v4c0 .138.112.25.25.25h2.75V21c0 .138.112.25.25.25h4a.25.25 0 0 0 .25-.25v-6.75h2.75a.25.25 0 0 0 .242-.19l1-4a.25.25 0 0 0-.242-.31h-3.75V8a.76.76 0 0 1 .75-.75h3a.25.25 0 0 0 .25-.25V3a.25.25 0 0 0-.25-.25z"
                />
              </svg>
            </a>
            <a href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M7.465 1.066C8.638 1.012 9.012 1 12 1s3.362.013 4.534.066s1.972.24 2.672.511c.733.277 1.398.71 1.948 1.27c.56.549.992 1.213 1.268 1.947c.272.7.458 1.5.512 2.67C22.988 8.639 23 9.013 23 12s-.013 3.362-.066 4.535c-.053 1.17-.24 1.97-.512 2.67a5.4 5.4 0 0 1-1.268 1.949c-.55.56-1.215.992-1.948 1.268c-.7.272-1.5.458-2.67.512c-1.174.054-1.548.066-4.536.066s-3.362-.013-4.535-.066c-1.17-.053-1.97-.24-2.67-.512a5.4 5.4 0 0 1-1.949-1.268a5.4 5.4 0 0 1-1.269-1.948c-.271-.7-.457-1.5-.511-2.67C1.012 15.361 1 14.987 1 12s.013-3.362.066-4.534s.24-1.972.511-2.672a5.4 5.4 0 0 1 1.27-1.948a5.4 5.4 0 0 1 1.947-1.269c.7-.271 1.5-.457 2.67-.511m8.98 1.98c-1.16-.053-1.508-.064-4.445-.064s-3.285.011-4.445.064c-1.073.049-1.655.228-2.043.379c-.513.2-.88.437-1.265.822a3.4 3.4 0 0 0-.822 1.265c-.151.388-.33.97-.379 2.043c-.053 1.16-.064 1.508-.064 4.445s.011 3.285.064 4.445c.049 1.073.228 1.655.379 2.043c.176.477.457.91.822 1.265c.355.365.788.646 1.265.822c.388.151.97.33 2.043.379c1.16.053 1.507.064 4.445.064s3.285-.011 4.445-.064c1.073-.049 1.655-.228 2.043-.379c.513-.2.88-.437 1.265-.822c.365-.355.646-.788.822-1.265c.151-.388.33-.97.379-2.043c.053-1.16.064-1.508.064-4.445s-.011-3.285-.064-4.445c-.049-1.073-.228-1.655-.379-2.043c-.2-.513-.437-.88-.822-1.265a3.4 3.4 0 0 0-1.265-.822c-.388-.151-.97-.33-2.043-.379m-5.85 12.345a3.669 3.669 0 0 0 4-5.986a3.67 3.67 0 1 0-4 5.986M8.002 8.002a5.654 5.654 0 1 1 7.996 7.996a5.654 5.654 0 0 1-7.996-7.996m10.906-.814a1.337 1.337 0 1 0-1.89-1.89a1.337 1.337 0 0 0 1.89 1.89"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2c-5.46 0-9.91 4.45-9.91 9.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91c0-2.65-1.03-5.14-2.9-7.01m-7.01 15.24c-1.48 0-2.93-.4-4.2-1.15l-.3-.18l-3.12.82l.83-3.04l-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24c2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23m4.52-6.16c-.25-.12-1.47-.72-1.69-.81c-.23-.08-.39-.12-.56.12c-.17.25-.64.81-.78.97c-.14.17-.29.19-.54.06c-.25-.12-1.05-.39-1.99-1.23c-.74-.66-1.23-1.47-1.38-1.72c-.14-.25-.02-.38.11-.51c.11-.11.25-.29.37-.43s.17-.25.25-.41c.08-.17.04-.31-.02-.43s-.56-1.34-.76-1.84c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31c-.22.25-.86.85-.86 2.07s.89 2.4 1.01 2.56c.12.17 1.75 2.67 4.23 3.74c.59.26 1.05.41 1.41.52c.59.19 1.13.16 1.56.1c.48-.07 1.47-.6 1.67-1.18c.21-.58.21-1.07.14-1.18s-.22-.16-.47-.28"
                />
              </svg>
            </a>
          </div>
          <p style={{ marginTop: "30px" }}>
            &copy; 2023 moredealsclub.com. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default TreasureHunt;
