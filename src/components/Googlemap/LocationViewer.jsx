import { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { MapApi, MapId } from "../../config/config";

export default function MapComponent({ lat, lng, title, detail, extraInfo }) {
  const position = { lat: parseFloat(lat ?? 0), lng: parseFloat(lng ?? 0) };
  const [open, setOpen] = useState(false);

  return (
    <APIProvider apiKey={MapApi}>
      <div style={{ height: "50vh", width: "100%" }}>
        <Map
          defaultZoom={15}
          center={position}
          mapId={MapId}
          options={{
            zoomControl: true,
            mapTypeControl: true,
            scaleControl: true,
            streetViewControl: true,
            rotateControl: true,
            fullscreenControl: true,
          }}
        >
          <AdvancedMarker position={position} onClick={() => setOpen(true)}>
            <Pin
              background={"grey"}
              borderColor={"green"}
              glyphColor={"purple"}
            />
          </AdvancedMarker>

          {open && (
            <InfoWindow
              position={position}
              headerContent={<h6 className="text-black">{title ?? ""}</h6>}
              onCloseClick={() => setOpen(false)}
            >
              <p className="text-black">{detail}</p>
              {extraInfo && (
                <p
                  className="text-black"
                  style={{ fontSize: "10px" }}
                  dangerouslySetInnerHTML={{ __html: extraInfo }}
                />
              )}
            </InfoWindow>
          )}
        </Map>
      </div>
    </APIProvider>
  );
}
