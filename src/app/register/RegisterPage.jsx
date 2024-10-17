"use client";
import SingUpOpt from "@/components/SingUpOpt";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Heading, Input, Text } from "../../components";
import { useUserService } from "../../services/userService";

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

const SelectBox = forwardRef(
  ({ name, placeholder, options = [], onChange, className, ...rest }, ref) => (
    <select
      ref={ref}
      name={name}
      onChange={onChange}
      className={className}
      {...rest}
    >
      <option value="">{placeholder}</option>
      {Array.isArray(options) &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  )
);

SelectBox.displayName = "SelectBox";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setValue,
    watch,
    reset,
  } = useForm();
  const router = useRouter();
  const { registerUser, verifyOtp, resendOtp, getCountries, getAgents } =
    useUserService();
  const [countries, setCountries] = useState([]);
  const [agents, setAgents] = useState([]);
  const { setEmail, email, user } = useAuth();
  const [error, setError] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch countries
        console.log("Fetching countries...");
        const countriesResponse = await getCountries();
        console.log("Countries response:", countriesResponse);

        if (
          countriesResponse &&
          countriesResponse.data &&
          Array.isArray(countriesResponse.data)
        ) {
          const formattedCountries = countriesResponse.data.map((country) => ({
            label: country.country_name,
            value: country._id,
          }));
          setCountries(formattedCountries);
          console.log("Formatted countries:", formattedCountries);
        } else {
          console.error("Invalid country data structure:", countriesResponse);
          throw new Error(
            "Invalid country data structure received from the API"
          );
        }

        // Fetch agents
        console.log("Fetching agents...");
        const agentsResponse = await getAgents();
        console.log("Agents response:", agentsResponse);

        if (
          agentsResponse &&
          agentsResponse.data &&
          Array.isArray(agentsResponse.data)
        ) {
          const formattedAgents = agentsResponse.data.map((agent) => ({
            label: `${agent.agent_id}`,
            value: agent.agent_id,
          }));
          setAgents(formattedAgents);
          console.log("Formatted agents:", formattedAgents);
        } else {
          console.error("Invalid agent data structure:", agentsResponse);
          throw new Error("Invalid agent data structure received from the API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          console.error("Error response:", error.response.data);
          console.error("Error status:", error.response.status);
        }
        setError("Failed to load necessary data. Please try again.");
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data) => {
    // // Perform client-side validation
    // const validationErrors = validateForm(data);
    // if (Object.keys(validationErrors).length > 0) {
    //   // Set errors in the form
    //   Object.keys(validationErrors).forEach(key => {
    //     setError(key, {
    //       type: "manual",
    //       message: validationErrors[key]
    //     });
    //   });
    //   return; // Stop submission if there are validation errors
    // }
    const formattedData = {
      agent_id: data.agent_id,
      email: data.endUser_email,
      name: data.endUser_first_name,
      last_name: data.endUser_last_name,
      address: data.endUser_address,
      address2: data.endUser_address_2,
      city: data.endUser_city,
      country_id: data.endUser_country_id,
      post_Code: data.endUser_zipcode,
      state: data.endUser_state,
      contact_number: data.endUser_contact_number,
      password: data.password,
      customer_info: {
        country_id: data.customer_country_id,
        name: data.customer_first_name,
        last_name: data.customer_last_name,
        contact_number: data.customer_contact_number,
        address: data.customer_address,
        address2: data.customer_address_2,
        city: data.customer_city,
        post_Code: data.customer_zipcode,
        state: data.customer_state,
        email: data.customer_email,
        agent_name: data.agent_name,
        installation_date: data.installation_date,
        elderly_Count: data.live_with === "alone" ? 1 : 2, // Assuming "alone" means 1, otherwise 2
        lead: data.source_lead,
        installer_id: data.customer_country_id, // Using customer's country_id as installer_id for now
      },
    };
    localStorage.setItem("agent_id", JSON.stringify(data.agent_id));
    localStorage.setItem(
      "user_address",
      JSON.stringify({
        address: formattedData.address,
        address2: formattedData.address2,
        city: formattedData.city,
        country: formattedData.country_id,
        postal_code: formattedData.post_Code,
        state: formattedData.state,
      })
    );
    try {
      setError("");
      const response = await registerUser(formattedData);
      if (response.status) {
        setEmail(formattedData.email);
        localStorage.setItem(
          "user_credentials",
          JSON.stringify({
            email: formattedData.email,
            password: formattedData.password,
          })
        );
        setIsOtpSent(true);
        reset();
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
        email,
        otp: otp,
      });
      if (response.status) {
        setIsOtpVerified(true);
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
        email,
      });
      if (response.status) {
        setError("");
      } else {
        setError(response.message || "Failed to resend OTP. Please try again.");
      }
    } catch (err) {
      setError(err.message || "An error occurred while resending OTP");
    }
  };

  if (isOtpSent && !isOtpVerified) {
    return (
      <SingUpOpt
        setIsOtpPageOpen={setIsOtpSent}
        email={email}
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
          options={
            name === "badge_id"
              ? agents
              : name.includes("country")
              ? countries
              : options
          }
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
                      label: "First Name",
                      name: "customer_first_name",
                      type: "text",
                      placeholder: "First name",
                    })}
                    {renderField({
                      label: "Last Name",
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
                      placeholder: "Enter Phone Number",
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
                      type: "text",
                      placeholder: "City",
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
                      type: "text",
                      placeholder: "City",
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
                      // required: false,
                    })}
                    {renderField({
                      label: "Agent ID",
                      name: "agent_id",
                      type: "text",
                      placeholder: "Agent ID",
                      required: true,
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
                    type: "text",
                    placeholder: "Type of Lead",
                    // options: SourceofLeads,
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
                    type: "password",
                    placeholder: "Password",
                  })}
                  {renderField({
                    label: "Confirm Password",
                    name: "confirm_password",
                    type: "password",
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
