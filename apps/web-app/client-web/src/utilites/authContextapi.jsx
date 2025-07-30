import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          console.log("Session expired");
          localStorage.removeItem("token");
          setUser(null);
          setToken(null);
          // navigate("/account");
        } else {
          setToken(savedToken);
          setUser(decoded);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        // navigate("/account"); // redirect if invalid
      }
    } else {
      setUser(null);
      setToken(null);
      // navigate("/account"); // redirect if no token
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log("AuthContext user on load:", user);
  }, [user]);

  const setAuthToken = (newToken) => {
    if (!newToken) {
      // Clear everything if no token
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      return;
    }

    // Store the new token
    localStorage.setItem("token", newToken);
    setToken(newToken);

    try {
      const decoded = jwtDecode(newToken);
      setUser(decoded);
      console.log(decoded);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const login = async (email, password) => {
    console.log(JSON.stringify({ email, password }));

    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data.error);
      throw new Error(data.error);
    }

    setAuthToken(data.access_token);
    return data;
  };

  const signUp = async (email, password) => {
    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    console.log(response);

    const data = await response.json();

    if (!response.ok) {
      console.error("Signup failed:", data);
      throw new Error(
        data.error || "Failed to create account. Please try again."
      );
    }

    // Then login with the new credentials
    await login(email, password);
  };

  const logout = () => {
    // Clear all auth data
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, setUser, signUp, token, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
