import Cookies from "js-cookie";
import { useApi } from "../utils/api";

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

export const useUserService = () => {
  const { post, get } = useApi();

  const registerUser = async (userData) => {
    try {
      // Register user
      const userResponse = await post("/users/end-users", userData);

      // Create Stripe customer
      const stripeCustomerResponse = await createStripeCustomer({
        email: userData.email,
        name: userData.name,
      });

      // Combine user data with Stripe customer ID
      const combinedUserData = {
        ...userResponse,
        stripeCustomerId: stripeCustomerResponse.id,
      };

       // Store only the Stripe customer ID in a cookie
       const cookieOptions = {
        expires: 1, // 1 day
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      };

      const domain = getCookieDomain();
      if (domain) {
        cookieOptions.domain = domain;
      }

      Cookies.set("stripeCustomerId", combinedUserData.stripeCustomerId, cookieOptions);
      return combinedUserData;
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
  };

  const verifyOtp = async (otpData) => {
    return post("/auth/verify-otp", otpData);
  };

  const resendOtp = async (emailData) => {
    return post("/auth/send-otp", emailData);
  };
  const login = async (credentials) => {
    return post("/auth/login", credentials);
  };

  const getProducts = async () => {
    return get("orders/get-products");
  };
  const getCountries = async () => {
    return get("/countries");
  };

  const getAgents = async () => {
    return get("/users/agents");
  };
  const createStripeCustomer = async (userData) => {
    return post("/orders/create-stripe-customer", userData);
  };

  const createStripeSession = async (sessionData) => {
    return post("/orders/create-session", sessionData);
  };

  const getStripeCustomerId = async () => {
    try {
      const stripeCustomerId = Cookies.get("stripeCustomerId");
      return stripeCustomerId || null;
    } catch (error) {
      console.error("Error getting Stripe customer ID:", error);
      return null;
    }
  };

  const removeStripeCustomerId = async () => {
    try {
      const cookieOptions = {
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Lax'
      };

      const domain = getCookieDomain();
      if (domain) {
        cookieOptions.domain = domain;
      }

      Cookies.remove("stripeCustomerId", cookieOptions);
      return true; // Indicates successful removal
    } catch (error) {
      console.error("Error removing Stripe customer ID:", error);
      return false; // Indicates failure to remove
    }
  };

  return {
    registerUser,
    verifyOtp,
    resendOtp,
    login,
    createStripeCustomer,
    createStripeSession,
    getProducts,
    getStripeCustomerId,
    removeStripeCustomerId,
    getCountries,
    getAgents
  };
};
