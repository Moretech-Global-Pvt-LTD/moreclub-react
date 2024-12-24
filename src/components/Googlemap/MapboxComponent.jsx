import React, { useState, useEffect, useRef } from "react";
import * as mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapboxAPIKey } from "../../config/config";


const MapboxComponent = ({ lat, lng, title, detail, extraInfo }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

 
  const [coordinates, setCoordinates] = useState({
    lat: parseFloat(lat?? "51.505"),
    lon: parseFloat(lng?? "-0.09"),
  });

  useEffect(() => {
    mapboxgl.accessToken = MapboxAPIKey
      
   
    if (mapContainerRef.current === null) return;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current, 
      style: "mapbox://styles/mapbox/streets-v12",
      center: [coordinates.lon, coordinates.lat],
      zoom: 15,
      accessToken: mapboxgl.accessToken,
    });

    const marker = new mapboxgl.Marker()
      .setLngLat([coordinates.lon, coordinates.lat])
      .addTo(map);
    
    const popup = new mapboxgl.Popup({ offset: 25 }) // offset to avoid overlapping with marker
      .setHTML(`
        <h6 style="color: #06ae5a; font-size: 12px">  ${title}</h6>
        <p style="color: #09150f; font-size: 10px">${detail}</p>
         <p style="color: #09150f; font-size: 10px">${extraInfo?? ""}</p>
      `);

    marker.setPopup(popup); 
    marker.togglePopup();
    markerRef.current = marker;
    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []); 



  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{ height: "350px", width: "100%" }}
        className="map-container"
      />
    </div>
  );
};

export default MapboxComponent;
