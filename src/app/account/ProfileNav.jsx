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
    <div className="flex max-w-[18.125rem] flex-col gap-[1.50rem] md:w-full bg-white rounded-lg">
      <div className="flex items-center gap-[1.25rem] md:flex-col md:text-center">
        <Img
          src="img_rectangle_4400.png"
          width={70}
          height={70}
          alt="Rectangle 4400"
          className="h-[4.38rem] w-[4.38rem] rounded-[34px] object-cover border-2 border-blue-300"
        />
        <div className="flex flex-1 flex-col items-start md:items-center">
          <Heading
            size="heading3xl"
            as="h1"
            className="text-[#1d293f] md:items-center"
          >
            Kasem Mia
          </Heading>
          <Text
            as="p"
            className="text-[1.13rem] font-normal lowercase text-[#6c7482]"
          >
            example@gmail.com
          </Text>
        </div>
      </div>
      <div className="flex flex-col items-start md:items-center gap-6 md:gap-4">
        <Link href="/account/edit-profile">
          <div
            className={`flex self-stretch transition-colors duration-200 hover:text-blue-400`}
          >
            <Heading
              as="h2"
              className={`text-[1rem] md:text-[1.15rem] font-medium text-[#6c7482] ${
                pathname === "/account/edit-profile" ? "!text-[#1d293f] " : ""
              }`}
            >
              Edit Profile
            </Heading>
          </div>
        </Link>
        <Link href="/account/account-settings">
          <div className={`flex self-stretch  transition-colors duration-200`}>
            <Heading
              as="h3"
              className={`text-[1.00rem] md:text-[1.15rem] font-normal text-[#6c7482] md:ml-0 hover:text-blue-600 transition-colors duration-200 ${
                pathname === "/account/account-settings"
                  ? "!text-[#1d293f]"
                  : ""
              }`}
            >
              Account Settings
            </Heading>
          </div>
        </Link>
        <Link href="/account/billing-information">
          <div className={`flex self-stretch  transition-colors duration-200`}>
            <Heading
              as="h4"
              className={`text-[1.00rem] md:text-[1.15rem] font-normal text-[#6c7482] md:ml-0 hover:text-blue-600 transition-colors duration-200 ${
                pathname === "/account/billing-information"
                  ? "!text-[#1d293f] font-medium"
                  : ""
              }`}
            >
              Billing Information
            </Heading>
          </div>
        </Link>
        <button onClick={handleLogout}>
          <Heading
            as="h5"
            className="text-[1.00rem] md:text-[1.15rem] font-normal text-red-800 text-red-600 transition-colors duration-200"
          >
            Sign Out
          </Heading>
        </button>
      </div>
    </div>
  );
}
