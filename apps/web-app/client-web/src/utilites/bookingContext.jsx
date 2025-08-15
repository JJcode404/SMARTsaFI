import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { useAuth } from "./authContextapi";

const BookingContext = createContext(null);

const initialState = {
  serviceType: "residential",
  service: "Deep Cleaning Service",
  features: [],
  isSubmitted: false,
  roomCounts: {},
  featureDescriptions: {},
  current: 0,
  user_id: null,
  status: "Scheduled",
  propertyType: "Apartment",
  bedroomLabel: "",
  deposit_paid: false,
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
    case "SET_ROOM_COUNTS":
      return { ...state, roomCounts: action.payload };
    case "UPDATE_ROOM_COUNT":
      return {
        ...state,
        roomCounts: {
          ...state.roomCounts,
          [action.key]: action.quantity,
        },
      };
    case "SET_FEATURE_DESCRIPTIONS":
      return { ...state, featureDescriptions: action.payload };
    case "UPDATE_FEATURE_DESCRIPTION":
      return {
        ...state,
        featureDescriptions: {
          ...state.featureDescriptions,
          [action.featureId]: action.description,
        },
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

  // Memoize action creators to prevent re-renders
  const handleNext = useCallback(() => dispatch({ type: "NEXT_STEP" }), []);
  const handleSubmit = useCallback(() => dispatch({ type: "SUBMIT" }), []);

  const setServiceType = useCallback(
    (serviceType) =>
      dispatch({ type: "SET_SERVICETYPE", payload: serviceType }),
    []
  );

  const setService = useCallback(
    (service) => dispatch({ type: "SET_SERVICE", payload: service }),
    []
  );

  const setFeatures = useCallback(
    (features) => dispatch({ type: "SET_FEATURES", payload: features }),
    []
  );

  const setRoomCounts = useCallback(
    (roomCounts) => dispatch({ type: "SET_ROOM_COUNTS", payload: roomCounts }),
    []
  );

  const updateRoomCount = useCallback(
    (key, quantity) => dispatch({ type: "UPDATE_ROOM_COUNT", key, quantity }),
    []
  );

  const setFeatureDescriptions = useCallback(
    (descriptions) =>
      dispatch({ type: "SET_FEATURE_DESCRIPTIONS", payload: descriptions }),
    []
  );

  const updateFeatureDescription = useCallback(
    (featureId, description) =>
      dispatch({ type: "UPDATE_FEATURE_DESCRIPTION", featureId, description }),
    []
  );

  // Memoize the payload builder function
  const buildBookingPayload = useCallback((state) => {
    // Find the selected feature based on the service
    const selectedFeature = state.features.find(
      (feature) => feature.title === state.service
    );

    // Build booked_services array from roomCounts and selected feature options
    const bookedServices = [];

    if (
      selectedFeature &&
      selectedFeature.options &&
      selectedFeature.options.length > 0
    ) {
      selectedFeature.options.forEach((option) => {
        const key = `${selectedFeature.id}_${option.id}`;
        const quantity = state.roomCounts[key] || 0;

        if (quantity > 0) {
          bookedServices.push({
            feature_option_id: option.id,
            quantity: quantity,
            unit_price: option.unit_price,
            total_price: option.unit_price * quantity,
          });
        }
      });
    }

    // Combine scheduled date and time into a single datetime
    const scheduledDateTime =
      state.selectedDate && state.selectedTime
        ? new Date(
            state.selectedDate.toDateString() + " " + state.selectedTime
          ).toISOString()
        : null;

    // Build the complete payload
    const payload = {
      client_id: state.user_id,
      worker_id: state.serviceProvider.id || null,
      appointment_datetime: scheduledDateTime,
      service_feature_id: selectedFeature ? selectedFeature.id : null,
      deposit_paid: state.deposit_paid,
      status: state.status || "",
      rating: state.serviceProvider.rating || "",
      // location: location?.pin || "",
      total_price: state.price,
      booked_services: bookedServices,
    };

    return payload;
  }, []);

  const buildPayload = useCallback(() => {
    return buildBookingPayload(state);
  }, [buildBookingPayload, state]);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      state,
      dispatch,
      handleNext,
      handleSubmit,
      setService,
      setServiceType,
      setFeatures,
      setRoomCounts,
      updateRoomCount,
      setFeatureDescriptions,
      updateFeatureDescription,
      buildPayload,
    }),
    [
      state,
      handleNext,
      handleSubmit,
      setService,
      setServiceType,
      setFeatures,
      setRoomCounts,
      updateRoomCount,
      setFeatureDescriptions,
      updateFeatureDescription,
      buildPayload,
    ]
  );

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
};

export { BookingProvider, useBooking };
