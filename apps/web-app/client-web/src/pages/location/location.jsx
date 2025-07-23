import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import styles from "./location.module.css";
import { MapPin } from "lucide-react";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useBooking } from "../../utilites/bookingContext";

const libraries = ["places"];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -1.2921,
  lng: 36.8219, // Default to Nairobi
};

const LocationPicker = () => {
  const { handleNext, state, dispatch } = useBooking();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [selected, setSelected] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (address) {
      handleLocation(address);
    }
  }, [address]);

  const handleLocation = (location) => {
    dispatch({ type: "SET_LOCATION", payload: location });
  };

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
    <div className={styles.main}>
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
        {status === "OK" && (
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              marginTop: "0.5rem",
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              position: "absolute",
              zIndex: 1000,
              width: "100%",
              left: 0,
              top: "100%",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {data.map(({ place_id, description }) => (
              <li
                key={place_id}
                onClick={() => handleSelect(description)}
                style={{
                  padding: "0.75rem 1rem",
                  cursor: "pointer",
                  borderBottom: "1px solid #eee",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.background = "#f0f0f0")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Location = () => {
  return (
    <div className={styles.wrap}>
      <div className={styles.locationContainer}>
        <LocationPicker />
      </div>
    </div>
  );
};

export { Location };
