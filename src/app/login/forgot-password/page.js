"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Heading, Input, Text } from "../../../components"; // Adjust the import path as necessary
import { useUserService } from "../../../services/userService"; // Adjust the import path as necessary

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const { resendOtp } = useUserService();

  const handleResendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await resendOtp({ email });

      if (response && response.status) {
        setSuccessMessage("OTP has been sent to your email. Please check your inbox.");
        console.log("Navigating to:", `/login/otp-verification?email=${encodeURIComponent(email)}`);
        router.push(`/login/otp-verification?email=${encodeURIComponent(email)}`);
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while sending OTP");
    }
  };

  return (
    <div className="flex flex-col gap-[1.88rem] h-screen w-full justify-center items-center">
      <form onSubmit={handleResendOtp} className="flex flex-col items-start gap-[0.75rem] sm:w-[90%] md:items-center">
        <Heading size="heading7xl" as="h1" className="font-bold text-text">Forgot Password</Heading>
        <Text as="p" className="text-[1.13rem] font-medium capitalize ">Enter your email to receive an OTP for password reset.</Text>
        <Input
          shape="round"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={`Customer's E-mail Address`}
          className="w-full rounded-[12px] !border px-[1.63rem] capitalize"
        />
        <Button type="submit" shape="round" color="green_200_green_400_01" className="w-full rounded-[14px] px-[2.13rem] font-semibold">
          Send OTP
        </Button>
        {error && <Text className="text-red-500 text-sm">{error}</Text>}
        {successMessage && <Text className="text-green-500 text-sm">{successMessage}</Text>}
      </form>
    </div>
  );
};

export default ForgotPassword;