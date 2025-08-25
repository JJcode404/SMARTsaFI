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
import { useClientData } from "./useClientData";

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
  description: "",
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
    case "SET_DESCRIPTION":
      return { ...state, description: action.payload };
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
  const { data } = useClientData();

  useEffect(() => {
    if (data?.id) {
      console.log("Setting client id from AuthContext:", data.id);
      dispatch({ type: "SET_USER_ID", user_id: data.id });
    }
  }, [data]);

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
    const selectedFeature = state.features.find(
      (feature) => feature.title === state.service
    );

    // Combine date + time
    const scheduledDateTime =
      state.selectedDate && state.selectedTime
        ? new Date(
            state.selectedDate.toDateString() + " " + state.selectedTime
          ).toISOString()
        : null;

    const appointmentDate = scheduledDateTime
      ? new Date(scheduledDateTime).toISOString().split(".")[0] + "Z"
      : null;

    // Case 1: Feature has options → build booked_services payload
    if (selectedFeature && selectedFeature.options?.length > 0) {
      const bookedServices = [];

      selectedFeature.options.forEach((option) => {
        const key = `${selectedFeature.id}_${option.id}`;
        const quantity = state.roomCounts[key] || 0;

        if (quantity > 0) {
          bookedServices.push({
            feature_option_id: option.id,
            quantity,
            unit_price: option.unit_price,
            total_price: option.unit_price * quantity,
          });
        }
      });

      return {
        hasOption: true,
        payload: {
          client_id: state.user_id,
          worker_id: state.serviceProvider?.id ?? null,
          appointment_datetime: appointmentDate,
          service_feature_id: selectedFeature.id,
          total_price: Number(state.price),
          deposit_paid: Number(state.price) / 2,
          location: state.location,
          description: "Payroll booking for worker",
          status: state.status || "Scheduled",
          rating: Math.round(state.serviceProvider?.rating) || 5,
          booked_services: bookedServices,
        },
      };
    }

    // Case 2: No options → simple payload
    return {
      hasOption: false,
      payload: {
        client_id: state.user_id,
        service_feature_id: selectedFeature ? selectedFeature.id : 0,
        appointment_date: appointmentDate,
        worker_id: state.serviceProvider?.id ?? null,
        location: state.address || state.location || "Not provided",
        description: state.description,
        pricing: Number(state.price) || 0,
        status: state.status || "pending",
      },
    };
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
