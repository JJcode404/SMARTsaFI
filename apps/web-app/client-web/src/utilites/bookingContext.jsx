import React, { createContext, useContext, useState } from "react";

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % 4);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // Send to database
  };

  return (
    <BookingContext.Provider
      value={{
        isSubmitted,
        current,
        handleNext,
        handleSubmit,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => useContext(BookingContext);

export { BookingProvider, useBooking };
