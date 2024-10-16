"use client";
import Logo from "@/components/Logo";
import SingUpOpt from "@/components/SingUpOpt";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useRef, useState } from "react";
import { Button, Heading, Input, Text } from "../../components";
import { useUserService } from "../../services/userService";

// Custom SelectBox component
const SelectBox = forwardRef(
  ({ name, placeholder, options, onChange, disabled, className }, ref) => {
    const handleChange = (e) => {
      onChange({
        target: {
          name,
          value: e.target.value,
          type: "select-one",
        },
      });
    };

    return (
      <select
        ref={ref}
        name={name}
        onChange={handleChange}
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
  }
);

SelectBox.displayName = "SelectBox";

// Sample data for dropdowns
const countries = [
  { label: "United States", value: "66ec80829adf64ab302207f0" },
  { label: "United Kingdom", value: "66ec80829adf64ab302207f1" },
  { label: "Canada", value: "66ec80829adf64ab302207f2" },
  { label: "Australia", value: "66ec80829adf64ab302207f3" },
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
  const { setEmail, user } = useAuth();
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

  const formRefs = {
    country_id: useRef(null),
    name: useRef(null),
    email: useRef(null),
    password: useRef(null),
    confirmPassword: useRef(null),
    contact_number: useRef(null),
    address: useRef(null),
    agent_id: useRef(null),
    city: useRef(null),
  };

  useEffect(() => {
    if (formData.country_id) {
      setCityOptions(cities[formData.country_id] || []);
    } else {
      setCityOptions([]);
    }
  }, [formData.country_id]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (type === "select-one") {
      if (name === "country_id") {
        setFormData((prevState) => ({
          ...prevState,
          city: "",
          cityLabel: "",
        }));
      }
    }
  };

  
  const validateForm = () => {
    if (!formData.name) return "Name is required.";
    if (!formData.email) return "Email is required.";
    if (!formData.password) return "Password is required.";
    if (formData.password !== formData.confirmPassword) return "Passwords do not match.";
    if (!formData.contact_number) return "Contact number is required.";
    if (!formData.address) return "Address is required.";
    if (!formData.country_id) return "Country is required.";
    if (!formData.city) return "City is required.";
    if (!formData.agent_id) return "Agent ID is required.";
    return ""; // No errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return; // Prevent submission if there are validation errors
    }

    const currentFormData = Object.keys(formRefs).reduce((acc, key) => {
      if (formRefs[key].current) {
        acc[key] = formRefs[key].current.value;
      } else {
        console.warn(`Ref for ${key} is not attached to an element`);
        acc[key] = "";
      }
      return acc;
    }, {});
  
    if (currentFormData.password !== currentFormData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
  
    try {
      const { confirmPassword, ...dataToSend } = currentFormData;
      const response = await registerUser(dataToSend);
      if (response.success) {
        setFormData(prevState => ({ ...prevState, email: currentFormData.email }));
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
        email: formData.email,
        otp: otp,
      });
      if (response.success) {
        router.push("/payment");
      } else {
        setError(response.message || "OTP verification failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred during OTP verification");
    }
  };
  
  const handleResendOtp = async () => {
    try {
      const response = await resendOtp({
        email: formData.email,
      });
      if (response.success) {
        setError("");
      } else {
        setError(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while resending OTP");
    }
  };

  if (isOtpSent) {
    return (
      <SingUpOpt
        email={formData.email}
        onVerify={handleOtpVerification}
        onResend={handleResendOtp}
        error={error}
        setError={setError}
      />
    );
  }

  return (
    <>
      <Logo />
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
              Select a register type and enter your details to create an
              account.
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
                  onChange={handleInputChange}
                  className={`w-[76%] sm:w-full rounded-[12px] !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.75rem]`}
                  ref={formRefs.agent_id}
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
                  ref={formRefs.email}
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
                  ref={formRefs.name}
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
                  ref={formRefs.address}
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
                  onChange={handleInputChange}
                  className={`w-[76%] sm:w-full rounded-[12px] !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.75rem]`}
                  ref={formRefs.country_id}
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
                  onChange={handleInputChange}
                  className={`w-[76%] sm:w-full rounded-[12px] !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.75rem]`}
                  disabled={!formData.country_id}
                  ref={formRefs.city}
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
                <Input
                  name="contact_number"
                  placeholder="+353"
                  type="tel"
                  ref={formRefs.contact_number}
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
                  ref={formRefs.password}
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
                  ref={formRefs.confirmPassword}
                  onChange={handleInputChange}
                  className="w-[76%] sm:w-full rounded-[12px] !border px-[1.63rem] capitalize sm:px-[1.25rem]"
                />
              </div>
              <Button
                type="submit"
                shape="round"
                color="green_200_green_400_01"
                className=" w-[76%] sm:w-full rounded-[14px] px-[2.13rem] font-semibold sm:px-[1.25rem] mt-3"
              >
                Sign Up
              </Button>
              {error && (
                <Text className="text-red-500 text-center">{error}</Text>
              )}
              <Text
                as="p"
                className="text-center mt-5 text-lg text-body w-[75%] md:pb-2 md:w-auto"
              >
                <span className="inline-flex items-center">
                  Already have an account?
                  <Link
                    href="/login"
                    className="font-semibold text-primary ml-2"
                  >
                    Sign In
                  </Link>
                </span>
              </Text>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
