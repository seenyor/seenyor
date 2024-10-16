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
        <Img
          src="img_ellipse_71.png"
          width={44}
          height={44}
          alt="Ellipse 71"
          className="h-[2.75rem] w-[2.75rem] rounded-[22px] object-cover md:w-full border-2 border-transparent group-hover:border-blue-300 transition-all duration-300"
        />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
    </header>
  );
}
