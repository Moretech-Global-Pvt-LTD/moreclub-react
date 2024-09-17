
import axios from "axios";
import { useState } from "react";
import { MapboxAPIKey } from "../../config/config";


export async function getPlaces(query) {
    try {
        const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
            {
                params: {
                    access_token: MapboxAPIKey,
                },
            }
        );

        return response.data.features;
    } catch (error) {
        console.error("There was an error while fetching places:", error);
    }
}



export default function AutoCompleteInput({
    handleManualInputChange,
    setAddress,
    streetAndNumber,
}) {
    const [suggestions, setSuggestions] = useState([]);

    const handleChange = (event) => {
        handleManualInputChange(event, "streetAndNumber");
        handleInputChange(event.target.value);
    };

    const handleInputChange = async (query) => {
        const suggesions = await getPlaces(query);

        setSuggestions(suggesions);
    };

    const handleSuggestionClick = (suggestion) => {
        const streetAndNumber = suggestion.place_name.split(",")[0];
        const latitude = suggestion.center[1];
        const longitude = suggestion.center[0];

        const address = {
            streetAndNumber,
            place: "",
            region: "",
            postcode: "",
            country: "",
            latitude,
            longitude,
        };
        suggestion.context.forEach((element) => {
            const identifier = element.id.split(".")[0];
            address[identifier] = element.text;
        });
        setAddress(address);
        setSuggestions([]);
    };

    return (
        <div className="relative">
            <input
                id="address"
                type="text"
                placeholder="Address"
                className="form-control"
                value={streetAndNumber}
                onChange={handleChange}
            />
            <div className="position-relative">
                {suggestions.length > 0 && (
                    <ul className="position-absolute map-suggestion-container">
                        {suggestions?.map((suggestion, index) => (
                            <li key={index} onClick={() => handleSuggestionClick(suggestion)} className="map-suggestions">
                                {suggestion.place_name}
                            </li>
                        ))}

                    </ul>
                )}
            </div>
        </div>
    );
}