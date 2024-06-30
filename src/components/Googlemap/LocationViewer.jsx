import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { MapApi, MapId } from "../../config/config";

export default function MapComponent({lat, lng}) {
  console.log(lat, lng)
  const position = { lat: parseFloat(lat), lng: parseFloat(lng) };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={MapApi}>
      <div style={{ height: "50vh", width: "100%" }}>
        <Map zoom={9} center={position} mapId={MapId}>
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow position={position} onCloseClick={() => setOpen(false)}>
              <p>I'm in Hamburg</p>
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}