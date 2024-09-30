import { useApi } from '../utils/api';
export const useUserService = () => {
  const { post } = useApi();

  const registerUser = async (userData) => {
    return post('/users/end-users', userData);
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

  return { registerUser, verifyOtp, resendOtp, login };
};