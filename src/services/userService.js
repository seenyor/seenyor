import Cookies from "js-cookie";
import { useApi } from "../utils/api";

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
      console.log("i am stripe user", combinedUserData.stripeCustomerId);

      // Store only the Stripe customer ID in a cookie
      Cookies.set("stripeCustomerId", combinedUserData.stripeCustomerId, {
        expires: 1,
      }); // Expires in 7 days

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
      Cookies.remove("stripeCustomerId");
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
  };
};
