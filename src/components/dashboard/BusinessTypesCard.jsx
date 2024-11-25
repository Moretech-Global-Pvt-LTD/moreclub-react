import React from "react";
import { Link } from "react-router-dom";

const BusinessTypesCard = ({ id, logo, name, banner }) => {

    const slug = name.replace(/ /g, "-");

    return (
        <>
        <Link to={`/partners/${id}/${slug}`} class="business-card-link">
            <div className={`business-card ${!banner ? "business-card-background" : ""}` } style={{ backgroundImage: `url('${banner ?? ""}` }}>
            <div className="business-card-logo">
                {!banner ? <div class="business-card-initial-logo">{name[0]}</div> : <div className="business-card-logo-replacer"></div>}
            </div>
            <div className="business-card-footer">
                <p className="business-card-name">{name}</p>
            </div>
        </div>
        </Link>
        </>

    );
};

export default BusinessTypesCard;
