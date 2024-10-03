"use client";
import { useCallback, useEffect, useState } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import dynamic from "next/dynamic";
import ProductAction from "./ProductAction";
import { Button, Heading, Img, Text } from "../../components";
import {
  PlusCircledIcon,
  MinusCircledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import RadioButtonGroup from "./RadioGroupFInstallation";
import TermsCheckbox from "./TermsCheckbox ";
import "./style.css";
export default function HomePage() {
  let [kitPrice, setKitPrice] = useState(1100);
  let [installationPrice, setInstallationPrice] = useState(300);
  let [addonDevicePrice, setAddonDevicePrice] = useState(400);
  let [total, setTotal] = useState(0);
  let [quantity, setQuantity] = useState(0);
  const [selecteInstallation, setselecteInstallation] = useState(1);
  const [isChecked, setIsChecked] = useState(false);

  //TOtal Price
  useEffect(() => {
    const calculatedTotal =
      kitPrice +
      (selecteInstallation === 1 ? installationPrice : 0) +
      addonDevicePrice * quantity;
    setTotal(calculatedTotal);
  }, [
    kitPrice,
    installationPrice,
    selecteInstallation,
    addonDevicePrice,
    quantity,
  ]);

  return (
    <div className="flex w-full flex-col gap-10 bg-white p-5">
      <div
        id="PageHeader"
        className=" w-full p-4 flex items-center justify-center"
      >
        <Img
          src="img_group_1.svg"
          width={156}
          height={32}
          alt="Group 1"
          className="h-[2.00rem] w-[12%] md:w-[30%] object-contain"
        />
      </div>

      <div
        id="Required_Products_Section"
        className="relative flex flex-col gap-2 md:gap-6 items-center justify-center bg-[#F1F1F2] max-w-7xl my-0 mx-auto w-full p-10 rounded-xl px-16 md:p-5"
      >
        <div id="Section_Header" className="flex flex-col items-center gap-2 ">
          <h2 className="font-semibold text-3xl text-center">
            Required with your system
          </h2>
          <p className="font-normal text-md text-[#000]/80 text-center">
            3X All in One AI Sensor Pack for entire house. Fall Detection and
            Sleep Monitoring Solution
          </p>
        </div>
        <div id="Price" className="price absolute right-16 md:text-center">
          <h1 className="font-semibold text-3xl">+${kitPrice}</h1>
          <span className="font-normal text-md text-[#000]/80">
            One Time Payment
          </span>
        </div>
        <div
          id="Products_Showcase"
          className="flex items-center md:grid md:grid-cols-2 gap-2"
        >
          {["Bedroom", "Livingroom", "Bathroom"].map((item, ind) => {
            return (
              <div
                id="Product"
                key={ind}
                className={`flex flex-col items-center justify-center ${
                  ind === 2 ? "md:col-span-2 text-center" : ""
                }`} // Use col-span-2 for the third item
              >
                <Img
                  src="Product-1.png"
                  width={250}
                  height={180}
                  alt="Product"
                />
                <h4 className="font-medium text-lg">{item}</h4>
              </div>
            );
          })}
        </div>
      </div>

      <div
        id="More_Device_Section"
        className="relative flex flex-col gap-6 items-start justify-start bg-[#F1F1F2] max-w-7xl my-0 mx-auto w-full p-10 rounded-xl px-16 md:p-5"
      >
        <div id="Section_Header" className="flex flex-col items-start gap-2">
          <h2 className="font-semibold text-3xl">Need more devices?</h2>
          <p className="font-normal text-md text-[#000]/80">
            You can always add more devices if you have more rooms.
          </p>
        </div>

        <div
          id="Addon_Product_and_Price"
          className="flex items-center w-full gap-6 md:flex-col"
        >
          <div
            id="Addon_Product"
            className="flex md:flex-col gap-2 md:gap-5 w-full bg-white items-center justify-between p-2 pr-6 rounded-xl md:pb-6"
          >
            <div
              id="Product"
              className="flex md:flex-col items-center justify-center "
            >
              <Img src="Product-1.png" width={250} height={180} alt="Product" />
              <div id="Product_Details">
                <h4 className="font-semibold text-lg">All in One AI Sensor</h4>
                <span className="text-[#000]/80">
                  Fall Detection + Sleep Monitoring
                </span>
              </div>
            </div>
            <div
              id="Quantity_Selector"
              className="flex items-center gap-3 border-gray-300 px-3 py-2 rounded-md border-2 h-fit"
            >
              <button
                className="text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity == 0}
                onClick={() => {
                  setQuantity(quantity > 0 ? quantity - 1 : 0);
                }}
              >
                <MinusCircledIcon className="w-8 h-8" />
              </button>
              <span className="text-lg font-semibold text-main_color-primary border-gray-300 px-3 py-1 rounded-md border-2">
                {quantity}
              </span>
              <button
                className="text-primary"
                onClick={() => {
                  setQuantity(quantity + 1);
                }}
              >
                <PlusCircledIcon className="w-8 h-8" />
              </button>
            </div>
          </div>
          <div id="Price" className="md:text-center">
            <h1 className="font-semibold text-3xl">
              +${addonDevicePrice * quantity}
            </h1>
            <span className="font-normal text-md text-[#000]/80 text-nowrap">
              One Time Payment
            </span>
          </div>
        </div>
      </div>

      <div
        id="Intallation_Section"
        className="relative flex md:flex-col gap-4 items-center justify-between bg-[#F1F1F2] max-w-7xl my-0 mx-auto w-full p-10 rounded-xl px-16 md:p-5"
      >
        <div id="Section_Header" className="flex flex-col items-start gap-2">
          <h2 className="font-semibold text-3xl">Installation</h2>
          <p className="font-normal text-md text-[#000]/80">
            Do you want expert to do instalation?
          </p>
        </div>
        <div id="YN_and_Price" className="flex gap-24 md:flex-col md:gap-10">
          <RadioButtonGroup
            selectedOption={selecteInstallation}
            setSelectedOption={setselecteInstallation}
          />
          <div id="Price" className="md:text-center">
            <h1 className="font-semibold text-3xl">
              +${selecteInstallation === 1 ? installationPrice : 0}
            </h1>
            <span className="font-normal text-md text-[#000]/80">
              One Time Payment
            </span>
          </div>
        </div>
      </div>
      <div
        id="CheckOut_Section"
        className="relative flex flex-col gap-6 items-start justify-between bg-[#F1F1F2] max-w-7xl my-0 mx-auto w-full p-10 rounded-xl px-16 md:p-5"
      >
        <div id="Section_Header" className="flex flex-col items-start gap-2">
          <h2 className="font-semibold text-3xl">Equipment</h2>
          <p className="font-normal text-md text-[#000]/80">Your Summary</p>
        </div>
        <div id="Note_and_Summary" className="flex gap-6  w-full md:flex-col">
          <div
            id="KeyPoints_Note"
            className="flex flex-col justify-between gap-5 w-[35%] py-16 md:w-full md:py-5"
          >
            <ul className="flex flex-col gap-4">
              {[
                "10 Days cooling off period",
                "AI Monitoring & Alerts",
                "24 Months Contract",
              ].map((item, ind) => {
                return (
                  <li
                    key={ind}
                    className="flex items-center gap-2 font-semibold text-md"
                  >
                    <StarIcon className="w-6 h-6" />
                    {item}
                  </li>
                );
              })}
            </ul>
            <p className="text-sm opacity-80">
              Please note for the first few days the system will learn your
              routines and no alert services will work with monitoring company
              until after 7 days from going live while you test the system
            </p>
          </div>
          <div
            id="Summary"
            className="w-[75%] bg-white p-8 py-10 rounded-xl md:w-full md:p-4"
          >
            <ul className="flex flex-col gap-5">
              <li className="flex items-center text-nowrap gap-5">
                <p className="font-semibold text-lg md:text-base">
                  1 Seenyor Kit
                </p>
                <hr className="w-full border-2" />
                <span className="text-nowrap text-lg font-normal">
                  ${kitPrice}
                </span>
              </li>
              <li className="flex items-center text-nowrap gap-5">
                <p className="font-semibold text-lg md:text-base">
                  {quantity} Additional Device
                </p>
                <hr className="w-full border-2" />
                <span className="text-nowrap text-lg md:text-base font-normal">
                  ${addonDevicePrice * quantity}
                </span>
              </li>
              <li className="flex items-center text-nowrap gap-5">
                <p className="font-semibold text-lg md:text-base">
                  {selecteInstallation !== 0 ? 1 : " "} Installation
                </p>
                <hr className="w-full border-2" />
                <span className="text-nowrap text-lg md:text-base font-normal">
                  ${selecteInstallation === 1 ? installationPrice : 0}
                </span>
              </li>
              <li className="flex md:flex-col md:justify-center items-center text-nowrap gap-5 md:gap-1">
                <p className="font-semibold text-xl md:text-base">
                  TOTAL (One Time Payment)
                </p>
                <hr className="w-full border-2 md:hidden" />
                <span className="text-nowrap text-lg md:text-2xl font-normal md:font-semibold">
                  ${total}
                </span>
              </li>
            </ul>
            <div
              id="AI_Monitoring_Addon"
              className="flex items-center justify-between p-3 border border-gray-400 border-opacity-50 rounded-xl mt-5"
            >
              <div className="flex flex-col items-start">
                <h2 className="font-semibold text-xl md:md">AI Monitoring</h2>
                <p className="font-normal text-md md:text-sm text-[#000]/80">
                  24 Months Contract
                </p>
              </div>
              <div className="flex flex-col items-end">
                <h2 className="font-semibold text-xl md:text-md">$40</h2>
                <p className="font-normal text-md  md:text-sm text-[#000]/80">
                  a Month
                </p>
              </div>
            </div>

            <div id="Terms_and_Checkout" className="flex flex-col gap-4 mt-4">
              <em className="text-gray-600 inline-block md:text-sm ">
                By submitting this order, you agree to Seenyors&nbsp;
                <span
                  className="cursor-pointer underline"
                  onClick={() =>
                    window.open("https://seenyor.com/terms-of-sale/", "_blank")
                  }
                >
                  Terms of Sale
                </span>
                ,&nbsp;
                <span
                  className="cursor-pointer underline"
                  onClick={() =>
                    window.open(
                      "https://seenyor.com/terms-of-service/",
                      "_blank"
                    )
                  }
                >
                  Terms of Service
                </span>
                ,&nbsp; and&nbsp;
                <span
                  className="cursor-pointer underline"
                  onClick={() =>
                    window.open(
                      "https://seenyor.com/privacy-policy-2-2/",
                      "_blank"
                    )
                  }
                >
                  Privacy Policy
                </span>
                .
              </em>

              <TermsCheckbox
                // checked={isChecked}
                onMainCheckboxChange={() => setIsChecked(!isChecked)}
              />

              <Button
                disabled={isChecked}
                type="submit"
                shape="round"
                color="green_200_green_400_01"
                className="w-[70%] my-0 mx-auto rounded-[14px] px-[2.13rem] font-semibold sm:px-[1.25rem] sm:m-auto"
              >
                Check Out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
