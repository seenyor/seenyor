"use client";
import Logo from "@/components/Logo";
import SingUpOpt from "@/components/SingUpOpt";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
const liveWith = [
  { label: "Alone", value: "0" },
  { label: "With Someone", value: "0" },
];
const SourceofLeads = [
  { label: "Sales Agent", value: "sales_agent" },
  { label: "Distributor", value: "distributor" },
  { label: "Monitoring Station", value: "monitoring_station" },
  { label: "Installer", value: "installer" },
  { label: "Nursing Home", value: "nursing_home" },
];

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
  } = useForm();
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
    console.log(name);

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
  //updated form data with all necessary validation
  const onSubmit = (e) => {
    console.log(e);
  };
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError("");

  //   const currentFormData = Object.keys(formRefs).reduce((acc, key) => {
  //     if (formRefs[key].current) {
  //       acc[key] = formRefs[key].current.value;
  //     } else {
  //       console.warn(`Ref for ${key} is not attached to an element`);
  //       acc[key] = "";
  //     }
  //     return acc;
  //   }, {});

  //   if (currentFormData.password !== currentFormData.confirmPassword) {
  //     setError("Passwords do not match");
  //     return;
  //   }

  //   try {
  //     const { confirmPassword, ...dataToSend } = currentFormData;
  //     const response = await registerUser(dataToSend);
  //     if (response.success) {
  //       setFormData((prevState) => ({
  //         ...prevState,
  //         email: currentFormData.email,
  //       }));
  //       setIsOtpSent(true);
  //     } else {
  //       setError(response.message || "Registration failed. Please try again.");
  //     }
  //   } catch (err) {
  //     setError(err.message || "An error occurred during registration");
  //   }
  // };

  const handleOtpVerification = async (otp) => {
    try {
      const response = await verifyOtp({
        email: formData.email,
        otp: otp,
      });
      if (response.success) {
        router.push("/payment");
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

  // Watch the password field for validation in confirm password
  const password = watch("password");
  // Helper function to render form fields
  const renderField = ({
    label,
    name,
    type,
    placeholder,
    options,
    required = true,
    customErrorMessage,
    validate,
  }) => (
    <div className="w-full flex flex-col items-start gap-[0.25rem] self-stretch">
      <Heading
        size="headingmd"
        as="h6"
        className="text-[1.13rem] font-semibold capitalize text-text"
      >
        {label}{" "}
        {required ? null : (
          <span className="text-sm font-normal italic">(optional)</span>
        )}
      </Heading>

      {type === "select" ? (
        <SelectBox
          name={name}
          placeholder={placeholder}
          options={options}
          {...register(name, { required })}
          onChange={(e) => {
            setValue(name, e.target.value);
            trigger(name);
          }}
          className={`w-full rounded-[12px] !border border-solid border-gray-200 px-[1.63rem] capitalize !text-text sm:px-[1.25rem] h-[3.75rem] bg-white`}
        />
      ) : (
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          {...register(name, { required, validate })}
          className={`w-full rounded-[12px] !border px-[1.63rem] capitalize !text-text sm:px-[1.25rem] bg-white ${
            type === "date" ? "!text-slate-500" : ""
          }`}
        />
      )}

      {errors[name] && (
        <p className="text-red-500 text-xs">
          {customErrorMessage
            ? customErrorMessage
            : errors[name].message || `${label} is required`}
        </p>
      )}
    </div>
  );

  return (
    <>
      <Logo />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className=" md:min-h-screen mb-[9.75rem] mt-[2rem] flex flex-1 flex-col items-center gap-[2.25rem] px-[3.50rem] md:self-stretch md:px-[1.25rem] sm:overflow-x-hidden custom-scrollbar "
      >
        <div className="flex flex-col gap-[1.88rem] max-w-[800px] w-full">
          <div className="flex w-full flex-col items-center justify-center gap-[0.50rem] md:w-full">
            <Heading
              size="heading7xl"
              as="h1"
              className="text-[2.13rem] font-bold text-text md:text-[2.00rem] sm:text-[1.88rem]"
            >
              Sign Up to Seenyor
            </Heading>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-[3.25rem] md:w-full sm:gap-[1.63rem] ">
            <div className="flex flex-col items-center self-stretch gap-7">
              {/* <============= Customer Information Fields - S.1 ==============> */}
              <div
                id="Customer_info"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <Heading size="heading3xl" as="h2">
                  Customer Information
                </Heading>
                <div id="Fields" className="flex flex-col gap-4">
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "Last Name",
                      name: "customer_first_name",
                      type: "text",
                      placeholder: "First name",
                    })}
                    {renderField({
                      label: "First Name",
                      name: "customer_last_name",
                      type: "text",
                      placeholder: "Last name",
                    })}
                  </div>
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "E-mail",
                      name: "customer_email",
                      type: "text",
                      placeholder: "E-Mail Address",
                    })}
                    {renderField({
                      label: "Phone Number",
                      name: "customer_contact_number",
                      type: "tel",
                      placeholder: "+353",
                    })}
                  </div>

                  {renderField({
                    label: "Address",
                    name: "customer_address",
                    type: "text",
                    placeholder: "Address  Line 1",
                  })}
                  {renderField({
                    label: "address Line 2",
                    name: "customer_address_2",
                    type: "text",
                    required: false,
                    placeholder: "Address  Line 2",
                  })}

                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "Country",
                      name: "customer_country_id",
                      type: "select",
                      placeholder: "Select Country",
                      options: countries,
                    })}
                    {renderField({
                      label: "City",
                      name: "customer_city",
                      type: "tel",
                      placeholder: "+353",
                    })}
                  </div>
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "Postal / Zip Code",
                      name: "customer_zipcode",
                      type: "text",
                      placeholder: "Zip Code",
                    })}
                    {renderField({
                      label: "State / Province",
                      name: "customer_state",
                      type: "text",
                      placeholder: "State Name",
                    })}
                  </div>
                </div>
              </div>
              {/* <============= End User Information Fields - S.2 ==============> */}
              <div
                id="EndUser_info"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <div>
                  <Heading size="heading3xl" as="h2">
                    End-User Information
                  </Heading>
                  <Text
                    as="p"
                    className="w-[76%] text-[1rem] font-normal capitalize leading-[1.69rem] text-body md:w-full text-slate-500"
                  >
                    Information about the end-user and Installation address
                  </Text>
                </div>
                <div id="Fields" className="flex flex-col gap-4">
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "Last Name",
                      name: "endUser_first_name",
                      type: "text",
                      placeholder: "First name",
                    })}
                    {renderField({
                      label: "First Name",
                      name: "endUser_last_name",
                      type: "text",
                      placeholder: "Last name",
                    })}
                  </div>
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "E-mail",
                      name: "endUser_email",
                      type: "text",
                      placeholder: "E-Mail Address",
                    })}
                    {renderField({
                      label: "Phone Number",
                      name: "endUser_contact_number",
                      type: "tel",
                      placeholder: "+353",
                    })}
                  </div>

                  {renderField({
                    label: "Address",
                    name: "endUser_address",
                    type: "text",
                    placeholder: "Address  Line 1",
                  })}
                  {renderField({
                    label: "address Line 2",
                    name: "endUser_address_2",
                    type: "text",
                    required: false,
                    placeholder: "Address  Line 2",
                  })}

                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "Country",
                      name: "endUser_country_id",
                      type: "select",
                      placeholder: "Select Country",
                      options: countries,
                    })}
                    {renderField({
                      label: "City",
                      name: "endUser_city",
                      type: "tel",
                      placeholder: "+353",
                    })}
                  </div>
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "Postal / Zip Code",
                      name: "endUser_zipcode",
                      type: "text",
                      placeholder: "Zip Code",
                    })}
                    {renderField({
                      label: "State / Province",
                      name: "endUser_state",
                      type: "text",
                      placeholder: "State Name",
                    })}
                  </div>
                </div>
              </div>
              {/* <============= Preferred Installation Date - S.3 ==============> */}
              <div
                id="Installation_Date"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <div id="Fields" className="flex flex-col">
                  {renderField({
                    label: "Preferred Installation Date",
                    name: "installation_date",
                    type: "date",
                  })}
                </div>
              </div>
              {/* <============= Agent Name and Badge ID - S.4 ==============> */}
              <div
                id="Agent_Name&Badge_ID"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <div id="Fields" className="flex flex-col">
                  <div
                    id="Field_Group"
                    className="flex gap-4 w-full sm:flex-col sm:gap-1"
                  >
                    {renderField({
                      label: "Sales Agent Name",
                      name: "agent_name",
                      type: "text",
                      placeholder: "Agent Name",
                      required: false,
                    })}
                    {renderField({
                      label: "Badge ID",
                      name: "badge_id",
                      type: "text",
                      placeholder: "Agent ID",
                      required: false,
                    })}
                  </div>
                </div>
              </div>
              {/* <============= Live With - S.5 ==============> */}
              <div
                id="Live_With"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <div id="Fields" className="flex flex-col">
                  {renderField({
                    label: "Live alone or with someone?",
                    name: "live_with",
                    type: "select",
                    placeholder: "Select",
                    options: liveWith,
                    required: false,
                  })}
                </div>
              </div>
              {/* <============= Source of Lead - S.6 ==============> */}
              <div
                id="Live_With"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <div id="Fields" className="flex flex-col">
                  {renderField({
                    label: "Source of Lead",
                    name: "source_lead",
                    type: "select",
                    placeholder: "Select",
                    options: SourceofLeads,
                    required: false,
                  })}
                </div>
              </div>
              {/* <============= Password - S.7 ==============> */}
              <div
                id="Password"
                className="w-full flex flex-col gap-2 p-8 bg-[#F6F7F7] rounded-3xl"
              >
                <div id="Fields" className="flex flex-col gap-4">
                  {renderField({
                    label: "Password",
                    name: "password",
                    type: "text",
                    placeholder: "Password",
                  })}
                  {renderField({
                    label: "Confirm Password",
                    name: "confirm_password",
                    type: "text",
                    placeholder: "Confirm Password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                </div>
              </div>
              <div className="w-full flex flex-col items-center">
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
        </div>
      </form>
    </>
  );
}
