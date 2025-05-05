import { useState } from "react";
import { Modal } from "react-bootstrap";

const treasures = [
  {
    id: 1,
    name: "Greek Island Getaway",
    location: "Skiathos, Greece",
    duration: "5-7 Days",
    price: "Win a trip, valued at $3999",
    features: [
      { icon: "bi-building", text: "Luxury Villa Accommodation" },
      { icon: "bi-boat", text: "Private Island Cruise" },
    ],
    image:
      "https://cdn.pixabay.com/photo/2016/07/22/20/18/greece-1535702_1280.jpg",
    status: "unlocked",
    modalData: {
      image: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4",
      price: "3999 USD",
      description:
        "Experience the magic of the Greek Islands with our exclusive luxury package.",
      packageDetails:
        "5-7 days in a luxury villa, private island cruise, gourmet dining experiences, and guided tours of Skiathos.",
      contactNumber: "9779709007758",
      highlights: [
        {
          icon: "fas fa-hotel",
          title: "Luxury Villa Accommodation",
          description:
            "Stay in a premium villa with private pool and stunning sea views",
        },
        {
          icon: "fas fa-ship",
          title: "Private Island Cruise",
          description:
            "Exclusive yacht tour to hidden beaches and secret coves",
        },
        {
          icon: "fas fa-utensils",
          title: "Gourmet Dining",
          description: "Authentic Greek cuisine prepared by top local chefs",
        },
        {
          icon: "fas fa-camera",
          title: "Professional Photography",
          description:
            "Capture your memories with our professional photo session",
        },
      ],
    },
  },
  {
    id: 2,
    name: "Hidden Treasure",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
    status: "locked",
  },
  {
    id: 3,
    name: "Hidden Treasure",
    image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963",
    status: "locked",
  },
];

const TreasureGrid = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedTreasure, setSelectedTreasure] = useState(null);

  const handleOpen = (treasure) => {
    // if (treasure.status === "unlocked") {
    setSelectedTreasure(treasure.id);
    setShowModal(true);
    // }
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedTreasure(null);
  };

  return (
    <>
      <div className="treasure-grid">
        {treasures.map((treasure) => (
          <div className="treasure-card" key={treasure.id}>
            <div
              className="treasure-img"
              style={{ backgroundImage: `url('${treasure.image}')` }}
            >
              {treasure.status === "unlocked" ? (
                <div className="treasure-badge">UNLOCKED</div>
              ) : (
                <div className="treasure-lock">
                  <i className="bi bi-lock"></i>
                </div>
              )}
            </div>
            <div className="treasure-content">
              <h3>{treasure.name}</h3>
              {treasure.status === "unlocked" ? (
                <>
                  <div className="treasure-meta">
                    <span>
                      <i className="bi bi-calendar"></i> {treasure.duration}
                    </span>
                    <span>
                      <i className="bi bi-geo-alt"></i> {treasure.location}
                    </span>
                  </div>
                  <div className="treasure-price">{treasure.price}</div>
                  <div className="treasure-features">
                    {treasure.features && (
                      <>
                        <div className="treasure-feature treasurehunt-color">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 48 48"
                          >
                            <defs>
                              <mask id="ipSHotel0">
                                <g fill="none" stroke-width="4">
                                  <path
                                    stroke="#fff"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4 4h40"
                                  />
                                  <rect
                                    width="32"
                                    height="40"
                                    x="8"
                                    y="4"
                                    fill="#fff"
                                    stroke="#fff"
                                    stroke-linejoin="round"
                                    rx="2"
                                  />
                                  <path
                                    stroke="#000"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M20 32h8v12h-8z"
                                  />
                                  <path
                                    stroke="#000"
                                    stroke-linecap="round"
                                    d="M15 12h2m-2 6h2m6-6h2m-2 6h2m6-6h2m-2 6h2"
                                  />
                                  <path
                                    stroke="#fff"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4 44h40"
                                  />
                                  <path
                                    stroke="#000"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M28 32h2c.552 0 1.01-.452.904-.994C30.352 28.166 27.471 26 24 26s-6.352 2.165-6.904 5.006c-.106.542.352.994.904.994h2"
                                  />
                                </g>
                              </mask>
                            </defs>
                            <path
                              fill="currentColor"
                              d="M0 0h48v48H0z"
                              mask="url(#ipSHotel0)"
                            />
                          </svg>

                          <span className="text-dynamic-white">Luxury Villa Accommodation</span>
                        </div>
                        <div className="treasure-feature treasurehunt-color">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M16.997 20c-.899 0-1.288-.311-1.876-.781c-.68-.543-1.525-1.219-3.127-1.219s-2.446.676-3.125 1.22c-.587.469-.975.78-1.874.78c-.897 0-1.285-.311-1.872-.78C4.444 18.676 3.601 18 2 18v2c.898 0 1.286.311 1.873.78c.679.544 1.523 1.22 3.122 1.22c1.601 0 2.445-.676 3.124-1.219c.588-.47.976-.781 1.875-.781c.9 0 1.311.328 1.878.781c.679.543 1.524 1.219 3.125 1.219s2.446-.676 3.125-1.219C20.689 20.328 21.1 20 22 20v-2c-1.602 0-2.447.676-3.127 1.219c-.588.47-.977.781-1.876.781M6 8.5L4 9l2 8h.995c1.601 0 2.445-.676 3.124-1.219c.588-.47.976-.781 1.875-.781c.9 0 1.311.328 1.878.781c.679.543 1.524 1.219 3.125 1.219H18l.027-.107l.313-1.252L20 9l-2-.5V5.001a1 1 0 0 0-.804-.981L13 3.181V2h-2v1.181l-4.196.839A1 1 0 0 0 6 5.001zm2-2.681l4-.8l4 .8V8l-4-1l-4 1z"
                            />
                          </svg>

                          <span className="text-dynamic-white">Private Island Cruise</span>
                        </div>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <p>
                  Unlock this treasure to reveal an exclusive travel package
                </p>
              )}
              <button
                className="newbtn newbtn-small"
                style={{ width: "100%" }}
                onClick={() => handleOpen(treasure)}
              >
                {treasure.status === "unlocked"
                  ? "View Treasure"
                  : "Unlock Treasure"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedTreasure && selectedTreasure === 1 && (
        <Modal show={showModal} onHide={handleClose} size="lg" centered>
          <Modal.Body className="p-0">
            <div className="modal-content">
              {/* <span className="close-modal" onClick={closeModal}>&times;</span> */}
              <div className="modal-body">
                <div
                  className="modal-header"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
                  }}
                ></div>
                <div className="modal-main">
                  <div className="modal-details">
                    <h2>Greek Island Getaway</h2>
                    <p>
                      Experience the magic of the Greek Islands with our
                      exclusive luxury package. From the iconic white-washed
                      buildings of Skiathos to the crystal-clear waters of the
                      Aegean Sea, this is a vacation you'll never forget.
                    </p>
                    <div className="treasure-price">
                      Win a trip, valued at 3999 usd <span></span>
                    </div>
                    <p>
                      <strong>Package includes:</strong> 5-7 days in a luxury
                      villa, private island cruise, gourmet dining experiences,
                      and guided tours of Skiathos most beautiful locations.
                    </p>
                    <a
                      href="https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package"
                      className="newbtn newbtn-small newbtn-whatsapp"
                      style={{ marginTop: "20px" }}
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
                      Book Now
                    </a>
                  </div>

                  <div className="modal-features">
                    <h3>Package Highlights</h3>
                    <div className="modal-feature">
                      <div>
                        <h4 className="treasurehunt-color">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 48 48"
                          >
                            <defs>
                              <mask id="ipSHotel0">
                                <g fill="none" stroke-width="4">
                                  <path
                                    stroke="#fff"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4 4h40"
                                  />
                                  <rect
                                    width="32"
                                    height="40"
                                    x="8"
                                    y="4"
                                    fill="#fff"
                                    stroke="#fff"
                                    stroke-linejoin="round"
                                    rx="2"
                                  />
                                  <path
                                    stroke="#000"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M20 32h8v12h-8z"
                                  />
                                  <path
                                    stroke="#000"
                                    stroke-linecap="round"
                                    d="M15 12h2m-2 6h2m6-6h2m-2 6h2m6-6h2m-2 6h2"
                                  />
                                  <path
                                    stroke="#fff"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M4 44h40"
                                  />
                                  <path
                                    stroke="#000"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M28 32h2c.552 0 1.01-.452.904-.994C30.352 28.166 27.471 26 24 26s-6.352 2.165-6.904 5.006c-.106.542.352.994.904.994h2"
                                  />
                                </g>
                              </mask>
                            </defs>
                            <path
                              fill="currentColor"
                              d="M0 0h48v48H0z"
                              mask="url(#ipSHotel0)"
                            />
                          </svg>
                          Luxury Villa Accommodation
                        </h4>
                        <p>
                          Stay in a premium villa with private pool and stunning
                          sea views
                        </p>
                      </div>
                    </div>
                    <div className="modal-feature">
                      <div>
                        <h4 className="treasurehunt-color">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M16.997 20c-.899 0-1.288-.311-1.876-.781c-.68-.543-1.525-1.219-3.127-1.219s-2.446.676-3.125 1.22c-.587.469-.975.78-1.874.78c-.897 0-1.285-.311-1.872-.78C4.444 18.676 3.601 18 2 18v2c.898 0 1.286.311 1.873.78c.679.544 1.523 1.22 3.122 1.22c1.601 0 2.445-.676 3.124-1.219c.588-.47.976-.781 1.875-.781c.9 0 1.311.328 1.878.781c.679.543 1.524 1.219 3.125 1.219s2.446-.676 3.125-1.219C20.689 20.328 21.1 20 22 20v-2c-1.602 0-2.447.676-3.127 1.219c-.588.47-.977.781-1.876.781M6 8.5L4 9l2 8h.995c1.601 0 2.445-.676 3.124-1.219c.588-.47.976-.781 1.875-.781c.9 0 1.311.328 1.878.781c.679.543 1.524 1.219 3.125 1.219H18l.027-.107l.313-1.252L20 9l-2-.5V5.001a1 1 0 0 0-.804-.981L13 3.181V2h-2v1.181l-4.196.839A1 1 0 0 0 6 5.001zm2-2.681l4-.8l4 .8V8l-4-1l-4 1z"
                            />
                          </svg>
                          Private Island Cruise
                        </h4>
                        <p>
                          Exclusive yacht tour to hidden beaches and secret
                          coves
                        </p>
                      </div>
                    </div>
                    <div className="modal-feature">
                      <div>
                        <h4 className="treasurehunt-color">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 14 14"
                          >
                            <path
                              fill="currentColor"
                              fill-rule="evenodd"
                              d="M.785.024a.75.75 0 0 1 .75.75v2.5a1.75 1.75 0 0 0 1 1.581V.774a.75.75 0 1 1 1.5 0v4.081a1.75 1.75 0 0 0 1-1.581v-2.5a.75.75 0 1 1 1.5 0v2.5a3.25 3.25 0 0 1-2.25 3.092V13a1 1 0 0 1-2 0V6.367a3.25 3.25 0 0 1-2.25-3.093v-2.5a.75.75 0 0 1 .75-.75m10.05 0c-1.772 0-2.941 1.727-2.941 3.489c0 1.404.742 2.786 1.94 3.29V13a1 1 0 1 0 2 0V6.802c1.2-.503 1.942-1.885 1.942-3.29c0-1.761-1.17-3.488-2.941-3.488"
                              clip-rule="evenodd"
                            />
                          </svg>{" "}
                          Gourmet Dining
                        </h4>
                        <p>
                          Authentic Greek cuisine prepared by top local chefs
                        </p>
                      </div>
                    </div>
                    <div className="modal-feature">
                      <div>
                        <h4 className="treasurehunt-color">
                          <i className="bi bi-camera"></i> Professional
                          Photography
                        </h4>
                        <p>
                          Capture your memories with our professional photo
                          session
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <a
                    href="tel:+9779709007758"
                    className="newbtn newbtn-small "
                    style={{ marginRight: "15px" }}
                  >
                    <i className="bi bi-phone"></i> Call Us
                  </a>
                  <a
                    href="https://wa.me/9779709007758?text=I%20have%20questions%20about%20the%20Greek%20Island%20Getaway"
                    className="newbtn newbtn-small newbtn-whatsapp"
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
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {selectedTreasure && selectedTreasure === 2 && (
        <Modal show={showModal} onHide={handleClose} size="lg" centered>
          <Modal.Body className="p-0">
            <div className="modal-content">
              {/* <span className="close-modal" onClick={closeModal}>&times;</span> */}
              <div className="modal-body">
                <div
                  className="modal-header"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')",
                  }}
                ></div>
                <div className="modal-main">
                  <div className="modal-details">
                    <h2 className="treasurehunt-color">
                      Maldives Paradise Retreat
                    </h2>
                    <p>
                      Coming soon! Be the first to know when we unlock this
                      exclusive Maldives vacation package featuring overwater
                      bungalows, private beaches, and world-class diving
                      experiences.
                    </p>
                    <div className="treasure-price">
                      Valued trip 5999 usd <span></span>
                    </div>
                    <p>
                      <strong>Expected inclusions:</strong> 5 days in luxury
                      overwater bungalow, private beach access, snorkeling
                      excursions, and spa treatments.
                    </p>
                    <button
                      className="newbtn newbtn-small"
                      style={{ marginTop: "20px" }}
                      onClick={() =>
                        alert(
                          "This treasure will be unlocked soon! Contact us to be notified when available."
                        )
                      }
                    >
                      Notify Me
                    </button>
                  </div>

                  <div className="modal-features">
                    <h3>Expected Highlights</h3>
                    <div className="modal-feature">
                      <div>
                        <h4 className="treasurehunt-color">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M21.98 14H22zM5.35 13c1.19 0 1.42 1 3.33 1c1.95 0 2.09-1 3.33-1c1.19 0 1.42 1 3.33 1c1.95 0 2.09-1 3.33-1c1.19 0 1.4.98 3.31 1v-2c-1.19 0-1.42-1-3.33-1c-1.95 0-2.09 1-3.33 1c-1.19 0-1.42-1-3.33-1c-1.95 0-2.09 1-3.33 1c-1.19 0-1.42-1-3.33-1c-1.95 0-2.09 1-3.33 1v2c1.9 0 2.17-1 3.35-1m13.32 2c-1.95 0-2.09 1-3.33 1c-1.19 0-1.42-1-3.33-1c-1.95 0-2.1 1-3.34 1s-1.38-1-3.33-1s-2.1 1-3.34 1v2c1.95 0 2.11-1 3.34-1c1.24 0 1.38 1 3.33 1s2.1-1 3.34-1c1.19 0 1.42 1 3.33 1c1.94 0 2.09-1 3.33-1c1.19 0 1.42 1 3.33 1v-2c-1.24 0-1.38-1-3.33-1M5.35 9c1.19 0 1.42 1 3.33 1c1.95 0 2.09-1 3.33-1c1.19 0 1.42 1 3.33 1c1.95 0 2.09-1 3.33-1c1.19 0 1.4.98 3.31 1V8c-1.19 0-1.42-1-3.33-1c-1.95 0-2.09 1-3.33 1c-1.19 0-1.42-1-3.33-1c-1.95 0-2.09 1-3.33 1c-1.19 0-1.42-1-3.33-1C3.38 7 3.24 8 2 8v2c1.9 0 2.17-1 3.35-1"
                            />
                          </svg>
                          Overwater Bungalow
                        </h4>
                        <p>
                          Direct access to crystal-clear lagoon from your
                          private deck
                        </p>
                      </div>
                    </div>
                    <div className="modal-feature">
                      <div>
                        <h4 className="treasurehunt-color">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="27"
                            height="24"
                            viewBox="0 0 576 512"
                          >
                            <path
                              fill="currentColor"
                              d="m346.3 271.8l-60.1-21.9L214 448H32c-17.7 0-32 14.3-32 32s14.3 32 32 32h512c17.7 0 32-14.3 32-32s-14.3-32-32-32H282.1l64.1-176.2zm121.1-.2l-3.3 9.1l67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4M462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5zm-354.8 13.8c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8l3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"
                            />
                          </svg>{" "}
                          Private Beach
                        </h4>
                        <p>Exclusive beach area reserved just for our guests</p>
                      </div>
                    </div>
                    <div className="modal-feature">
                      <div>
                        <h4 className="treasurehunt-color">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 20l.76-3c-3.26-.21-6.17-1.6-7.01-3.42c-.09.48-.22.92-.42 1.25C4.67 16 3.33 16 2 16c1.1 0 1.5-1.57 1.5-3.5S3.1 9 2 9c1.33 0 2.67 0 3.33 1.17c.2.33.33.77.42 1.25c.65-1.42 2.57-2.57 4.91-3.1L9 5c2 0 4 0 5.33.67c1.13.56 1.78 1.6 2.36 2.71c2.92.7 5.31 2.28 5.31 4.12c0 1.88-2.5 3.5-5.5 4.16c-.83 1.1-1.64 2.12-2.33 2.67c-.84.67-1.5.67-2.17.67m5-9a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1"
                            />
                          </svg>
                          Marine Excursions
                        </h4>
                        <p>
                          Guided snorkeling and diving in pristine coral reefs
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <p>
                    Contact us to be notified when this treasure becomes
                    available
                  </p>
                  <a
                    href="https://wa.me/9779709007758?text=Please%20notify%20me%20when%20the%20Maldives%20package%20is%20available"
                    className="newbtn newbtn-small newbtn-whatsapp"
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
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {selectedTreasure && selectedTreasure === 3 && (
        <Modal show={showModal} onHide={handleClose} size="lg" centered>
          <Modal.Body className="p-0">
            <div className="modal-content">
              {/* <span className="close-modal" onClick={closeModal}>&times;</span> */}
              <div className="modal-body">
                <div
                  className="modal-header"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1486&q=80')",
                  }}
                ></div>
                <div className="modal-main">
                  <div className="modal-details">
                    <h2 className="treasurehunt-color">Bali Luxury Escape</h2>
                    <p>
                      Coming soon! Our Bali package will feature luxury villas,
                      cultural experiences, and breathtaking landscapes at an
                      exclusive price available only to our treasure hunters.
                    </p>
                    <div class="treasure-price">
                      Valued trip 5999 usd <span></span>
                    </div>
                    <p>
                      <strong>Expected inclusions:</strong> 7 days in private
                      villa, cultural tours, spa treatments, and authentic
                      Balinese dining experiences.
                    </p>
                    <button
                      class="newbtn newbtn-small "
                      style={{ "margin-top": "20px" }}
                      onclick="alert('This treasure will be unlocked soon! Contact us to be notified when available.')"
                    >
                      Notify Me
                    </button>
                  </div>

                  <div className="modal-features">
                    <h3>Expected Highlights</h3>
                    <div className="modal-feature">
                      <div>
                        <h4 className="treasurehunt-color">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M11.85 21.925q-4.35-.65-6.9-3.363t-2.9-7.387q-.025-.275.063-.488t.237-.362t.363-.225t.462-.025q4.575.625 7.05 3.525t2.75 7.25q.025.225-.062.438t-.263.362q-.15.15-.363.238t-.437.037m.15-9.3q-.35-.55-1.612-1.612T8.25 9.6q.2-1.25 1.013-3.162T11.2 2.975q.15-.2.363-.3t.437-.1t.425.1t.35.325q1.125 1.575 1.963 3.45T15.75 9.6q-.975.45-2.175 1.463T12 12.625m2.95 8.575q-.05-1.525-.462-3.462T13.2 14.4q1.075-1.65 3.188-2.85t4.462-1.475q.25-.05.45.038t.35.237t.238.35t.062.45q-.2 4.025-2.187 6.538T14.95 21.2"
                            />
                          </svg>
                          Luxury Spa Treatments
                        </h4>
                        <p>
                          Traditional Balinese massages and wellness therapies
                        </p>
                      </div>
                    </div>
                    <div className="modal-feature">
                      <div>
                        <h4 className="treasurehunt-color">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 48 48"
                          >
                            <defs>
                              <mask id="ipTGate0">
                                <g
                                  fill="none"
                                  stroke="#fff"
                                  stroke-linecap="round"
                                  stroke-width="4"
                                >
                                  <path
                                    stroke-linejoin="round"
                                    d="M13 10v25m22-25v25"
                                  />
                                  <path d="M8 18h32" />
                                  <path stroke-linejoin="round" d="M24 10v8" />
                                  <path
                                    fill="#555555"
                                    stroke-linejoin="round"
                                    d="M39 10H9L5 4s11.07 1 19 1s19-1 19-1zM10 35h6v9h-6zm22 0h6v9h-6z"
                                  />
                                </g>
                              </mask>
                            </defs>
                            <path
                              fill="currentColor"
                              d="M0 0h48v48H0z"
                              mask="url(#ipTGate0)"
                            />
                          </svg>
                          Cultural Tours
                        </h4>
                        <p>Visit ancient temples and traditional villages</p>
                      </div>
                    </div>
                    <div className="modal-feature">
                      <div>
                        <h4 className="treasurehunt-color">
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="m18 10l-3 1.5l-4-3l-1 5.5l3.5 3l.5 4.5m4-13v13M10 17l-2 4.5m.5-13C7 9.5 6 12 6 12l2 1m4-6.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                            />
                          </svg>
                          Adventure Activities
                        </h4>
                        <p>
                          Volcano hikes, waterfall visits, and rice terrace
                          tours
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <p>
                    Contact us to be notified when this treasure becomes
                    available
                  </p>
                  <a
                    href="https://wa.me/9779709007758?text=Please%20notify%20me%20when%20the%20Bali%20package%20is%20available"
                    className="newbtn newbtn-small newbtn-whatsapp"
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
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default TreasureGrid;
