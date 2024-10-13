"use client"
import AddressChangeModal from "@/modals/AddressChangeModal";
import Link from "next/link";
import { useState } from "react";
import { Button, Heading, Input, Text } from "..";

const AccountSetting = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  const openAddressModal = () => setIsAddressModalOpen(true);
  const closeAddressModal = () => setIsAddressModalOpen(false);
  return (
    <div className="flex flex-row gap-[1.88rem] items-start justify-start w-full">
      {/* Sidebar */}
      {/* Main Content */}
      <div className="flex flex-1 flex-col gap-[1.88rem] self-center md:self-stretch w-[80%]">
        {/* Header */}
        <div className="flex flex-col items-start border-b border-solid border-border pb-4">
          <Heading
            size="text4xl"
            as="h3"
            className="text-[1.75rem] font-medium text-text md:text-[1.63rem] sm:text-[1.50rem]"
          >
            Account Settings
          </Heading>
          <Text
            as="p"
            className="mb-[0.05rem] text-[1.13rem] font-normal text-body"
          >
            Update your email or change your password
          </Text>
        </div>
  {/* Address Change Modal */}
        <AddressChangeModal
          isOpen={isAddressModalOpen}
          onClose={closeAddressModal}
        />
        {/* Email Section */}
        <div className="bg-white rounded-lg">
          <Heading
            size="text3xl"
            as="h4"
            className="text-[1.50rem] font-medium text-text md:text-[1.38rem] mb-1"
          >
            E-mail
          </Heading>
          <Text as="p" className="text-[1.13rem] font-normal text-body mb-4">
            You must enter a password to change your e-mail address
          </Text>
          <div className="flex flex-col items-start gap-[0.38rem] mb-4">
            <Heading
              size="headingmd"
              as="h5"
              className="text-[1.13rem] font-semibold capitalize text-text"
            >
              E-mail Address
            </Heading>
            <Input
              shape="round"
              type="email"
              name="email"
              placeholder={`example@gmail.com`}
              className="self-stretch rounded-[12px] !border px-[1.63rem] lowercase sm:px-[1.25rem]"
            />
          </div>
          <div className="flex flex-col gap-[0.25rem] mb-4">
            <div className="flex flex-wrap justify-between gap-[1.25rem]">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-text"
              >
                Password
              </Heading>
              <Link href="#">
                <Text
                  as="p"
                  className="text-[1.13rem] font-medium capitalize text-primary"
                >
                  Forgot Password?
                </Text>
              </Link>
            </div>
            <Input
              size="xl"
              shape="round"
              type="password"
              name="password"
              className="rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
            />
          </div>
          <Button
            color="green_200_green_400_01"
            shape="round"
            className="min-w-[10.63rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
          >
            Change Email
          </Button>
        </div>

        {/* Password Section */}
        <div className="bg-white rounded-lg  mb-6">
          <Heading
            size="text3xl"
            as="p"
            className="text-[1.50rem] font-medium text-text md:text-[1.38rem] mb-4"
          >
            Change Password
          </Heading>
          <Text
            as="p"
            className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-body mb-4"
          >
            To change your current password you need to remember your old
            password or you can reset your password
          </Text>
          <div className="flex flex-col gap-[0.88rem]">
            <div className="flex flex-col gap-[0.25rem] mb-4">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-text"
              >
                Old Password
              </Heading>
              <Input
                size="xl"
                shape="round"
                type="password"
                name="oldPassword"
                className="rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
              />
            </div>
            <div className="flex flex-col items-start gap-[0.38rem] mb-4">
              <Heading
                size="headingmd"
                as="h6"
                className="text-[1.13rem] font-semibold capitalize text-text"
              >
                New Password
              </Heading>
              <Input
                size="xl"
                shape="round"
                type="password"
                name="newPassword"
                className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
              />
            </div>
          </div>
          <Button
            color="green_200_green_400_01"
            shape="round"
            className="min-w-[10.63rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
          >
            Change Password
          </Button>
        </div>

        {/* Address Change Section */}
        {/* Address Change Button */}
        <div className="bg-white rounded-lg">
          <Heading
            size="text3xl"
            as="p"
            className="text-[1.50rem] font-medium text-text md:text-[1.38rem] mb-4"
          >
            Address Information
          </Heading>
          <Button
            color="green_200_green_400_01"
            shape="round"
            className="min-w-[10.63rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
            onClick={openAddressModal}
          >
            Change Address
          </Button>
        </div>

      
      </div>
    </div>
  );
};

export default AccountSetting;
