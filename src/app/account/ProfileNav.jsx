"use client";
import { Heading, Text } from "@/components";
import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/services/userService";
import * as Avatar from "@radix-ui/react-avatar";
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
    window.location.href = "seenyor.com";
  };

  return (
    <div className="flex w-[18.125rem] flex-col gap-[1.50rem] md:w-full bg-white rounded-lg">
      <div className="flex items-center gap-[1.25rem] md:flex-col md:text-center">
        <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-black-200 align-middle">
          <Avatar.Fallback className="leading-1 flex size-full items-center justify-center bg-blue-200 text-[15px] font-medium text-violet11">
            A
          </Avatar.Fallback>
        </Avatar.Root>
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
      <div className="flex flex-col md:flex-row items-start md:justify-center md:items-center gap-6 md:gap-4 md:border-b">
        <Link href="/account">
          <div className={`flex self-stretch transition-colors duration-200 `}>
            <Heading
              as="h2"
              className={`text-[1rem] md:text-[1rem] font-medium text-[#6c7482] ${
                pathname === "/account"
                  ? "!text-[#1d293f] md:border-b border-b-[#002248]  "
                  : ""
              }`}
            >
              Edit Profile
            </Heading>
          </div>
        </Link>
        <Link href="/account/account-settings">
          <div className={`flex self-stretch  transition-colors duration-200 `}>
            <Heading
              as="h3"
              className={`text-[1.00rem]  font-normal text-[#6c7482] md:ml-0 hover:text-blue-600 transition-colors duration-200 ${
                pathname === "/account/account-settings"
                  ? "!text-[#1d293f] md:border-b border-b-[#002248] "
                  : ""
              }`}
            >
              Account <span className="md:hidden">Setting</span>
            </Heading>
          </div>
        </Link>
        <Link href="/account/billing-information">
          <div className={`flex self-stretch  transition-colors duration-200`}>
            <Heading
              as="h4"
              className={`text-[1.00rem] font-normal text-[#6c7482] md:ml-0 transition-colors duration-200 ${
                pathname === "/account/billing-information"
                  ? "!text-[#1d293f] md:border-b border-b-[#002248] "
                  : ""
              }`}
            >
              Billing <span className="md:hidden">Information</span>
            </Heading>
          </div>
        </Link>
        <button onClick={handleLogout}>
          <Heading
            as="h5"
            className="text-[1.00rem] font-normal !text-red-600 transition-colors duration-200"
          >
            Sign Out
          </Heading>
        </button>
      </div>
    </div>
  );
}
