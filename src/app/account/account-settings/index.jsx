"use client";
import AddressModal from "@/modals/AddressModal";
import { useUserService } from "@/services/userService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify'; // Import toast
import { Button, Heading, Input, Text } from "../../../components";

const AccountSetting = () => {
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState(""); // State for old password
  const [newPassword, setNewPassword] = useState(""); // State for new password
  const [AddressInfo, setAddressInfo] = useState('')
  const { updateUserName, updatePassword, getUserDetailsById } = useUserService();
  const handleAddressModalToggle = (isOpen) => {
    setIsAddressModalOpen(isOpen);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      fetchUserDetails(storedUserId);
    }
  }, []);
  const fetchUserDetails = async (id) => {
    try {
      const userDetails = await getUserDetailsById(id);
      setAddressInfo(userDetails);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };
  const handleChangePassword = async () => {
    try {
      const response = await updatePassword({ oldPassword, newPassword });
      console.log("Password updated successfully:", response);
      toast.success("Password updated successfully!"); // Show success toast
      // Optionally reset the password fields
      setOldPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Failed to update password:", error);
      toast.error("Failed to update password. Please try again."); // Show error toast
    }
  };


  console.log("i am adressInfo", AddressInfo)
  return (
    <div className="">
      <div className="flex flex-col items-start border-b border-solid border-border pb-4 md:items-center md:text-center">
        <Heading
          size="text4xl"
          as="h3"
          className="text-[1.75rem] font-medium text-[#1d293f] md:text-[1.63rem] sm:text-[1.50rem] md:text-center"
        >
          Account Settings
        </Heading>
        <Text
          as="p"
          className="mb-[0.05rem] text-[1.13rem] font-normal text-[#6c7482] "
        >
          Update your email or change your password
        </Text>
      </div>

      {/* Address Modal */}
      <AddressModal onChange={handleAddressModalToggle} isOpen={isAddressModalOpen} />

      {/* Email Section */}
      <div className="bg-white rounded-lg md:text-center my-6">
        <Heading
          size="text3xl"
          as="h4"
          className="text-[1.50rem] font-medium text-[#1d293f] md:text-[1.38rem] mb-1"
        >
          E-mail
        </Heading>
        <Text as="p" className="text-[1.13rem] font-normal text-[#6c7482] mb-4">
          You must enter a password to change your e-mail address
        </Text>
        <div className="flex flex-col items-start gap-[0.38rem] mb-4">
          <Heading
            size="headingmd"
            as="h5"
            className="text-[1.13rem] font-semibold capitalize text-[#1d293f]"
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
              className="text-[1.13rem] font-semibold capitalize text-[#1d293f]"
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
          className="min-w-[10.63rem] md:w-full rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
        >
          Change Email
        </Button>
      </div>

      {/* Password Section */}
      <div className="bg-white rounded-lg mb-6">
        <Heading
          size="text3xl"
          as="p"
          className="text-[1.50rem] font-medium text-[#1d293f] md:text-[1.38rem] mb-4 md:text-center"
        >
          Change Password
        </Heading>
        <Text
          as="p"
          className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
        >
          To change your current password you need to remember your old password
          or you can reset your password
        </Text>
        <div className="flex flex-col gap-[0.88rem]">
          <div className="flex flex-col gap-[0.25rem] mb-4">
            <Heading
              size="headingmd"
              as="h6"
              className="text-[1.13rem] font-semibold capitalize text-[#1d293f]"
            >
              Old Password
            </Heading>
            <Input
              size="xl"
              shape="round"
              type="password"
              name="oldPassword"
              value={oldPassword} // Bind the old password input
              onChange={(e) => setOldPassword(e.target.value)} // Update state on input change
              className="rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
            />
          </div>
          <div className="flex flex-col items-start gap-[0.38rem] mb-4">
            <Heading
              size="headingmd"
              as="h6"
              className="text-[1.13rem] font-semibold capitalize text-[#1d293f]"
            >
              New Password
            </Heading>
            <Input
              size="xl"
              shape="round"
              type="password"
              name="newPassword"
              value={newPassword} // Bind the new password input
              onChange={(e) => setNewPassword(e.target.value)} // Update state on input change
              className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
            />
          </div>
       
        </div>
        <Button
          color="green_200_green_400_01"
          shape="round"
          className="min-w-[12.63rem] md:w-full rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
          onClick={handleChangePassword} // Call the function to change the password
        >
          Change Password
        </Button>
      </div>

      {/* Address Change Section */}
      <div className="bg-white rounded-lg mb-6 md:text-center">
        <Heading
          size="text3xl"
          as="p"
          className="text-[1.50rem] font-medium text-[#1d293f] md:text-[1.38rem] mb-2"
        >
          Address
        </Heading>
        <Text
          as="p"
          className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
        >
        Manage Your Address and Change It Anytime.
        </Text>
        <div id="addressection" className="">
        <Heading
          size="text3xl"
          as="p"
          className="text-[1.13rem] font-semibold text-[#1d293f] md:text-[1.38rem] mb-2"
        >
          Address1
        </Heading>
        <Text
          as="p"
          className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
        >
       {AddressInfo?.data?.address
       }
        </Text>
        <Heading
          size="text3xl"
          as="p"
          className="text-[1.13rem] font-semibold text-[#1d293f] md:text-[1.38rem] mb-2"
        >
          Address2
        </Heading>
        <Text
          as="p"
          className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
        >
       {AddressInfo?.data?.address2}
        </Text>
        <div className="city wrap flex justify-between md:justify-normal md:flex-col">
        <div className="flex flex-col md:justify-start">
        <Heading
          size="text3xl"
          as="p"
          className="text-[1.13rem] font-semibold text-[#1d293f] md:text-[1.38rem] mb-2"
        >
          Country
        </Heading>
        <Text
          as="p"
          className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
        >
         England
        </Text>
        </div>
       
        <div className="flex flex-col md:justify-start">
        <Heading
          size="text3xl"
          as="p"
          className="text-[1.13rem] font-semibold text-[#1d293f] md:text-[1.38rem] mb-2"
        >
          City
        </Heading>
        <Text
          as="p"
          className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
        >
         {AddressInfo?.data?.city}
        </Text>
        </div>
        </div>
        </div>
        <Heading
          size="text3xl"
          as="p"
          className="text-[1.13rem] font-semibold text-[#1d293f] md:text-[1.38rem] mb-2"
        >
          Phone Number
        </Heading>
        <Text
          as="p"
          className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-[#6c7482] mb-4 md:text-center"
        >
         {AddressInfo?.data?.contact_number}
        </Text>
        
        </div>
        <Button
          color="green_200_green_400_01"
          shape="round"
          className="min-w-[12.63rem] md:w-full rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
          onClick={() => handleAddressModalToggle(true)} // Open the modal
        >
          Change Address
        </Button>
      </div>
   
  );
};

export default AccountSetting;