import { useState } from 'react';
// import { FaHotel, FaShip, FaUtensils, FaCamera, FaWater, FaUmbrellaBeach, FaFish, FaSpa, FaToriiGate, FaHiking, FaWhatsapp, FaPhoneAlt } from 'react-icons/fa';
// import "./newdashbord.css";

const TreasureModal = ({ isOpen, closeModal, treasure }) => {
  if (!isOpen) return null;

  const { title, image, description, price, features, whatsappLink } = treasure;

  return (
    <div className="treasure-modal">
      <div className="modal-content">
        <span className="close-modal" onClick={closeModal}>&times;</span>
        <div className="modal-body">
          <div className="modal-header" style={{ backgroundImage: `url(${image})` }}></div>
          <div className="modal-main">
            <div className="modal-details">
              <h2>{title}</h2>
              <p>{description}</p>
              <div className="treasure-price">Win a trip, valued at {price} <span></span></div>
              <a href={whatsappLink} className="btn btn-whatsapp" style={{ marginTop: '20px' }}>
                Book Now
              </a>
            </div>
            <div className="modal-features">
              <h3>Package Highlights</h3>
              {features.map((feature, index) => (
                <div className="modal-feature" key={index}>
                  {feature.icon}
                  <div>
                    <h4>{feature.title}</h4>
                    <p>{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="modal-actions">
            <a href="tel:+9779709007758" className="btn" style={{ marginRight: '15px' }}>
              <i className="bi bi-phone"></i> Call Us
            </a>
            <a href={whatsappLink} className="btn btn-whatsapp">
               WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const TreasureGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTreasure, setSelectedTreasure] = useState(null);

  const treasures = [
    {
      id: 'greek',
      title: 'Greek Island Getaway',
      image: 'https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      description: 'Experience the magic of the Greek Islands with our exclusive luxury package...',
      price: '$3999',
      features: [
        { title: 'Luxury Villa Accommodation', description: 'Stay in a premium villa with private pool', icon:  <i className="bi bi-phone"></i>},
        { title: 'Private Island Cruise', description: 'Exclusive yacht tour to hidden beaches', icon:  <i className="bi bi-phone"></i>},
        { title: 'Gourmet Dining', description: 'Authentic Greek cuisine prepared by top local chefs', icon:  <i className="bi bi-phone"></i>},
        { title: 'Professional Photography', description: 'Capture your memories with our photo session', icon:  <i className="bi bi-phone"></i>},
      ],
      whatsappLink: 'https://wa.me/9779709007758?text=I%20want%20to%20book%20the%20Greek%20Island%20Getaway%20package',
    },
    {
      id: 'maldives',
      title: 'Maldives Paradise Retreat',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      description: 'Coming soon! Be the first to know when we unlock this exclusive Maldives vacation package...',
      price: '$5999',
      features: [
        { title: 'Overwater Bungalow', description: 'Direct access to crystal-clear lagoon from your private deck', icon:  <i className="bi bi-phone"></i>},
        { title: 'Private Beach', description: 'Exclusive beach area reserved for our guests', icon:  <i className="bi bi-phone"></i>},
        { title: 'Marine Excursions', description: 'Guided snorkeling and diving in pristine coral reefs', icon: <i className="bi bi-phone"></i>},
      ],
      whatsappLink: 'https://wa.me/9779709007758?text=Please%20notify%20me%20when%20the%20Maldives%20package%20is%20available',
    },
    {
      id: 'bali',
      title: 'Bali Luxury Escape',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3&auto=format&fit=crop&w=1486&q=80',
      description: 'Coming soon! Our Bali package will feature luxury villas, cultural experiences...',
      price: '$5999',
      features: [
        { title: 'Luxury Spa Treatments', description: 'Traditional Balinese massages and wellness therapies', icon:  <i className="bi bi-phone"></i>},
        { title: 'Cultural Tours', description: 'Visit ancient temples and traditional villages', icon:  <i className="bi bi-phone"></i>},
        { title: 'Adventure Activities', description: 'Volcano hikes, waterfall visits, and rice terrace tours', icon:  <i className="bi bi-phone"></i>},
      ],
      whatsappLink: 'https://wa.me/9779709007758?text=Please%20notify%20me%20when%20the%20Bali%20package%20is%20available',
    },
  ];

  const openModal = (treasureId) => {
    console.log(treasureId);
    const treasure = treasures.find((item) => item.id === treasureId);
    setSelectedTreasure(treasure);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="treasure-grid">
        {treasures.map((treasure) => (
          <div key={treasure.id} className="treasure-card" onClick={() => openModal(treasure.id)}>
            <div className="treasure-img" style={{ backgroundImage: `url(${treasure.image})` }}>
              {treasure.id === 'greek' && <div className="treasure-badge">UNLOCKED</div>}
              {treasure.id !== 'greek' && <div className="treasure-lock"><i className="bi bi-lock-fill"></i></div>}
            </div>
            <div className="treasure-content">
              <h3>{treasure.title}</h3>
              <div className="treasure-meta">
                <span><i className="bi bi-calendar-alt"></i> 5-7 Days</span>
                <span><i className="bi bi-map-marker-alt"></i> Skiathos, Greece</span>
              </div>
              <div className="treasure-price">{treasure.id === 'greek' ? 'Win a trip, valued at $3999' : 'Unlock this treasure'}</div>
              <button className="btn" style={{ width: '100%' }}>{treasure.id === 'greek' ? 'View Treasure' : 'Unlock Treasure'}</button>
            </div>
          </div>
        ))}
      </div>

      <TreasureModal isOpen={isModalOpen} closeModal={closeModal} treasure={selectedTreasure} />
    </div>
  );
};

export default TreasureGrid;
