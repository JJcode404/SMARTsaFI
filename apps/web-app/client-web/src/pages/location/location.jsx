import React, { useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "./location.module.css";
import { MapPin } from "lucide-react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useBooking } from "../../utilites/bookingContext";

const libraries = ["places"]; // ✅ Fix: Move this outside component

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -1.2921,
  lng: 36.8219, // Default to Nairobi
};

const LocationPicker = () => {
  const { handleNext } = useBooking();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCJY0rvGj1md3ztnM_SulkVkVKhiBMFUgI",
    libraries,
  });

  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState("");

  const handleMapClick = async (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelected({ lat, lng });

    try {
      const results = await getGeocode({ location: { lat, lng } });
      setAddress(results[0]?.formatted_address || "");
    } catch (error) {
      console.error("Geocoding failed:", error);
      setAddress("Unknown address");
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <PlacesSearchBox
        onSelect={setSelected}
        setAddress={setAddress}
        address={address}
      />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={selected || center}
        zoom={12}
        onClick={handleMapClick}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap>
      {/* {selected && (
        <div style={{ marginTop: "1rem" }}>
          <strong>Selected Location:</strong>
          <p>Latitude: {selected.lat}</p>
          <p>Longitude: {selected.lng}</p>
          <p>Address: {address}</p>
        </div>
      )} */}
      <div className={styles.buttonDiv}>
        <button className={styles.addAddress} onClick={handleNext}>
          Add Address
        </button>
      </div>
    </div>
  );
};

const PlacesSearchBox = ({ onSelect, setAddress, address }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (description) => {
    setValue(description, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);

      onSelect({ lat, lng });
      setAddress(results[0].formatted_address);
    } catch (error) {
      console.error("Place selection failed:", error);
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }} className={styles.seletlocation}>
      <div className={styles.locationInput}>
        <svg
          className={styles.locationIcon}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
        </svg>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          placeholder={address ? address : "Search your location"}
        />
      </div>

      {status === "OK" && (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            position: "absolute",
            zIndex: 1000,
            width: "100%",
          }}
        >
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              onClick={() => handleSelect(description)}
              style={{ padding: "0.5rem", cursor: "pointer" }}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Location = () => {
  return (
    <div className={styles.locationContainer}>
      <LocationPicker />
    </div>
  );
};

export { Location };
