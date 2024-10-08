"use client";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

// Helper function to determine the appropriate cookie domain
const getCookieDomain = () => {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return null; // No domain for localhost
    } else if (hostname.endsWith('seenyor.com')) {
      return '.seenyor.com'; // Dot prefix allows cookie to be shared across subdomains
    }
  }
  return null; // Default to no domain if we can't determine it
};

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const login = (token) => {
    const cookieOptions = {
      expires: 2, // 2 days
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax'
    };

    const domain = getCookieDomain();
    if (domain) {
      cookieOptions.domain = domain;
    }

    Cookies.set("access_token", token, cookieOptions);
    setAccessToken(token);
  };

  const logout = () => {
    const cookieOptions = {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax'
    };

    const domain = getCookieDomain();
    if (domain) {
      cookieOptions.domain = domain;
    }

    Cookies.remove("access_token", cookieOptions);
    setAccessToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ email, setEmail, login, logout, accessToken, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);