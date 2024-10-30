import React from "react";

const StationMenuItemCard = ({
    id,
    logo,
    name,
    price,
    short_description,
    currency_Symbol,
    actual_price,
    discount_percentage,
    menu
    
}) => {
   

    return (
        <>
            <div className="food-card">
                <div className="food-card-body">
                   
                        <h3 className="food-name">{name}</h3>
                   
                    <span className="food-price">{currency_Symbol}&nbsp;{price}{" "}
                        <>
                            {actual_price !== price && discount_percentage !== 0 && (
                                <>
                                    <span
                                        className="text-dynamic-white"
                                        style={{ textDecorationLine: "line-through" }}
                                    >
                                        {currency_Symbol}&nbsp;{actual_price}
                                    </span>
                                    <span className="text-dynamic-white text-end">
                                        {discount_percentage}% Off
                                    </span>
                                </>
                            )}
                        </></span>
                    <p className="food-description line-clamp-1">{short_description}</p>
                    <p className="food-description"><strong>Menu:</strong> {menu}</p>
                </div>
                <div className="food-card-image-container bg-secondary">
                    <img src={logo} alt={name} className="food-card-image bg-secondary" />
                    
                </div>
            </div>
        </>
    );
};

export default StationMenuItemCard;
