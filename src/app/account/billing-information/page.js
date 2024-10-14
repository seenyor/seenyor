"use client";
import { Button, Heading, Img, Text } from "@/components";
import BillingStatus from "@/components/BillingStatus";
import { Suspense } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import PaymentMethodCard from "./PaymentMethodCard";

function Page() {
  const data = [
    {
      id: 1,
      SettingsIcon: "img_settings.svg",
      cardDescription: "visa ending in 1234",
      cardExpire: "12/25",
      isDefault: true,
    },
    {
      id: 1,
      SettingsIcon: "img_settings.svg",
      cardDescription: "visa ending in 1234",
      cardExpire: "12/25",
      isDefault: true,
    },
    {
      id: 1,
      SettingsIcon: "img_settings.svg",
      cardDescription: "visa ending in 1234",
      cardExpire: "12/25",
      isDefault: true,
    },
    {
      id: 1,
      settingsIcon: "img_settings.svg",
      cardDescription: "visa ending in 1234",
      cardExpire: "12/25",
      isDefault: true,
    },
  ];
  return (
    <div className="w-full flex">
      {/* Edit Profile Card */}
      <Tabs
        className="flex flex-1 flex-col gap-[2.50rem] self-center md:self-stretch cursor-pointer"
        selectedTabClassName="!text-text bg-gray-100 rounded-[18px]"
        selectedTabPanelClassName="!relative tab-panel--selected"
      >
        <div className="flex flex-col gap-2 self-stretch border-b border-border pb-4">
          <Heading
            size="text3xl"
            as="h6"
            className="text-2xl font-medium text-text md:text-2xl sm:text-xl"
          >
            Billing Information
          </Heading>
          <Text as="p" className="text-lg font-normal leading-6 text-body">
            Update your email and manage your account
          </Text>
        </div>
        {/* Tabs List */}
        <TabList className="flex flex-wrap justify-center gap-[0.06rem]">
          <Tab className="px-[0.88rem] py-[0.38rem] text-[1.00rem] font-normal text-body">
            Overview
          </Tab>
          <Tab className="px-[0.88rem] py-[0.38rem] text-[1.00rem] font-normal text-body">
            History
          </Tab>
          <Tab className="px-[0.88rem] py-[0.38rem] text-[1.00rem] font-normal text-body">
            Billing Emails
          </Tab>
          <Tab className="px-[0.88rem] py-[0.38rem] text-[1.00rem] font-normal text-body">
            Payment Methods
          </Tab>
        </TabList>

        {/* Tab Panels */}
        <TabPanel className="absolute items-center">
          <div className="w-full">
            <div className="flex flex-col gap-4 pb-10">
              {/* Billing Overview */}
              <div className="flex flex-col items-start gap-1">
                <Heading
                  as="p"
                  className="text-[1.50rem] font-medium text-text md:text-[1.38rem]"
                >
                  Seenyor <span className="text-primary">Pro</span>
                </Heading>
                <Text as="p" className="text-[1.13rem] font-normal text-body">
                  Subscription Status:{" "}
                  <span className="font-medium text-primary">Active</span>
                </Text>
                <Text as="p" className="text-[1.13rem] font-normal text-body">
                  Billing Amount:{" "}
                  <span className="font-medium text-text">$40</span>/Monthly
                </Text>
              </div>

              {/* Cancel Subscription */}
              <div className="flex items-center justify-between gap-[1.25rem] rounded-[14px] bg-orange-50 px-[1.13rem] py-[0.88rem] sm:flex-col">
                <div className="flex w-[60%] flex-col items-start sm:w-full">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="text-[1.19rem] font-semibold text-amber-a700"
                  >
                    Cancel Subscription
                  </Heading>
                  <Text
                    as="p"
                    className="w-full text-[0.88rem] font-normal leading-[1.31rem] text-gray-900_99"
                  >
                    Once you cancel a subscription, you can renew it anytime
                    later.
                  </Text>
                </div>
                <Button
                  variant="fill"
                  shape="round"
                  className="min-w-[9.88rem] rounded-[14px] px-[1.75rem] text-white font-semibold sm:px-[1.25rem] bg-amber-a700"
                >
                  Unsubscribe
                </Button>
              </div>

              {/* Billing Date */}
              <Text
                as="p"
                className="text-[1.13rem] font-normal leading-[1.69rem] text-body"
              >
                Your service will renew on{" "}
                <span className="font-medium text-text">May 8, 2024</span> for
                <span className="font-medium text-text">$800</span>. Renewal
                price includes applicable taxes.
              </Text>
            </div>
            <div className="flex flex-col items-start gap-[0.63rem] pb-10">
              <Heading
                size="text2xl"
                as="p"
                className="text-[1.50rem] font-medium text-text md:text-[1.38]"
              >
                Billing Information
              </Heading>
              <div className="flex flex-col items-start gap-[0.38rem] self-stretch">
                <Text as="p" className="text-[1.13rem} font-normal text-body">
                  Your upcoming charges will be billed to the card
                </Text>
              </div>
            </div>
            {/* Billing Emails */}
            <div className="flex flex-col gap-[0.63rem]">
              <Heading
                as="p"
                className="text-[1.50rem] font-medium text-text md:text-[1.38rem]"
              >
                Billing Emails
              </Heading>
              <Text as="p" className="text-[1.13rem] font-normal text-body">
                Billing emails are sent to:
              </Text>
              <div className="flex flex-wrap gap-[0.63rem]">
                <Text as="p" className="text-[1.13rem] font-medium text-text">
                  example1@gmail.com
                </Text>
                <Text as="p" className="text-[1.13rem] font-medium text-text">
                  ,
                </Text>
                <Text as="p" className="text-[1.13rem] font-medium text-text">
                  example2@gmail.com
                </Text>
                <Text as="p" className="text-[1.13rem] font-medium text-text">
                  ,
                </Text>
                <Text as="p" className="text-[1.13rem] font-medium text-text">
                  example3@gmail.com
                </Text>
              </div>
              <Heading
                as="p"
                className="text-[0.88rem] font-medium text-primary underline"
              >
                Manage Emails
              </Heading>
            </div>
          </div>
        </TabPanel>
        <TabPanel className="absolute items-center">
          <BillingStatus />
        </TabPanel>

        <TabPanel className="absolute items-center">
          <div className="w-full">
            <div className="flex flex-col gap-4 pb-10">
              {/* Billing Emails Content */}
              <Heading
                as="h3"
                className="text-[1.50rem] font-medium text-text md:text-[1.38rem]"
              >
                Billing Emails
              </Heading>
              <Text as="p" className="text-[1.13rem] font-normal text-body">
                Billing emails are sent to the following addresses:
              </Text>
              <ul className="list-disc pl-5">
                <li>example1@gmail.com</li>
                <li>example2@gmail.com</li>
                <li>example3@gmail.com</li>
              </ul>
              <Text as="p" className="text-[1.13rem] font-normal text-body">
                You can manage your billing email preferences in your account
                settings.
              </Text>
            </div>
          </div>
        </TabPanel>

        <TabPanel className="absolute items-center">
          <div className="w-full">
            <div className="flex flex-col gap-[1.25rem]">
              <div className="flex items-center justify-between gap-[1.25rem]">
                <Heading
                  size="text2xl"
                  as="p"
                  className="text-[1.50rem] font-medium text-text md:text-[1.38rem]"
                >
                  Added Methods (04)
                </Heading>

                <Button
                  color="bg-gray_100_02"
                  shape="round"
                  leftIcon={
                    <Img
                      src="img_frame_primary.svg"
                      width={24}
                      height={24}
                      alt="Frame"
                      className="h-[1.50rem] w-[1.50rem]"
                    />
                  }
                  className="min-w-[14.63rem] gap-[1.00rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem] bg-gray_100_02"
                >
                  Add New Method
                </Button>
              </div>

              <div className="flex flex-col gap-[0.75rem]">
                <Suspense fallback={<div>Loading feed...</div>}>
                  {data.map((d, index) => (
                    <PaymentMethodCard
                      {...d}
                      key={`checkboxgroup${index}`}
                      className="border-green-200 bg-gray-100_02"
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
