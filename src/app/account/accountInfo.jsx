"use client";
import { Button, Heading, Img, Input, Text } from "@/components";
import { useUserService } from "@/services/userService";
import { useEffect, useState } from "react";

export default function AccountInfo() {
  const { updateUserName, getUserDetailsById } = useUserService(); // Get the updateUserName and getUserDetailsById functions
  const [displayName, setDisplayName] = useState("");
  const [showName, setShowName] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserDetails(storedUserId);
    }
  }, []);

  const fetchUserDetails = async (id) => {
    try {
      const userDetails = await getUserDetailsById(id);
      setShowName(userDetails.data.name);
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  };

  // Function to handle updating the user's name
  const handleUpdateName = async () => {
    try {
      const response = await updateUserName({ name: displayName });
      localStorage.setItem("user_id", response._id);
      setShowName(response.name);
      console.log("User name updated successfully:", response);
    } catch (error) {
      console.error("Failed to update user name:", error);
    }
  };
  return (
    <div className="">
      <div className="flex flex-col items-start border-b border-solid border-border pb-4 md:items-center md:text-center">
        <Heading
          size="text4xl"
          as="h3"
          className="text-[1.75rem] font-medium text-[#1d293f] md:text-[1.63rem] sm:text-[1.50rem] md:text-center"
        >
          Edit Profile
        </Heading>
        <Text
          as="p"
          className="mb-[0.05rem] text-[1.13rem] font-normal text-[#6c7482]"
        >
          Personalize your profile, Easily update your name and profile picture.
        </Text>
      </div>
      {/* Profile Image Section */}
      <div className="flex flex-col gap-4 md:text-center mb-10 pt-6">
        {/* Change Profile Image */}
        <div className="flex flex-col gap-2 md:items-center">
          <Heading
            size="headings"
            as="h6"
            className="text-lg font-semibold capitalize text-[#1d293f]"
          >
            Change Your Profile Image
          </Heading>
          <Img
            src="img_ellipse_71.png"
            width={44}
            height={44}
            alt="Ellipse 71"
            className="h-[3rem] w-[3rem] rounded-[22px] object-cover border-2 border-transparent group-hover:border-blue-300 transition-all duration-300"
          />
        </div>

        {/* Display Name Input */}
        <div className="flex flex-col gap-1 ">
          <Heading
            size="headings"
            as="h6"
            className="text-lg font-semibold capitalize text-[#1d293f]"
          >
            {showName}
          </Heading>
          <Input
            shape="round"
            name="Label"
            placeholder="Name"
            value={displayName} // Bind the input value to state
            onChange={(e) => setDisplayName(e.target.value)} // Update state on input change
            className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
          />
        </div>
      </div>

      {/* Save Changes Button */}
      <Button
        color="green_200_green_400_01"
        shape="round"
        className="md:w-full  w-[10.63rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
        onClick={handleUpdateName}
      >
        Save Changes
      </Button>
    </div>
  );
}
