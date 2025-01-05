import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

import { message } from "antd";
import { useQueryClient } from "@tanstack/react-query";
import { morefoodAuthenticatedAxios } from "../../../../utills/axios/morefoodaxios";

const OfferCard = ({
  slug,
  offer_id,
  res_id,
  id,
  food_item,
  isEveryDay,
  name,
  banner,
  price,
  description,
  start_offer,
  end_offer,
  currency_Symbol,
  customDays
}) => {

  const [isDeleting, setIsDeleting] = React.useState(false);
  const queryClient = useQueryClient();
  
  const isOfferValidToday = () => {
    const today = moment().format("dddd"); // Get today's day name (e.g., "Monday")
    const now = moment();
    const dayTimes = customDays?.[today];
  
    if (dayTimes) {
      const startTime = moment(dayTimes.start_time);
      const endTime = moment(dayTimes.end_time);
  
      // Check if the current time is within the start and end times
      return now.isBetween(startTime, endTime);
    }
    return false;
  };
  
  const getTodayOfferTimes = () => {
    const today = moment().format("dddd"); // Get today's day name (e.g., "Monday")
    const dayTimes = customDays?.[today];
  
    if (dayTimes) {
      const startTime = moment(dayTimes.start_time).format("h:mm A");
      const endTime = moment(dayTimes.end_time).format("h:mm A");
  
      return { startTime, endTime };
    }
    return null;
  };
  

  const offerValidityMessage = () => {
    const now = moment();
  
    // Convert dates to readable formats
    const startDateFormatted = moment(start_offer).format("MMMM Do, YYYY [at] h:mm A");
    const endDateFormatted = moment(end_offer).format("MMMM Do, YYYY [at] h:mm A");
  
    // Check if offer is active
    const isActive = now.isBetween(moment(start_offer), moment(end_offer));
  
    // If `isEveryDay` is true
    if (isEveryDay) {
      if (isActive) {
        return `Offer is active! Ends on ${endDateFormatted}.`;
      }
      if (now.isBefore(moment(start_offer))) {
        return `Offer is valid from ${startDateFormatted} to ${endDateFormatted}.`;
      }
      return "Offer has ended.";
    }

    console.log("customDays", customDays)
  
    // If specific days (`customDays`) are provided
    if (customDays) {
      const todayOfferTimes = getTodayOfferTimes();
  const daysWithTimes = Object.entries(customDays || {})
    .map(([day, times]) => {
      const start = moment(times.start_time).format("h:mm A");
      const end = moment(times.end_time).format("h:mm A");
      return `${day}: ${start} - ${end}`;
    })
    .join(", ");

  if (isOfferValidToday()) {
    const { endTime } = todayOfferTimes;
    return `Offer is active now! Ends at ${endTime}. Valid on: ${daysWithTimes}`;
  }

  if (todayOfferTimes) {
    const { startTime, endTime } = todayOfferTimes;
    return `Offer will start at ${startTime} and end at ${endTime} today. Valid on: ${daysWithTimes}`;
  }

  return `Valid on: ${daysWithTimes}`;
};
    
  
    // If no `customDays` are provided and `isEveryDay` is false
    if (now.isBefore(moment(start_offer))) {
      return `Offer starts on ${startDateFormatted}.`;
    }
  
    if (isActive) {
      return `Offer is active! Ends on ${endDateFormatted}.`;
    }
  
    return "Offer has ended.";
  };


  const deleteOffer = async (offer_id) => {
    try {
      setIsDeleting(true);
      const res = await morefoodAuthenticatedAxios.delete(
        `moreclub/user/offers/${res_id}/${offer_id}/delete/`
      );
      message.success("Offer Deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [`Resturant offer List ${res_id}`],
      })
    } catch (err) {
      message.error("error deleting offers");
    }finally{
      setIsDeleting(false);
    }
  };
  

  return (
    <div className={`offercard`}>
      <div className="offercard-card">
        <img
          src={banner}
          alt={name}
          className="offercard-card-image"
        />
        <div className="offercard-card-body">
          <h3 className="offercard-card-title">{name}</h3>
          <p className="offercard-card-description">{description}</p>
          <div className="offercard-card-tags">
            {food_item &&
              food_item.map((item, index) => (
                <span key={index} className="offercard-tag">
                  {item.name}
                </span>
              ))}
          </div>
          <p className="offercard-card-validity">{offerValidityMessage()}</p>
          <p className="offercard-card-price">
            {currency_Symbol} {price}
          </p>
          <div className="offercard-card-actions">
            <Link
              to={`/restaurant/${res_id}/offer/update/${id}/${slug}`}
              className="offercard-edit-btn"
            >
             <i className="bi bi-pencil text-white"></i> Edit
            </Link>
            <button
              onClick={() => deleteOffer(offer_id)}
              className="offercard-delete-btn"
            >
             {isDeleting && <span className="spinner-border spinner-border-sm spinner-border-white"></span>} <i className="bi bi-trash text-white"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
