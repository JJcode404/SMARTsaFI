import React, { createContext, useContext, useState, useReducer } from "react";

const BookingContext = createContext();

const initialState = {
  service: "Deep Cleaning Service",
  isSubmitted: false,
  current: 0,
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

  const handleNext = () => dispatch({ type: "NEXT_STEP" });
  const handleSubmit = () => dispatch({ type: "SUBMIT" });

  return (
    <BookingContext.Provider
      value={{ state, dispatch, handleNext, handleSubmit }}
    >
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => useContext(BookingContext);

export { BookingProvider, useBooking };
