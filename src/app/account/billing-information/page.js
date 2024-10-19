"use client";
import { Button, Heading, Img, Text } from "@/components";
import BillingStatus from "@/components/BillingStatus";
import { useAuth } from "@/context/AuthContext";
import PaymentMethod from "@/modals/PaymentMethod";
import { useUserService } from "@/services/userService"; // Import the user service
import { Suspense, useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import PaymentMethodCard from "./PaymentMethodCard";

function Page() {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const [transactionDetails, setTransactionDetails] = useState(null); // State
  const { setEmail, email, user, accessToken } = useAuth();

  const { getTransactionDetails, subscriptionDetails, getCustomerId } =
    useUserService();
  const [subscriptionDetail, setSubscriptionDetail] = useState(null);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false); // State to track subscription status

  const handleAddressModalToggle = (isOpen) => {
    setIsAddressModalOpen(isOpen);
  };

  const fetchTransactionDetails = async () => {
    let stripeCustomerId;
    try {
      const customerData = await getCustomerId(email);
      stripeCustomerId = customerData.id;
      const details = await getTransactionDetails(stripeCustomerId);

      setTransactionDetails(details); // Store the fetched transaction details
      console.log(details);
    } catch (error) {
      console.error("Failed to fetch transaction details:", error);
    }
  };

  const fetchSubscriptionDetails = async () => {
    try {
      const subscriptionId = localStorage.getItem("subscription_id");
      const details = await subscriptionDetails(subscriptionId);
      setSubscriptionDetail(details);
      console.log(details);
    } catch (error) {
      console.error("Failed to fetch subscription details:", error);
    }
  };

  useEffect(() => {
    if (email) {
      fetchTransactionDetails();
    }
    fetchSubscriptionDetails();
  }, [email]); // Ensure email is loaing

  const handleUnsubscribe = () => {
    setIsUnsubscribed((prev) => !prev); // Toggle the subscription status
  };

  const data = [
    {
      id: 1,
      settingsIcon: "Visa.svg",
      cardDescription: "Visa Ending in 1234",
      cardExpire: "12/25",
      isDefault: true, // Set to true for the default card
    },
    {
      id: 2, // Changed id to be unique
      settingsIcon: "MasterCard.svg",
      cardDescription: "MasterCard ending in 1234",
      cardExpire: "12/25",
      isDefault: false,
    },
    {
      id: 3, // Changed id to be unique
      settingsIcon: "img_settings.svg",
      cardDescription: "Visa ending in 1234",
      cardExpire: "12/25",
      isDefault: false,
    },
    {
      id: 4, // Changed id to be unique
      settingsIcon: "img_settings.svg",
      cardDescription: "Stripe Visa ending in 1234",
      cardExpire: "12/25",
      isDefault: false,
    },
  ];

  return (
    <div className="w-full">
      <PaymentMethod
        isOpen={isAddressModalOpen}
        onChange={handleAddressModalToggle}
      />
      {/* Edit Profile Card */}
      <Tabs
        className="flex flex-1 flex-col gap-[2.50rem] self-center md:self-stretch cursor-pointer"
        selectedTabClassName="!text-text bg-gray-100 rounded-[18px]"
        selectedTabPanelClassName="!relative tab-panel--selected"
      >
        <div className="flex flex-col gap-2 self-stretch border-b border-border pb-4 md:items-center ">
          <Heading
            size="text3xl"
            as="h6"
            className="text-[1.8rem] font-medium text-[#1d293f] md:text-[1.55rem]"
          >
            Billing Information
          </Heading>
          <Text
            as="p"
            className="text-lg font-normal leading-6 text-[#6c7482] md:text-center"
          >
            Update your email and manage your account
          </Text>
        </div>
        {/* Tabs List */}
        <TabList className="flex gap-4 md:gap-1 text-[#6c7482] w-[34.37rem] md:w-full sm:text-[0.8rem] md:items-center md:justify-center">
          <Tab className="px-[0.88rem] py-[0.38rem] text-[1.00rem] sm:text-[0.8rem] font-normal text-[#6c7482]">
            Overview
          </Tab>
          <Tab className="px-[0.88rem] py-[0.38rem] text-[1.00rem] sm:text-[0.8rem] font-normal">
            History
          </Tab>
          <Tab className="px-[0.88rem] py-[0.38rem] text-[1.00rem] sm:text-[0.8rem] font-normal">
            Payment Methods
          </Tab>
        </TabList>

        {/* Tab Panels */}
        <TabPanel className="absolute items-center md:justify-center md:items-center ">
          <div className="w-full">
            <div className="flex flex-col gap-4 pb-10">
              {/* Billing Overview */}
              <div className="flex flex-col items-start gap-1 md:items-center">
                <Heading
                  as="p"
                  className="text-[1.50rem] font-medium text-text md:text-[1.38rem]"
                >
                  Seenyor <span className="text-primary">Pro</span>
                </Heading>
                <Text
                  as="p"
                  className="text-[1.13rem] font-normal text-[#6c7482]"
                >
                  Subscription Status:{" "}
                  <span
                    className={`font-medium capitalize ${
                      !isUnsubscribed ? "text-primary" : "text-[#FF0000]"
                    }`}
                  >
                    {/* {!isUnsubscribed ? "Active" : "Inactive"} */}
                    {subscriptionDetail?.status}
                  </span>
                </Text>
                <Text
                  as="p"
                  className="text-[1.13rem] font-normal text-[#6c7482]"
                >
                  Billing Amount:{" "}
                  <span className="font-medium capitalize text-[#1d293f]">
                    {subscriptionDetail?.items?.data[0]?.plan
                      ? `${
                          subscriptionDetail?.items?.data[0]?.plan?.amount / 100
                        }/
                      ${subscriptionDetail?.items?.data[0]?.plan?.interval}`
                      : "... ..."}
                  </span>
                </Text>
              </div>

              {/* Cancel Subscription */}
              {!isUnsubscribed ? (
                <div className="flex items-center justify-between gap-[1.25rem] rounded-[14px] bg-orange-50 px-[1.13rem] py-[0.88rem] md:flex-col ">
                  <div className="flex w-full flex-col items-start md:w-full md:items-center md:text-center">
                    <Heading
                      size="headingmd"
                      as="h6"
                      className="text-[1.19rem] font-semibold !text-[#f6ac00]"
                    >
                      Cancel Subscription
                    </Heading>
                    <Text
                      as="p"
                      className="w-full text-[0.88rem] font-normal leading-[1.31rem] text-[#6c7482]"
                    >
                      Once you cancel a subscription, you can renew it anytime
                      later.
                    </Text>
                  </div>
                  <Button
                    variant="fill"
                    shape="round"
                    onClick={handleUnsubscribe}
                    className="min-w-[9.88rem] rounded-[14px] px-[1.75rem] text-white font-semibold sm:px-[1.25rem] bg-amber-a700"
                  >
                    Unsubscribe
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-[1.25rem] rounded-[14px] bg-red-50 px-[1.13rem] py-[0.88rem] md:flex-col">
                  <div className="flex w-full flex-col items-start md:w-full md:items-center md:text-center">
                    <Heading
                      size="headingmd"
                      as="h6"
                      className="text-[1.19rem] font-semibold !text-[#FF0000]" // Changed text color to red
                    >
                      Renew Subscription
                    </Heading>
                    <Text
                      as="p"
                      className="w-full text-[0.88rem] font-normal leading-[1.31rem] text-[#6c7482]"
                    >
                      Your subscription has expired. Renew it now to avoid any
                      service interruptions.
                    </Text>
                  </div>
                  <Button
                    variant="fill"
                    shape="round"
                    onClick={handleUnsubscribe}
                    className="min-w-[6.88rem] rounded-[14px] px-[1.75rem] text-white font-semibold sm:px-[1.25rem] bg-[#FF0000]" // Changed button color to red
                  >
                    Renew
                  </Button>
                </div>
              )}
              {/* Billing Date */}
              <Text
                as="p"
                className="text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] md:text-center "
              >
                Your service will renew on{" "}
                <span className="font-medium text-[#1d293f]">
                  {subscriptionDetail?.current_period_end
                    ? new Date(
                        subscriptionDetail.current_period_end * 1000
                      ).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </span>{" "}
                for
                <span className="font-medium text-[#1d293f]">
                  {" "}
                  {""}$
                  {subscriptionDetail?.items?.data[0]?.plan?.amount
                    ? subscriptionDetail?.items?.data[0]?.plan?.amount / 100
                    : "... .."}
                </span>
                . Renewal price includes applicable taxes.
              </Text>
            </div>
            <div className="flex flex-col items-start gap-[0.63rem] pb-10 md:items-center">
              <Heading
                size="text2xl"
                as="p"
                className="text-[1.50rem] font-medium text-[#1d293f] md:text-[1.38]"
              >
                Billing Information
              </Heading>
              <div className="flex flex-col items-start gap-[0.38rem] self-stretch">
                <Text
                  as="p"
                  className="text-[1.13rem] font-normal text-[#1d293f]  md:text-center "
                >
                  Your upcoming charges will be billed to the card
                </Text>
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel className="absolute items-center">
          <BillingStatus transactionDetails={transactionDetails} />{" "}
          {/* Pass transaction details */}
        </TabPanel>

        <TabPanel className="absolute items-center w-[34.37rem] md:w-full">
          <div className="w-full">
            <div className="flex flex-col gap-[1.25rem]">
              <div className="flex items-center md:flex-col justify-between gap-[1.25rem]">
                <Heading
                  size="text2xl"
                  as="p"
                  className="text-[1.50rem] font-medium text-text md:text-[1.38rem]"
                >
                  Added Methods (04)
                </Heading>

                <Button
                  shape="round"
                  variant="fill"
                  onClick={() => handleAddressModalToggle(true)}
                  leftIcon={
                    <Img
                      src="plus.svg"
                      width={24}
                      height={24}
                      alt="Frame"
                      className="h-[1.50rem] w-[1.50rem]"
                    />
                  }
                  className="min-w-[14.63rem] gap-[1.00rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem] bg-[#f1f8f5] text-primary"
                >
                  Add New Method
                </Button>
              </div>

              <div className="flex flex-col gap-[0.75rem]">
                <Suspense fallback={<div>Loading feed...</div>}>
                  {data.map((card) => (
                    <PaymentMethodCard
                      key={card.id}
                      settingsIcon={card.settingsIcon}
                      cardDescription={card.cardDescription}
                      cardExpiry={card.cardExpire}
                      defaultMethodText={
                        card.isDefault ? "Default Method" : "Set As Default"
                      }
                      className={`${
                        card.isDefault ? "!bg-[#f1f8f5]" : "bg-white"
                      }`}
                    />
                  ))}
                </Suspense>
              </div>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Page;
