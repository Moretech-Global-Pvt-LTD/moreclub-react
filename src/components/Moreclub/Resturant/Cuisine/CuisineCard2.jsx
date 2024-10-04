import React from "react";
import { Link, useParams } from "react-router-dom";


const CuisineCard = ({ id, res_id, logo, name, item,  link }) => {
    const { partnerId, partnerName, cuisineName } = useParams();

    const slug = name.replace(/ /g, "-");


return (
    <Link to={`/partners/${partnerId}/${partnerName}/${slug}/`}  className="cuisine-card">    
    <img src={logo} alt={name} className="cuisine-card-image"/>
    <div className="cuisine-card-content">
      <p className="cuisine-card-title">{name}</p>
    </div>
  
</Link>

 
    );
};

export default CuisineCard;
