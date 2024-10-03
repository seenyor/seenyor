import { useAuth } from "@/context/AuthContext";
import { useApi } from '../utils/api';

export const useUserService = () => {
  const { post, get } = useApi();
  const { setUser } = useAuth();



  const registerUser = async (userData) => {
    try {
      // Register user
      const userResponse = await post('/users/end-users', userData);
      
      // Create Stripe customer
      const stripeCustomerResponse = await createStripeCustomer({
        email: userData.email,
        name: userData.name
      });

      // Combine user data with Stripe customer ID
      const combinedUserData = {
        ...userResponse,
        stripeCustomerId: stripeCustomerResponse.id
      };
      console.log("i am stripe user", combinedUserData)
      // Update user context
      setUser(combinedUserData);

      return combinedUserData;
    } catch (error) {
      console.error("Error during user registration:", error);
      throw error;
    }
  };
  
  const verifyOtp = async (otpData) => {
    return post('/auth/verify-otp', otpData);
  };

  const resendOtp = async (emailData) => {
    return post('/auth/send-otp', emailData);
  };
  const login = async (credentials) => {
    return post('/auth/login', credentials);
  };
  
  const getProducts = async () => {
    return get('orders/get-products');
  };
  const createStripeCustomer = async (userData) => {
    return post('/orders/create-stripe-customer', userData);
  };

  const createStripeSession = async (sessionData) => {
    return post('/orders/create-session', sessionData);
  }

  return { registerUser, verifyOtp, resendOtp, login, createStripeCustomer, createStripeSession, getProducts };
};