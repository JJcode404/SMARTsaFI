import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Load token from localStorage on initial render
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        // Verify token is valid before setting
        const decoded = jwtDecode(savedToken);

        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decoded.exp && decoded.exp < currentTime) {
          // Token expired, clean up
          localStorage.removeItem("token");
        } else {
          setToken(savedToken);
          setUser(decoded);
        }
      } catch (error) {
        // Invalid token, clear it
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

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
    // First ensure we're logged out to prevent token conflicts
    // logout();
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

    setAuthToken(data.Token);
    return data;
  };

  const signUp = async (fullname, email, password) => {
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

    // Clear any existing session before logging in
    logout();

    // Then login with the new credentials
    await login(email, password);
  };

  const logout = () => {
    // Clear all auth data
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");

    // Force clear any URL parameters related to token
    if (window.history && window.history.replaceState) {
      const url = new URL(window.location.href);
      url.searchParams.delete("token");
      window.history.replaceState({}, document.title, url);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, setUser, signUp, token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
