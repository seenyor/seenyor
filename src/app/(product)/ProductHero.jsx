"use client"
import { Button, Heading, Img, Text } from "../../components";

export default function ProductHero() {
  return (
    <div className="flex flex-col items-center">
      <div className="container-xs flex flex-col gap-[5.00rem] md:gap-[3.75rem] md:px-[1.25rem] sm:gap-[2.50rem]">
        <div className="flex items-center gap-[0.38rem] py-[0.38rem]">
          <Img
            src="img_group_1.svg"
            width={156}
            height={32}
            alt="Group 1"
            className="h-[2.00rem] w-[12%] object-contain"
          />
          <Text
            as="p"
            className="text-[1.13rem] font-medium text-body"
          >
            System Builder
          </Text>
        </div>
        <div className="flex items-start gap-[2.50rem] md:flex-col">
          <div className="flex w-full flex-col items-start gap-[0.88rem]">
            <Button
              size="sm"
              variant="outline"
              leftIcon={
                <Img
                  src="img_frame.svg"
                  width={20}
                  height={20}
                  alt="Frame"
                  className="my-[0.13rem] h-[1.25rem] w-[1.25rem]"
                />
              }
              className="min-w-[10.88rem] gap-[0.50rem] rounded-[20px] px-[0.75rem] font-medium"
            >
              System Builder
            </Button>
            <div className="flex flex-col items-center self-stretch">
              <Heading
                size="heading6xl"
                as="h1"
                className="w-full capitalize text-text"
              >
                Customize your elderly care system
              </Heading>
              <Text
                as="p"
                className="w-full text-[1.13rem] font-normal capitalize leading-[1.69rem] text-body"
              >
                Personalize your system with Fall Detectors and Advanced Sleep
                Monitoring Sensors, and rest assured, you can effortlessly
                incorporate additional devices as required.
              </Text>
            </div>
          </div>
          <div className="flex w-full justify-center self-center px-[3.50rem] md:px-[1.25rem]">
            <Img
              src="img_pin_12_converted.png"
              width={238}
              height={264}
              alt="Pin 12 Converted"
              className="h-[16.50rem] w-[44%] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
