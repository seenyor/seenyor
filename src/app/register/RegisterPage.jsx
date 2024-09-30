"use client";
import SingUpOpt from "@/components/SingUpOpt";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Heading, Input, Text } from "../../components";
import { useUserService } from "../../services/userService";

// Custom SelectBox component
const SelectBox = ({
  name,
  placeholder,
  options,
  value,
  onChange,
  disabled,
  className,
  children,
}) => (
  <select
    name={name}
    value={value}
    onChange={(e) =>
      onChange({
        name,
        value: e.target.value,
        label: e.target.options[e.target.selectedIndex].text,
      })
    }
    disabled={disabled}
    className={className}
  >
    <option value="">{placeholder}</option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

// Sample data for dropdowns
const countries = [
  { label: "United States", value: "66ec80829adf64ab302207f0" },
  { label: "United Kingdom", value: "66ec80829adf64ab302207f0" },
  { label: "Canada", value: "66ec80829adf64ab302207f0" },
  { label: "Australia", value: "66ec80829adf64ab302207f0" },
];

const cities = {
  "66ec80829adf64ab302207f0": [
    { label: "New York", value: "ny" },
    { label: "Los Angeles", value: "la" },
    { label: "Chicago", value: "ch" },
  ],
  "66ec80829adf64ab302207f1": [
    { label: "London", value: "ld" },
    { label: "Manchester", value: "mc" },
    { label: "Birmingham", value: "bm" },
  ],
  "66ec80829adf64ab302207f2": [
    { label: "Toronto", value: "to" },
    { label: "Vancouver", value: "vc" },
    { label: "Montreal", value: "mt" },
  ],
  "66ec80829adf64ab302207f3": [
    { label: "Sydney", value: "sy" },
    { label: "Melbourne", value: "ml" },
    { label: "Brisbane", value: "br" },
  ],
};

const agents = [
  { label: "Agent 001", value: "000001" },
  { label: "Agent 002", value: "000002" },
  { label: "Agent 003", value: "000003" },
];

export default function RegisterPage() {
  const router = useRouter();
  const { registerUser, verifyOtp, resendOtp } = useUserService();
  const { setEmail } = useAuth();
  const [formData, setFormData] = useState({
    country_id: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    contact_number: "",
    address: "",
    agent_id: "",
    city: "",
  });
  const [error, setError] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);

  useEffect(() => {
    if (formData.country_id) {
      setCityOptions(cities[formData.country_id] || []);
    } else {
      setCityOptions([]);
    }
  }, [formData.country_id]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target || e;

    if (type === "select-one") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
        [`${name}Label`]: selectedOption.text,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }

    if (name === "country_id") {
      setFormData((prevState) => ({
        ...prevState,
        city: "",
        cityLabel: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const {
        confirmPassword,
        countryLabel,
        cityLabel,
        agentLabel,
        ...dataToSend
      } = formData;
      const response = await registerUser(dataToSend);
      if (response.success) {
        setEmail(formData.email); // Store email in context

        setIsOtpSent(true);
      } else {
        setError(response.message || "Registration failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred during registration");
    }
  };

  const handleOtpVerification = async (otp) => {
    try {
      const response = await verifyOtp({
        email: formData.email, // Use email from form data
        otp: otp,
      });
      if (response.success) {
        // OTP verification successful, redirect to login or dashboard
        router.push("/login");
      } else {
        setError(
          response.message || "OTP verification failed. Please try again."
        );
      }
    } catch (err) {
      setError(err.message || "An error occurred during OTP verification");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await resendOtp({
        email: formData.email, // Use email from form data
      });
      if (response.success) {
        setError(""); // Clear any existing errors
        // Optionally, show a success message
      } else {
        setError(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while resending OTP");
    }
  };

  if (isOtpSent) {
    return (
      <div className="md:min-h-screen mb-[9.75rem] mt-[5.00rem] flex flex-1 flex-col items-center gap-[2.25rem] px-[3.50rem] md:self-stretch md:px-[1.25rem] overflow-y-auto sm:overflow-x-hidden custom-scrollbar ml-[10rem] sm:ml-0">
        <SingUpOpt
          email={formData.email}
          onVerify={handleOtpVerification}
          onResend={handleResendOtp}
          error={error}
          setError={setError}
        />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" md:min-h-screen mb-[9.75rem] mt-[5.00rem] flex flex-1 flex-col items-center gap-[2.25rem] px-[3.50rem] md:self-stretch md:px-[1.25rem] overflow-y-auto sm:overflow-x-hidden custom-scrollbar ml-[10rem] sm:ml-0"
    >
      <div className="flex flex-col gap-[1.88rem] h-[80vh] w-[100%]">
        <div className="flex w-[80%] flex-col items-start gap-[0.50rem] md:w-full">
          <Heading
            size="heading7xl"
            as="h1"
            className="text-[2.13rem] font-bold text-text md:text-[2.00rem] sm:text-[1.88rem]"
          >
            Sign Up to Seenyor
          </Heading>
          <Text
            as="p"
            className="w-[76%] text-[1.13rem] font-normal capitalize leading-[1.69rem] text-body md:w-full"
          >
            Select a register type and enter your details to create an account.
          </Text>
        </div>

        <div className="flex w-[80%] flex-col items-start gap-[3.25rem] md:w-full sm:gap-[1.63rem] ">
          <div className="flex flex-col items-start self-stretch">
            <div className="mt-[0.75rem] flex flex-col items-start gap-[0.25rem] self-stretch ">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-text"
              >
                Agent ID
              </Heading>
              <SelectBox
                name="agent_id"
                placeholder="Select Agent ID"
                options={agents}
                value={formData.agent_id}
                onChange={handleInputChange}
                className={`w-[76%] sm:w-full rounded-[12px] !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.75rem]`}
              />
            </div>

            <div className="mt-[0.63rem] flex flex-col items-start gap-[0.38rem] self-stretch">
              <Heading
                size="headingmd"
                as="h3"
                className="text-[1.13rem] font-semibold capitalize text-text"
              >
                Customers E-mail
              </Heading>
              <Input
                type="email"
                name="email"
                placeholder="mail@seenyor.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-[76%] sm:w-full rounded-[12px] !border px-[1.63rem] capitalize !text-text sm:px-[1.25rem]"
              />
            </div>

            <div className="mt-[0.63rem] flex flex-col items-start gap-[0.38rem] self-stretch">
              <Heading
                size="headingmd"
                as="h4"
                className="text-[1.13rem] font-semibold capitalize text-text"
              >
                Customers Name
              </Heading>
              <Input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-[76%] sm:w-full rounded-[12px] !border px-[1.63rem] capitalize !text-text sm:px-[1.25rem]"
              />
            </div>

            <div className="mt-[0.63rem] flex flex-col items-start gap-[0.38rem] self-stretch">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-text"
              >
                Address
              </Heading>
              <Input
                type="text"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-[76%] sm:w-full rounded-[12px] !border px-[1.63rem] capitalize !text-text sm:px-[1.25rem]"
              />
            </div>

            <div className="mt-[0.75rem] flex flex-col items-start gap-[0.25rem] self-stretch">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-text"
              >
                Country
              </Heading>
              <SelectBox
                name="country_id"
                placeholder="Select Country"
                options={countries}
                value={formData.country_id}
                onChange={handleInputChange}
                className={`w-[76%] sm:w-full rounded-[12px] !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.75rem]`}
              />
            </div>

            <div className="mt-[0.75rem] flex flex-col items-start gap-[0.25rem] self-stretch">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-text"
              >
                City
              </Heading>
              <SelectBox
                name="city"
                placeholder="Select City"
                options={cityOptions}
                value={formData.city}
                onChange={handleInputChange}
                className={`w-[76%] sm:w-full rounded-[12px] !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.75rem]`}
                disabled={!formData.country_id}
              />
            </div>

            <div className="mt-[0.63rem] flex flex-col items-start gap-[0.38rem] self-stretch">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-text"
              >
                Phone Number
              </Heading>
              {/* <div className="flex h-[3.75rem] w-[76%] items-center justify-center rounded-[12px]  px-[0.25rem]"> */}
              {/* <Img
                  src="img_flag_of_ireland_svg.png"
                  alt="Flag Of Ireland Svg"
                  width={40}
                  height={20}
                  className="ml-[0.63rem] h-[1.25rem] object-cover"
                /> */}
              <Input
                name="contact_number"
                placeholder="+353"
                type="tel"
                value={formData.contact_number}
                onChange={handleInputChange}
                className={`w-[76%] sm:w-full rounded-[12px] !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.75rem]`}
              />
            </div>

            <div className="mt-[0.63rem] flex flex-col items-start gap-[0.38rem] self-stretch">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-text"
              >
                Password
              </Heading>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-[76%] sm:w-full rounded-[12px] !border px-[1.63rem] capitalize sm:px-[1.25rem]"
              />
            </div>

            <div className="mt-[0.63rem] flex flex-col items-start gap-[0.38rem] self-stretch">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-text"
              >
                Confirm Password
              </Heading>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-[76%] sm:w-full rounded-[12px] !border px-[1.63rem] capitalize sm:px-[1.25rem]"
              />
            </div>

            <Button
              type="submit"
              shape="round"
              color="green_200_green_400_01"
              className=" w-[76%] rounded-[14px] px-[2.13rem] font-semibold sm:px-[1.25rem] mt-3"
            >
              Sign Up
            </Button>

            <Text as="p" className="text-center mt-5 text-lg text-body">
              <span className="inline-flex items-center">
                Already have an account?
                <Link href="/login" className="font-semibold text-primary ml-2">
                  Sign In
                </Link>
              </span>
            </Text>
          </div>
          {error && <Text className="text-red-500">{error}</Text>}
        </div>
      </div>
    </form>
  );
}
