import React, { useState, useEffect, useRef } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import { debounce } from "lodash";
import { MapboxAPIKey } from "../../config/config";
import { FormControl } from "react-bootstrap";


const MapBoxLocationOnlyAutocomplete = ({ onPlaceSelected, initialLat, initialLng, initialAddress }) => {
    // const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const markerRef = useRef(null);
    const [searchText, setSearchText] = useState(initialAddress || '');
    const [suggestions, setSuggestions] = useState([]);
    const [coordinates, setCoordinates] = useState(initialLat && initialLng ? {
        lat: initialLat,
        lon: initialLng
    } : { lat: 43.45, lon: -80.49 });

    useEffect(() => {
        if (initialLat && initialLng) {
            setCoordinates({ lat: initialLat, lon: initialLng });
        }
        if (initialAddress) {
            setSearchText(initialAddress);
        }
    }, [initialLat, initialLng, initialAddress]);

    const debouncedFetchSuggestions = debounce(async (value) => {
        if (value.trim().length < 3) return;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            value
        )}.json?autocomplete=true&access_token=${MapboxAPIKey}`;
        const response = await fetch(url);
        const data = await response.json();
        setSuggestions(data.features || []);
    }, 300);

    const handleChange = (value) => {
        setSearchText(value);
        debouncedFetchSuggestions(value);
    };

    const selectSuggestion = (suggestion) => {

        const [lon, lat] = suggestion.center;
        if (mapRef.current) {
            mapRef.current.flyTo({ center: [lon, lat], zoom: 15 });
            markerRef.current?.setLngLat([lon, lat]);
        }
        setSearchText(suggestion.place_name);
        setCoordinates({ lat, lon });
        onPlaceSelected({ lat, lon }, suggestion.place_name,);
        setSuggestions([]);
    };

    return (
            <div className="relative">
                <FormControl
                    value={searchText}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Search an address"
                    style={{ marginBottom: '10px' }}
                />
                <div className="position-relative">
                    {suggestions.length > 0 && (
                        <ul
                            style={{ listStyleType: "none", padding: 0 }}
                            className="map-suggestion-container"
                        >
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    onClick={() => selectSuggestion(suggestion)}
                                    className="map-suggestions"
                                    style={{ cursor: "pointer", padding: "5px" }}
                                >
                                    {suggestion.place_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
    );
};

export default MapBoxLocationOnlyAutocomplete;