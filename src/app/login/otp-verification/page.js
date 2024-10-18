"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Heading, Input, Text } from "../../../components"; // Adjust the import path as necessary
import { useUserService } from "../../../services/userService"; // Adjust the import path as necessary

const OtpVerification = () => {
  const router = useRouter();
  const email = new URLSearchParams(window.location.search).get("email");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { verifyOtp } = useUserService(); // Assuming you have a verifyOtp function

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    try {
      const response = await verifyOtp({ email, otp });

      if (response && response.status) {
        setSuccessMessage("OTP verified successfully! Please set your new password.");
        // Redirect to set password page
        router.push(`/login/set-password?email=${encodeURIComponent(email)}&otp=${otp}`);
      } else {
        setError("OTP verification failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred during OTP verification");
    }
  };

  return (
    <div className="flex flex-col gap-[1.88rem] h-screen w-full justify-center items-center">
      <form onSubmit={handleVerifyOtp} className="flex flex-col items-start gap-[0.75rem] sm:w-[90%] md:items-center">
        <Heading size="heading7xl" as="h1" className="font-bold text-text">Verify OTP</Heading>
        <Text as="p" className="text-[1.13rem] font-medium capitalize ">Enter the OTP sent to your email.</Text>
        <Input
          shape="round"
          type="text"
          name="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder={`Enter OTP`}
          className="w-full rounded-[12px] !border px-[1.63rem] capitalize"
        />
        <Button type="submit" shape="round" color="green_200_green_400_01" className="w-full rounded-[14px] px-[2.13rem] font-semibold">
          Verify OTP
        </Button>
        {error && <Text className="text-red-500 text-sm">{error}</Text>}
        {successMessage && <Text className="text-green-500 text-sm">{successMessage}</Text>}
      </form>
    </div>
  );
};

export default OtpVerification;