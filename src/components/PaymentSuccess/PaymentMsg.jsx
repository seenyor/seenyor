import { Heading, Img, Text } from "../../components";

export default function PaymentMsg() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-[1.50rem] border-b border-solid border-border py-[18.50rem]">
        <div className="flex flex-col items-center self-stretch">
          <div className="container-xs flex flex-col items-center gap-[0.75rem] px-[3.50rem] md:px-[1.25rem]">
            <Img
              src="img_checkmark.svg"
              width={44}
              height={44}
              alt="Frame 1261153926"
              className="h-[2.75rem] w-[2.75rem] rounded-[50%]"
            />
            <Heading
              size="heading4xl"
              as="h1"
              className="text-[1.75rem] font-semibold text-text md:text-[1.63rem] sm:text-[1.50rem]"
            >
           Payment Successfully!
            </Heading>
            <Text
              as="p"
              className="w-[50%] text-center text-[1.13rem] font-normal leading-[1.69rem] text-body md:w-full"
            >
          There is a confirmation mail sent to your E-mail. Please check and Click on the link attached to setup your password.
            </Text>
          </div>
        </div>
        <div className="container-xs flex flex-col items-center px-[3.50rem] md:px-[1.25rem]">
          <div className="flex items-center gap-[0.63rem]">
            <Text as="p" className="text-[1.13rem] font-medium text-text">
              Sing in
            </Text>
            <Img
              src="img_arrowleft_text.svg"
              width={24}
              height={24}
              alt="Arrow Left"
              className="h-[1.50rem] w-[1.50rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}