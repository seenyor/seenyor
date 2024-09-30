import { Button, Heading, Img, Text } from "../../components";

export default function AccountDone() {
  return (
      <div className="flex flex-col items-center border-b border-solid border-border py-[3.75rem] md:py-[1.25rem]">
        <div className="container-xs flex flex-col items-center gap-[1rem] px-[3.50rem] md:px-[1.25rem]">
          <Button
            className="checkmark_border w-[3.25rem] h-[3.25rem] rounded-full"
            size="lg"
            shape="circle"
            variant={null}
          >
            <Img src="img_checkmark.svg" width={20} height={14} className="text-white" />
          </Button>
          <Heading
            size="heading4xl"
            as="h1"
            className="text-[2rem] font-bold text-text md:text-[1.75rem] sm:text-[1.50rem]"
          >
            Account Created Successful!
          </Heading>
          <Text
            as="p"
            className="w-[54%] text-center text-[1.13rem] font-normal leading-[1.69rem] text-body md:w-full"
          >
            Your account created successfully. Please make payment to complete your purchase. If payment failed your
            account will be suspended.
          </Text>
          <Button
            color="body"
            size="sm"
            variant="outline"
            rightIcon={
              <Img
                src="img_arrowleft_text.svg"
                width={24}
                height={24}
                alt="Arrow Left"
                className="h-[1.50rem] w-[1.50rem]"
              />
            }
            className="min-w-[12.75rem] gap-[0.63rem] rounded-[10px] !border-2 font-medium"
          >
            Make Payment
          </Button>
        </div>
      </div>
    
  );
}