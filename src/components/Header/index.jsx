import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link";
import { Heading, Img } from "./..";

export default function Header({ ...props }) {
  return (
    <header
      {...props}
      className={`${props.className} flex w-full md:hidden sm:flex-col justify-between items-center gap-[1.25rem] px-6`}
    >
      <Img
        src="img_group_1.svg"
        width={440}
        height={32}
        alt="Frame 1000008413"
        className="h-[2.00rem] w-[11%] flex object-contain md:w-full hover:opacity-80 transition-opacity duration-300"
      />
      <div className="mx-auto flex w-full max-w-[63.13rem] items-center justify-center md:flex-col md:px-[1.25rem]">
        <ul className="relative !ml-[-8.13rem] flex flex-wrap gap-[2.13rem] md:ml-0">
          <li>
            <Link href="#">
              <Heading
                as="p"
                className="text-[1rem] font-medium text-text hover:text-blue-600 transition-colors duration-200"
              >
                Home
              </Heading>
            </Link>
          </li>
          {[
            "Device",
            "Alerts",
            "Nursing Home",
            "AI Monitoring",
            "App",
            "Buy Device",
          ].map((item, index) => (
            <li key={index}>
              <Link href="#" className="cursor-pointer">
                <Heading
                  as="p"
                  className="text-[1rem] font-bold text-body hover:text-blue-600 transition-colors duration-200"
                >
                  {item}
                </Heading>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link href="/account" className="relative group">
        <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full bg-black-200 align-middle">
          <Avatar.Fallback className="leading-1 flex size-full items-center justify-center bg-blue-200 text-[15px] font-medium text-violet11">
            A
          </Avatar.Fallback>
        </Avatar.Root>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
    </header>
  );
}
