import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { FormControl, ListGroup, Row, Col } from 'react-bootstrap';
import { MapApi } from '../../config/config';

const mapContainerStyle = {
  width: '100%',
  height: '200px',
};

const LocationDisplayWithAutocomplete = ({ onPlaceSelected, initialLat, initialLng, initialAddress }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: MapApi,
    libraries: ['places'],
  });

  const [selected, setSelected] = useState(initialLat && initialLng ? { lat: initialLat, lng: initialLng } : null);
  const [address, setAddress] = useState(initialAddress || '');

  const mapRef = useRef();

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const center = useMemo(() => ({ lat: initialLat || 43.45, lng: initialLng || -80.49 }), [initialLat, initialLng]);

  useEffect(() => {
    if (initialLat && initialLng) {
      setSelected({ lat: initialLat, lng: initialLng });
    }
    if (initialAddress) {
      setAddress(initialAddress);
    }
  }, [initialLat, initialLng, initialAddress]);

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  const handlePlaceSelect = (place, address) => {
    setSelected(place);
    setAddress(address);
    onPlaceSelected(place, address);
  };

  return (
    <>
      <Row>
        <Col>
          <PlacesAutocomplete setSelected={handlePlaceSelect} initialAddress={address} />
        </Col>
      </Row>
      <Row>
        <Col>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={10}
            center={selected || center}
            onLoad={onMapLoad}
          >
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </Col>
      </Row>
    </>
  );
};

const PlacesAutocomplete = ({ setSelected, initialAddress }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    defaultValue: initialAddress,
  });

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    const formatted_address = results[0].formatted_address;
    setSelected({ lat, lng }, formatted_address);
  };

  return (
    <>
      <FormControl
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        placeholder="Search an address"
        style={{ marginBottom: '10px' }}
      />
      {status === 'OK' && (
        <ListGroup>
          {data.map(({ place_id, description }) => (
            <ListGroup.Item
              key={place_id}
              action
              onClick={() => handleSelect(description)}
            >
              {description}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
};

export default LocationDisplayWithAutocomplete;
