"use client";

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
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await login({ email, password });
      console.log("Login response:", response); // Debug log

      if (response && response.data && response.data.access_token) {
        // Set cookie to expire in 2 days
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
    <>
      <div className="flex flex-col gap-[1.88rem] h-screen w-full justify-center items-center">
        <form
          onSubmit={handleLogin}
          className="flex  flex-col items-start gap-[0.75rem] sm:w-[90%] md:items-center"
        >
          <EmailInput email={email} setEmail={setEmail} />
          <PasswordInput password={password} setPassword={setPassword} />
          <Button
            type="submit"
            shape="round"
            color="green_200_green_400_01"
            className="w-full rounded-[14px] px-[2.13rem] font-semibold"
          >
            Sign In&nbsp;
          </Button>
          {error && <Text className="text-red-500 text-sm">{error}</Text>}
          {/* <Text as="p" className="text-center text-lg text-body sm:m-auto">
          <span className="inline-flex items-center">
            Need to create an account?
            <Link href="/register" className="font-semibold text-primary ml-2">
              Sign Up
            </Link>
          </span>
        </Text> */}
        </form>
      </div>
    </>
  );
};

const EmailInput = ({ email, setEmail }) => (
  <div className="flex flex-col items-start gap-[0.38rem] self-stretch">
    <Heading size="heading7xl" as="h1" className="font-bold text-text">
      Sign In to Seenyor
    </Heading>
    <Text as="p" className="text-[1.13rem] font-medium capitalize ">
      Enter your details to sign in to your account.
    </Text>
    <Heading
      size="headingmd"
      as="h2"
      className="text-[1.13rem] font-semibold capitalize text-text "
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
      className="w-full rounded-[12px] !border px-[1.63rem] capitalize"
    />
  </div>
);

const PasswordInput = ({ password, setPassword }) => (
  <div className="flex flex-col items-start gap-[0.25rem] self-stretch">
    <div className="w-full flex flex-wrap justify-between gap-[1.25rem] self-stretch">
      <Heading size="headingmd" as="h3" className="capitalize text-text">
        Password
      </Heading>
      <Link href="#" className="">
        <Text as="p" className="capitalize text-primary">
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
      className="w-full rounded-[12px] !border capitalize"
    />
  </div>
);

export default function LoginPage() {
  return (
    <div className="flex  w-full items-center bg-white md:flex-col md:items-center">
      <RightSection />
    </div>
  );
}
