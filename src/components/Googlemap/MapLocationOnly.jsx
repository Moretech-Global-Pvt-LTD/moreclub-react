import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
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

    // Debounce function setup outside of the useEffect

    // Initialize the map only once, on component mount
    // useEffect(() => {
    //     mapboxgl.accessToken = MapboxAPIKey;

    //     // Ensure mapContainerRef.current is not null before initializing the map
    //     if (!mapContainerRef.current) return;

    //     const map = new mapboxgl.Map({
    //         container: mapContainerRef.current,
    //         style: "mapbox://styles/mapbox/streets-v12",
    //         center: [coordinates.lon, coordinates.lat], // Use the initial coordinates for map center
    //         zoom: 15,
    //     });

    //     // Add a marker with the initial coordinates
    //     const marker = new mapboxgl.Marker()
    //         .setLngLat([coordinates.lon, coordinates.lat])
    //         .addTo(map);

    //     // Store the marker and map instances in refs
    //     markerRef.current = marker;
    //     mapRef.current = map;

    //     // Add geolocation control
    //     const geolocateControl = new mapboxgl.GeolocateControl({
    //         positionOptions: {
    //             enableHighAccuracy: true,
    //         },
    //         trackUserLocation: true,
    //         showUserHeading: true,
    //     });
    //     map.addControl(geolocateControl);

    //     // Clean up on unmount
    //     return () => {
    //         map.remove();
    //     };
    // }, []); // Empty dependency array: run this effect only on component mount

    // Update marker position when `coordinates` change without reloading the map
    // useEffect(() => {
    //     if (markerRef.current && mapRef.current) {
    //         // Update the marker's position
    //         markerRef.current.setLngLat([coordinates.lon, coordinates.lat]);

    //         // Optionally, recenter the map on the new marker position
    //         mapRef.current.setCenter([coordinates.lon, coordinates.lat]);
    //     }
    // }, [coordinates]); // Run this effect only when the coordinates change

    // Handle map click to update coordinates and fetch new place name
    // useEffect(() => {
    //     if (!mapRef.current) return;

    //     const map = mapRef.current;

    //     const handleClick = async (e) => {
    //         const { lng, lat } = e.lngLat;
    //         setCoordinates({ lat, lon: lng }); // Update coordinates state

    //         // Fetch place name for the new coordinates
    //         const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`;
    //         const response = await fetch(url);
    //         const data = await response.json();
    //         const filteredFeatures = data.features.filter(
    //             (feature) => !feature.place_type.includes("poi")
    //         );

    //         if (filteredFeatures.length > 0) {
    //             const placeName = filteredFeatures[0].place_name;
    //             setSearchText(placeName);
    //             onPlaceSelected({ lat, lon: lng }, placeName); // Trigger callback with new place details
    //         }
    //     };

    //     // Add click listener to map
    //     map.on("click", handleClick);

    //     // Clean up listener on unmount or re-render
    //     return () => {
    //         map.off("click", handleClick);
    //     };
    // }, [onPlaceSelected]); // Only re-run when the `onPlaceSelected` callback changes

    const debouncedFetchSuggestions = debounce(async (value) => {
        if (value.trim().length < 3) return;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            value
        )}.json?autocomplete=true&access_token=${mapboxgl.accessToken}`;
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