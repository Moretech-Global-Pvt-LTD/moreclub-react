import React from "react";
import DefaultImage from "../../images/logo/MembersClubblack.png"
import { Link } from "react-router-dom";

const UserEventCard = ({ events }) => {
  return (
    <div class="event-card-container">
      <div class="event-card">
        <div class="event-card-image">
          {events?.event_photo[0]?.image ? 
          <img src={events.event_photo[0].image} alt="Event-Image"/>
          :
            <img src={DefaultImage} alt="Event-Image" className="bg-secondary" />
        
        }
        </div>
        <div class="event-card-details">
          <h5 class="event-card-title">{events.name}</h5>
          <div class="event-card-location">
            <i class="bi bi-geo-alt"></i> {events.location}
          </div>
           <div class="event-card-price">Price: <span>{events?.currency?.symbol}&nbsp;{events.price}</span></div>
          <div class="event-card-location"> Seat Available :{events.seat_available} of {events.max_limit}</div>
          <Link to={`/event/details/${events.id}`}>

            <button class="event-card-view-btn">View Event</button>
          </Link>
         
        </div>
        <div class="event-card-icons">
          <Link to={`/event/update/${events.id}`}> 
          <i class="bi bi-pencil-square text-danger"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserEventCard;
