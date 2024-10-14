"use client";
import { Heading, Img, Text } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/services/userService";
import Link from "next/link"; // Import Link from next/link
import { usePathname, useRouter } from "next/navigation";

export default function ProfileNav() {
  const router = useRouter();
  const { removeStripeCustomerId } = useUserService();
  const { accessToken, logout } = useAuth();
  const pathname = usePathname(); // Get the current pathname

  const handleLogout = () => {
    removeStripeCustomerId();
    logout();
    router.push("/login");
  };

  return (
    <div className="flex w-[60%] flex-col gap-[1.50rem] md:w-full bg-white rounded-lg">
      <div className="flex items-center gap-[1.25rem]">
        <Img
          src="img_rectangle_4400.png"
          width={70}
          height={70}
          alt="Rectangle 4400"
          className="h-[4.38rem] w-[4.38rem] rounded-[34px] object-cover border-2 border-blue-300"
        />
        <div className="flex flex-1 flex-col items-start">
          <Heading size="heading3xl" as="h1" className="text-text">
            Kasem Mia
          </Heading>
          <Text
            as="p"
            className="text-[1.13rem] font-normal lowercase text-body"
          >
            example@gmail.com
          </Text>
        </div>
      </div>
      <div className="flex flex-col items-start">
        <Link href="/account/edit-profile">
          <div
            className={`flex self-stretch p-[0.88rem] transition-colors duration-200 hover:text-blue-400`}
          >
            <Heading
              as="h2"
              className={`text-[1rem] font-medium text-text ${
                pathname === "/account/edit-profile" ? "!text-blue-600 " : ""
              }`}
            >
              Edit Profile
            </Heading>
          </div>
        </Link>
        <Link href="/account/account-settings">
          <div
            className={`flex self-stretch p-[0.88rem] transition-colors duration-200`}
          >
            <Heading
              as="h3"
              className={`text-[1.00rem] font-normal text-body md:ml-0 hover:text-blue-600 transition-colors duration-200 ${
                pathname === "/account/account-settings"
                  ? "!text-blue-600 "
                  : ""
              }`}
            >
              Account Settings
            </Heading>
          </div>
        </Link>
        <Link href="/account/billing-information">
          <div
            className={`flex self-stretch p-[0.88rem] transition-colors duration-200`}
          >
            <Heading
              as="h4"
              className={`text-[1.00rem] font-normal text-body md:ml-0 hover:text-blue-600 transition-colors duration-200 ${
                pathname === "/account/billing-information"
                  ? "!text-blue-600 "
                  : ""
              }`}
            >
              Billing Information
            </Heading>
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="mb-[0.88rem] ml-[0.88rem] mt-[1.75rem] md:ml-0"
        >
          <Heading
            as="h5"
            className="text-[1.00rem] font-normal text-red-800 hover:text-red-600 transition-colors duration-200"
          >
            Sign Out
          </Heading>
        </button>
      </div>
    </div>
  );
}
