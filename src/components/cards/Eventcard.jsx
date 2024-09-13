import React from "react";

import { Link } from "react-router-dom";



const EventCard = ({ events }) => {


  return (
    // { moment(events.end_date).format("dddd DD MMM, YY") }

    <div class="event-card-container">
      <div class="event-card">
        <div class="event-card-image">
          <img src={events.event_photo[0].image} alt="Event Image" />
        </div>
        <div class="event-card-details">
          <h5 class="event-card-title">{events.name}</h5>
          <div class="event-card-location">
            <i class="bi bi-geo-alt"></i> {events.location}
          </div>
          <div class="event-card-price">Price: <span>{events?.currency?.symbol}&nbsp;{events.price}</span></div>
          <div class="event-card-location"> Seat Available :{events.seat_available} of {events.max_limit}</div>
          <Link to={`/event/${events.id}`}>
            <button class="event-card-view-btn ">Book Ticket</button>
          </Link>
        </div>
        <div class="event-card-icons">
          <i class="bi bi-pencil-square text-danger"></i>
        </div>
      </div>
    </div>
  );

};

export default EventCard;
