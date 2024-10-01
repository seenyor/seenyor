"use client";

import Cookies from 'js-cookie';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Heading, Input, Text } from "../../components";
import { useUserService } from "../../services/userService";

const RightSection = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useUserService();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await login({ email, password });
      console.log("Login response:", response); // Debug log
  
      if (response && response.data && response.data.access_token) {
        // Set cookie to expire in 2 days
        Cookies.set('access_token', response.data.access_token, { expires: 2 });
        console.log("Login successful, token set in cookie");
        router.push("/profile");
      } else {
        console.log("Login failed, unexpected response structure:", response);
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login");
    }
  };

  return (
    
    <div className="flex flex-col gap-[1.88rem] h-[80vh] w-full justify-center items-center">
      <div className="flex w-[90%] flex-col justify-start items-center md:justify-start  gap-[0.50rem] md:w-full sm:pl-[2rem]">
        <Heading
          size="heading7xl"
          as="h1"
          className="w-[55%] md:w-[100%] text-[2.13rem] font-bold text-text md:text-[2.00rem] sm:text-[1.4rem] sm:pl-[0rem]"
        >
          Sign In to Seenyor
        </Heading>
        <Text
          as="p"
          className="w-[55%] text-[1.13rem] sm:text-[1rem] font-normal capitalize leading-[1.69rem] text-body md:w-full sm:m-auto"
        >
          Enter your details to sign in to your account.
        </Text>
      </div>
      <form onSubmit={handleLogin} className="flex w-[50%] flex-col items-start gap-[0.75rem] md:w-full sm:my-0 sm:mx-auto ">
        <EmailInput email={email} setEmail={setEmail} />
        <PasswordInput password={password} setPassword={setPassword} />
        <Button
          type="submit"
          shape="round"
          color="green_200_green_400_01"
          className="w-[90%] rounded-[14px] px-[2.13rem] font-semibold sm:px-[1.25rem] sm:m-auto"
        >
          Sign In&nbsp;
        </Button>
        {error && <Text className="text-red-500 text-sm">{error}</Text>}
        <Text as="p" className="text-center text-lg text-body sm:m-auto">
          <span className="inline-flex items-center">
            Need to create an account?
            <Link href="/register" className="font-semibold text-primary ml-2">
              Sign Up
            </Link>
          </span>
        </Text>
      </form>
    </div>
  );
};

const EmailInput = ({ email, setEmail }) => (
  <div className="flex flex-col items-start gap-[0.38rem] self-stretch">
    <Heading
      size="headingmd"
      as="h2"
      className="text-[1.13rem] font-semibold capitalize text-text sm:ml-[2rem]"
    >
      Customer&apos;s E-mail
    </Heading>
    <Input
      shape="round"
      type="email"
      name="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder={`Customer's E-mail Address`}
      className="w-[90%] rounded-[12px] !border px-[1.63rem] capitalize sm:px-[1.25rem] sm:m-auto"
    />
  </div>
);

const PasswordInput = ({ password, setPassword }) => (
  <div className="flex flex-col items-start gap-[0.25rem] self-stretch">
    <div className="w-[90%] flex flex-wrap justify-between gap-[1.25rem] self-stretch">
      <Heading
        size="headingmd"
        as="h3"
        className="text-[1.13rem] font-semibold capitalize text-text sm:m-auto sm:ml-[2rem]"
      >
        Password
      </Heading>
      <Link href="#" className="">
        <Text
          as="p"
          className="text-[1.13rem] font-medium capitalize text-primary"
        >
          Forgot Password?
        </Text>
      </Link>
    </div>
    <Input
      shape="round"
      type="password"
      name="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder={`Password`}
      className="w-[90%] rounded-[12px] !border px-[1.63rem] capitalize sm:px-[1.25rem] sm:m-auto"
    />
  </div>
);

export default function LoginPage() {
  return (
    <div className="flex w-[50%] sm:w-[100%] items-center bg-white md:flex-col">
      <RightSection />
    </div>
  );
}