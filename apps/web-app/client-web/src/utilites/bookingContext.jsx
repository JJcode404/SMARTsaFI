import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useRef,
  useEffect,
} from "react";
import { useAuth } from "./authContextapi";

const BookingContext = createContext(null); // Provide default value

const initialState = {
  serviceType: "residential",
  service: "Deep Cleaning Service",
  features: [],
  isSubmitted: false,
  current: 0,
  user_id: null,
  propertyType: "Apartment",
  bedroomLabel: "",
  furnishing: "Furnished",
  price: 0,
  cleaningInstructions: "",
  serviceProvider: "",
  preferedLanguange: "",
  clientSpecialReaquest: "",
  location: null,
  address: "",
  selectedDate: new Date(),
  selectedTime: null,
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case "NEXT_STEP":
      return { ...state, current: (state.current + 1) % 5 };
    case "SUBMIT":
      return { ...state, isSubmitted: true };
    case "SET_USER_ID":
      return {
        ...state,
        user_id: action.user_id,
      };
    case "SET_PROPERTY_TYPE":
      return { ...state, propertyType: action.payload };
    case "SET_FURNISHING":
      return { ...state, furnishing: action.payload };
    case "SET_BEDROOMLABLE":
      return { ...state, bedroomLabel: action.payload };
    case "SET_ROOM_COUNTS":
      return { ...state, roomCounts: action.payload };
    case "SET_CLEANINGINSTRUCTIONS":
      return { ...state, cleaningInstructions: action.payload };
    case "SET_LOCATION":
      return {
        ...state,
        location: action.payload,
      };
    case "SET_PRICE":
      return {
        ...state,
        price: action.payload,
      };
    case "SET_SERVICETYPE":
      return {
        ...state,
        serviceType: action.payload,
      };
    case "SET_SERVICE":
      return {
        ...state,
        service: action.payload,
      };

    case "SET_FEATURES":
      return {
        ...state,
        features: action.payload,
      };

    case "SET_DATE":
      return { ...state, selectedDate: action.payload };
    case "SET_TIME":
      return { ...state, selectedTime: action.payload };
    case "SET_SERVICE_PROVIDER":
      return { ...state, serviceProvider: action.payload };
    case "SET_PREFERED_LANGUAGE":
      return { ...state, preferedLanguange: action.payload };
    case "SET_CLIENT_SPECIAL_REQUEST":
      return { ...state, clientSpecialReaquest: action.payload };
    default:
      return state;
  }
};

const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);
  const contextId = useRef(Math.random().toString(36).substr(2, 9));
  const { user } = useAuth();

  useEffect(() => {
    if (user?.client_id) {
      console.log("Setting user_id from AuthContext:", user.client_id);
      dispatch({ type: "SET_USER_ID", user_id: user.client_id });
    }
  }, [user]);

  const handleNext = () => dispatch({ type: "NEXT_STEP" });
  const handleSubmit = () => dispatch({ type: "SUBMIT" });
  const setServiceType = (serviceType) =>
    dispatch({ type: "SET_SERVICETYPE", payload: serviceType });
  const setService = (service) =>
    dispatch({ type: "SET_SERVICE", payload: service });

  const setFeatures = (features) =>
    dispatch({ type: "SET_FEATURES", payload: features });

  return (
    <BookingContext.Provider
      value={{
        state,
        dispatch,
        handleNext,
        handleSubmit,
        setService,
        setServiceType,
        setFeatures,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

// Add error handling to the hook
const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export { BookingProvider, useBooking };
