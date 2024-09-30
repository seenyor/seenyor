import { Heading, Img } from "../../components";
import AccountDone from "./AccountDone";
import AccountImg from "./AccountImg";

export default function SixtySixPage() {
  return (
    <div className="flex w-full flex-col gap-[1.63rem] bg-gradient-to-b from-white to-blue-50">
      <AccountImg />
      <div>
        <AccountDone />
        <div className="flex flex-col items-center py-[3.75rem] md:py-[1.25rem] ">
          <div className="container-xs mb-[1.63rem] flex flex-col items-center gap-[1.25rem] px-[3.50rem] md:px-[1.25rem]">
            <div className="flex w-[36%] flex-col items-center gap-[0.63rem] px-[2.25rem] md:w-full sm:px-[1.25rem]">
              <div className="w-[32%] rounded-[14px] border border-solid border-purple-300 p-[0.75rem] md:w-full bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
                <Img
                  src="img_printer.svg"
                  width={90}
                  height={90}
                  alt="Printer"
                  className="h-[5.63rem] w-[5.63rem] transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <Heading
                size="text5xl"
                as="h2"
                className="text-[1.75rem] font-bold text-purple-800 text-center md:text-[1.63rem] sm:text-[1.50rem]"
              >
                Download our mobile app
              </Heading>
            </div>
              <Img
                src="img_imockup_iphone.png"
                width={280}
                height={220}
                alt="Imockup Iphone"
                className="h-[13.75rem] w-[22%] object-contain"
              />
          
            </div>
          </div>
        </div>
      </div>
  
  );
}