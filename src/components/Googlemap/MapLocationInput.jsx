import React, { useState, useEffect, useRef } from "react";
import mapboxgl, { GeolocateControl } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapboxAPIKey } from "../../config/config";
import { debounce } from "lodash";




const LocationDisplayWithAutocomplete = ({ onPlaceSelected, initialLat, initialLng, initialAddress = "" }) => {
    console.log(initialLat, initialLng, initialAddress)
    const mapContainerRef = useRef(null);
    const mapRef = useRef (null);
    const markerRef = useRef  (null);
    const geolocateControlRef = useRef(null);
    const [searchText, setSearchText] = useState(
        initialAddress
    );
    const [suggestions, setSuggestions] = useState ([]);
    const [coordinates, setCoordinates] = useState ({
        lat: parseFloat(initialLat?? "51.505"),
        lon: parseFloat(initialLng ?? "-0.09"),
    });


    useEffect(() => {
        mapboxgl.accessToken = MapboxAPIKey

        // Ensure mapContainerRef.current is not null before initializing the map
        if (mapContainerRef.current === null) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current, // Now guaranteed not to be null
            style: "mapbox://styles/mapbox/streets-v12",
            center: [coordinates.lon, coordinates.lat],
            zoom: 15,
            accessToken: mapboxgl.accessToken,
        });

        const marker = new mapboxgl.Marker()
            .setLngLat([coordinates.lon, coordinates.lat])
            .addTo(map);

        markerRef.current = marker;
        mapRef.current = map;

        // Add click listener to update the marker position and save to local storage
        map.on("click", async (e) => {
            const { lng, lat } = e.lngLat;
            if (markerRef.current) {
                markerRef.current.setLngLat([lng, lat]);
                setCoordinates({ lat, lon: lng });
                const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`;
                const response = await fetch(url);
                const data = await response.json();
                console.log("location", data);

                if (data.features && data.features.length > 0) {
                    const placeName = data.features[0].place_name;
                    setSearchText(placeName);
                    onPlaceSelected({ lat, lon: lng }, placeName);
                }
            }
        });

        // Add geolocator 
        const geolocateControl = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
        });

        // geolocateControlRef.current = geolocateControl;

        map.addControl(geolocateControl);


        // geolocateControl.on(
        //   "load",
        //   async(e) => {

        //     const { lng, lat } = e.coords;
        //     setCoordinates({ lat, lon: lng });
        //     setSearchText(`${lat}, ${lng}`);
        //     localStorage.setItem("latitude", lat.toString());
        //     localStorage.setItem("longitude", lng.toString());

        //     // Reverse geocode the coordinates to get the place name
        //     const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`;
        //     const response = await fetch(url);
        //     const data = await response.json();
        //     console.log("location", data);

        //     if (data.features && data.features.length > 0) {
        //       const placeName = data.features[0].place_name;
        //       setSearchText(placeName);
        //       localStorage.setItem("location", placeName);
        //     }
        //   }
        // );

        return () => {
            map.remove();
        };
    }, []); // Empty dependency array ensures this runs only once after the initial render

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo({ center: [initialLng, initialLat], zoom: 15 });
            markerRef.current?.setLngLat([initialLng, initialLat]);
        }
        setSearchText(initialAddress);
        setCoordinates({ lat: initialLat, lon: initialLng });
    }, [initialLat, initialLng, initialAddress]);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.flyTo({ center: [coordinates.lon, coordinates.lat], zoom: 15 });
            markerRef.current.setLngLat([coordinates.lon, coordinates.lat]);
        }
    }, [coordinates]);

    // Debounce function setup outside of the useEffect
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
        setSuggestions([]);
        onPlaceSelected({ lat, lng: lon }, suggestion.place_name);
    };

    return (
        <div>
            <div className="relative">
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder="Search for places"
                    className="my-2 p-1 w-100 "
                />
                <div className="relative ">
                    {suggestions.length > 0 && (
                        <ul
                            style={{ listStyleType: "none", padding: 0 }}
                            className="bg-white dark:bg-slate-500 absolute z-20 top-0 left-0 right-0 overflow-y-auto h-40"
                        >
                            {suggestions.map((suggestion) => (
                                <li
                                    key={suggestion.id}
                                    onClick={() => selectSuggestion(suggestion)}
                                    className="cursor-pointer p-1 border-b-2 border-light-primary dark:border-dark-primary"
                                    style={{ cursor: "pointer", padding: "5px" }}
                                >
                                    {suggestion.place_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            <p>{initialAddress}</p>
            <div
                ref={mapContainerRef}
                style={{ height: "350px", width: "100%" }}
                className="map-container"
            />
        </div>
    );
};

export default LocationDisplayWithAutocomplete;
