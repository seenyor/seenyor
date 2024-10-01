"use client"
import { Button, Heading, Img, Text } from "../../components";

export default function ProductPack() {
  return (
    <div>
      <div className="flex flex-col items-center bg-text py-[3.75rem] md:py-[1.25rem]">
        <div className="container-xs flex flex-col gap-[3.75rem] md:px-[1.25rem] sm:gap-[1.88rem]">
          <div className="mx-[20.25rem] flex flex-col items-center gap-[0.38rem] md:mx-0">
            <Heading
              size="heading6xl"
              as="h2"
              className="text-[2.00rem] font-bold text-white md:text-[1.88rem] sm:text-[1.75rem]"
            >
              Standard Package
            </Heading>
            <Text
              as="p"
              className="self-stretch text-center text-[1.13rem] font-normal leading-[1.69rem] text-color_white-a700_b2"
            >
              Begin your smart home journey with our inclusive Basic Package,
              ensuring seamless integration of smart technology.
            </Text>
          </div>

          <div className="flex flex-col items-center gap-[2.00rem] px-[3.50rem] md:px-[1.25rem]">
            <div className="flex w-[16%] flex-col gap-[0.50rem] md:w-full">
              <Button
                color="green_300_19"
                size="xs"
                variant="fill"
                className="mx-[0.38rem] self-stretch rounded-[18px] px-[0.88rem] font-semibold md:mx-0"
              >
                Required Package
              </Button>
              <div className="flex flex-wrap items-center justify-center gap-[0.38rem]">
                <Heading
                  size="heading9xl"
                  as="h3"
                  className="text-[3.00rem] !text-primary font-bold  md:text-[2.75rem] sm:text-[2.38rem]"
                >
                  $999
                </Heading>
                <Text
                  size="text4xl"
                  as="p"
                  className="text-[1.56rem] font-normal text-color_white-a700_66 line-through md:text-[1.44rem] sm:text-[1.31rem]"
                >
                  $1200
                </Text>
              </div>
            </div>

            <div className="mr-[1.13rem] flex w-[70%] items-center justify-center md:mr-0 md:w-full md:flex-col">
              {/* Changed to flex-col for small devices */}
              <div className="flex w-full flex-col md:flex-col md:items-center sm:gap-[2rem]">
                {/* Fall Detector section */}
                <div className="flex w-full items-center gap-[1.50rem] md:flex-col md:items-center">
                  <div className="relative h-[13.25rem] w-[42%] content-end md:h-auto md:w-full md:max-w-[177px]">
                    <Img
                      src="img_fall_detector_2.png"
                      width={132}
                      height={188}
                      alt="Fall Detector 2"
                      className="mb-[0.25rem] ml-auto h-[11.75rem] w-[78%] object-contain md:ml-0 md:w-full"
                    />
                    <Img
                      src="img_fall_detector_1.png"
                      width={168}
                      height={212}
                      alt="Fall Detector 1"
                      className="absolute bottom-0 left-0 right-0 top-0 m-auto h-[13.25rem] w-full flex-1 object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col items-start gap-[1.25rem] self-end md:self-center md:items-center md:text-center">
                    <Heading
                      size="heading2xl"
                      as="h4"
                      className="flex h-[3.38rem] w-[3.38rem] items-center justify-center rounded-[26px] bg-gradient text-center text-[1.44rem] font-bold text-white md:text-[1.31rem]"
                    >
                      3x
                    </Heading>
                    <div className="flex flex-col items-start self-stretch md:items-center">
                      <Heading
                        size="headingxl"
                        as="h5"
                        className="text-[1.38rem] font-semibold capitalize text-white"
                      >
                        Fall Detector
                      </Heading>
                      <Heading
                        as="h6"
                        className="text-[1.00rem] font-medium capitalize !text-primary underline"
                      >
                        Device Details
                      </Heading>
                    </div>
                  </div>
                </div>
              </div>

              {/* Added margin-top for small devices to separate sections */}
              <div className="flex w-full items-center justify-end gap-[1.56rem] self-end md:self-auto md:flex-col md:items-center md:mt-[2rem]">
                <div className="h-[9.75rem] w-[40%] md:w-full md:max-w-[250px]">
                  <Img
                    src="img_sleep_monitoring.png"
                    width={158}
                    height={156}
                    alt="Sleep Monitoring"
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col items-start gap-[1.25rem] self-end md:self-center md:items-center md:text-center">
                    <Heading
                      size="heading2xl"
                      as="h4"
                      className="flex h-[3.38rem] w-[3.38rem] items-center justify-center rounded-[26px] bg-gradient text-center text-[1.44rem] font-bold text-white md:text-[1.31rem]"
                    >
                      3x
                    </Heading>
                    <div className="flex flex-col items-start self-stretch md:items-center">
                      <Heading
                        size="headingxl"
                        as="h5"
                        className="text-[1.38rem] font-semibold capitalize text-white"
                      >
                        Fall Detector
                      </Heading>
                      <Heading
                        as="h6"
                        className="text-[1.00rem] font-medium capitalize !text-primary underline"
                      >
                        Device Details
                      </Heading>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}