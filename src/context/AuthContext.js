"use client";
import Cookies from "js-cookie";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    const token = Cookies.get("access_token");
    if (token) {
      setAccessToken(token);
    }
  }, []);
  const login = (token) => {
    Cookies.set("access_token", token, { expires: 2 });
    setAccessToken(token);
  };
  const logout = () => {
    Cookies.remove("access_token");
    setAccessToken(null);
  };
  return (
    <AuthContext.Provider
      value={{ email, setEmail, login, logout, accessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
