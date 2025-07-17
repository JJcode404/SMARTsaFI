// src/context/ClientRegistrationContext.js
import React, { createContext, useReducer, useContext } from "react";

const ClientRegistrationContext = createContext();

const initialState = {
  current: 0,
  formData: {
    client_type: "",
    first_name: "",
    last_name: "",
    organization_name: "",
    tax_number: "",
    phone_number: "",
    national_id_number: "",
    address: "",
    user_id: 1,
    verification_id: false,
    verification_tax: false,
  },
  files: {
    national_id_proof: null,
    tax_document_proof: null,
    profile_picture: null,
    image_path: null,
  },
  error: "",
  success: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FORM_FIELD":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.field]: action.value,
        },
      };
    case "SET_FILE":
      return {
        ...state,
        files: {
          ...state.files,
          [action.field]: action.file,
        },
      };
    case "NEXT_STEP":
      return {
        ...state,
        current: Math.min(state.current + 1, 3),
        error: "",
      };
    case "PREV_STEP":
      return {
        ...state,
        current: Math.max(state.current - 1, 0),
        error: "",
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.message,
        success: "",
      };
    case "SET_SUCCESS":
      return {
        ...state,
        success: action.message,
        error: "",
      };
    case "RESET_MESSAGES":
      return {
        ...state,
        error: "",
        success: "",
      };
    default:
      return state;
  }
}

export const ClientRegistrationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setField = (field, value) => {
    dispatch({ type: "SET_FORM_FIELD", field, value });
  };

  const setFile = (field, file) => {
    dispatch({ type: "SET_FILE", field, file });
  };

  const nextStep = () => dispatch({ type: "NEXT_STEP" });
  const prevStep = () => dispatch({ type: "PREV_STEP" });
  const setError = (message) => dispatch({ type: "SET_ERROR", message });
  const setSuccess = (message) => dispatch({ type: "SET_SUCCESS", message });
  const resetMessages = () => dispatch({ type: "RESET_MESSAGES" });

  return (
    <ClientRegistrationContext.Provider
      value={{
        state,
        dispatch,
        setField,
        setFile,
        nextStep,
        prevStep,
        setError,
        setSuccess,
        resetMessages,
      }}
    >
      {children}
    </ClientRegistrationContext.Provider>
  );
};

export const useClientRegistration = () =>
  useContext(ClientRegistrationContext);
