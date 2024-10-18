"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Heading, Input, Text } from "../../../components"; // Adjust the import path as necessary
import { useUserService } from "../../../services/userService"; // Adjust the import path as necessary

const SetPassword = () => {
  const router = useRouter();
  const email = new URLSearchParams(window.location.search).get("email");
  const otp = new URLSearchParams(window.location.search).get("otp");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { resetPassword } = useUserService();

  const handleSetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
  
    console.log("Sending reset password request with:", { otp, email, password }); // Debugging line
  
    try {
      const response = await resetPassword({ otp, email, password });
  
      if (response && response.status) {
        setSuccessMessage("Password has been reset successfully!");
        // Redirect to login or another page
        router.push("/login");
      } else {
        setError("Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while resetting the password");
    }
  };

  return (
    <div className="flex flex-col gap-[1.88rem] h-screen w-full justify-center items-center">
      <form onSubmit={handleSetPassword} className="flex flex-col items-start gap-[0.75rem] sm:w-[90%] md:items-center">
        <Heading size="heading7xl" as="h1" className="font-bold text-text">Set New Password</Heading>
        <Text as="p" className="text-[1.13rem] font-medium capitalize ">Enter your new password.</Text>
        <Input
          shape="round"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={`New Password`}
          className="w-full rounded-[12px] !border px-[1.63rem] capitalize"
        />
        <Button type="submit" shape="round" color="green_200_green_400_01" className="w-full rounded-[14px] px-[2.13rem] font-semibold">
          Set Password
        </Button>
        {error && <Text className="text-red-500 text-sm">{error}</Text>}
        {successMessage && <Text className="text-green-500 text-sm">{successMessage}</Text>}
      </form>
    </div>
  );
};

export default SetPassword;