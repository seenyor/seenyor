"use client";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [customerMail, setCustomerMail] = useState("");
  // Helper function to determine the appropriate cookie domain
  const getCookieDomain = () => {
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        return null; // No domain for localhost
      } else if (hostname.endsWith("seenyor.com")) {
        return ".seenyor.com"; // Dot prefix allows cookie to be shared across subdomains
      }
    }
    return null; // Default to no domain if we can't determine it
  };

  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);

  const login = (token) => {
    const cookieOptions = {
      expires: 1, // 1 day
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    };
    const domain = getCookieDomain();
    if (domain) {
      cookieOptions.domain = domain; // Set the domain for the cookie
    }
    Cookies.set("access_token", token, cookieOptions);
    setAccessToken(token);
  };

  const logout = () => {
    const cookieOptions = {
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    };

    const domain = getCookieDomain();
    if (domain) {
      cookieOptions.domain = domain;
    }

    Cookies.remove("access_token", cookieOptions);
    setAccessToken(null);
  };
  const [isCom, setIsCom] = useState(null);
  useEffect(() => {
    const currentURL = window.location.href;
    if (currentURL.includes("user.seenyor.com")) {
      setIsCom(true);
    } else if (currentURL.includes("user.seenyor.au")) {
      setIsCom(false);
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        email,
        setEmail,
        login,
        logout,
        accessToken,
        user,
        setUser,
        userName,
        setUserName,
        customerMail,
        setCustomerMail,
        isCom,
        setIsCom,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
