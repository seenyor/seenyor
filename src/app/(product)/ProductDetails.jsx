"use client"
import { Button, Heading, Img } from "@/components";
import UserProfile1 from "../../components/UserProfile1";
import { useCart } from "../../context/CartContext";

export default function ProductDetails() {
  const { cart, calculateTotals } = useCart();
  const { subtotal, packageTotal, monitoringServiceTotal, grandTotal } =
    calculateTotals();
  return (
    <div>
      <div className="flex justify-center bg-new_p_shade-new_p_shade_50 py-[2.25rem] md:py-[1.25rem]">
        <div className="container-xs flex justify-center px-[0.50rem] md:px-[1.25rem]">
          <div className="flex w-full items-center md:flex-col">
            <Img
              src="img_frame_new_p_shade_new_p_shade_500.svg"
              width={394}
              height={394}
              alt="Frame"
              className="mb-[17.75rem] h-[24.63rem] w-[24.63rem] self-end md:w-full md:self-auto"
            />
            <div className="relative ml-[-9.38rem] h-[66.63rem] flex-1 content-end md:ml-0 md:h-auto md:w-full md:flex-none md:self-stretch">
              <Img
                src="img_frame_new_p_shade_new_p_shade_500.svg"
                width={394}
                height={394}
                alt="Frame"
                className="mb-[5.50rem] ml-[12.63rem] h-[24.63rem] w-[24.63rem] md:ml-0"
              />
              <div className="absolute bottom-0 left-[0.00rem] top-0 my-auto flex h-max w-[76%] md:w-[100%] flex-col items-center gap-[3.75rem] rounded-[20px] bg-white p-[2.13rem] sm:gap-[1.88rem] sm:p-[1.25rem] md:top-[-50rem] sm:top-[-45rem] md:left-1/2 md:-translate-x-1/2">
                <Heading
                  size="heading6xl"
                  as="h2"
                  className="text-[2.00rem] font-bold text-blue_gray-900 md:text-[1.88rem] sm:text-[1.75rem]"
                >
                  System Details
                </Heading>
                <div className="flex flex-col items-center gap-[1.88rem] self-stretch">
                  <div className="flex flex-col gap-[2.50rem] self-stretch">
                    <div className="flex flex-col gap-[2.50rem]">
                      <div className="flex flex-col gap-[1.25rem]">
                        <div className="flex items-center gap-[0.63rem]">
                          <Img
                            src="img_forward.svg"
                            width={24}
                            height={24}
                            alt="Forward"
                            className="h-[1.50rem] w-[1.50rem]"
                          />
                          <Heading
                            size="heading3xl"
                            as="h3"
                            className="text-[1.50rem] font-bold text-blue_gray-900 md:text-[1.38rem]"
                          >
                            Packages
                          </Heading>
                        </div>
                        <div className="flex justify-between items-center rounded-[10px] bg-gray-100_01 p-[1.25rem] sm:text-[1rem]">
                          <span className="text-[1.25rem] sm:text-[1rem] font-semibold text-blue_gray-400">
                            Standard Package
                          </span>
                          <span className="text-[1.25rem] sm:text-[1rem] font-bold text-blue_gray-900">
                            $999 <span className="text-blue_gray-400">AUD</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[1.25rem]">
                        <div className="flex items-center gap-[0.63rem]">
                          <Img
                            src="img_frame_primary.svg"
                            width={24}
                            height={24}
                            alt="Frame"
                            className="h-[1.50rem] w-[1.50rem]"
                          />
                          <Heading
                            size="heading3xl"
                            as="h4"
                            className="text-[1.50rem] font-bold text-blue_gray-900 md:text-[1.38rem]"
                          >
                            Monitoring Services
                          </Heading>
                        </div>
                        <div className="flex justify-between items-center rounded-[10px] bg-gray-100_01 p-[1.25rem] ">
                          <span className="text-[1.25rem]  font-semibold text-blue_gray-400">
                            AI Monitoring Service
                          </span>
                          <span className="text-[1.25rem] font-bold text-blue_gray-900 ">
                            $49.99{" "}
                            <span className="text-blue_gray-400 ">AUD/mo</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[1.25rem]">
                        <div className="flex items-center gap-[0.63rem]">
                          <Img
                            src="img_frame_primary_24x24.svg"
                            width={24}
                            height={24}
                            alt="Frame"
                            className="h-[1.50rem] w-[1.50rem]"
                          />
                          <Heading
                            size="heading3xl"
                            as="h5"
                            className="text-[1.50rem] font-bold text-blue_gray-900 md:text-[1.38rem]"
                          >
                            Additional Devices
                          </Heading>
                        </div>
                        <div className="flex flex-col gap-[1.38rem] rounded-[10px] bg-gray-100_01 p-[1.25rem]">
                          {cart.map((item) => (
                            <UserProfile1
                              key={item.id}
                              userMultiplier={`${item.quantity}x`}
                              userFeature={item.name}
                              userBalance={(item.price * item.quantity).toFixed(2)}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="rounded-[10px] bg-text p-[1.25rem]">
                      <div className="mb-[2.63rem] flex flex-col gap-[0.63rem]">
                        <div className="flex flex-wrap justify-end gap-[3.38rem] border-b border-solid border-color_white-a700_66 py-[0.63rem] md:gap-[1.25rem]">
                          <Heading
                            size="text2xl"
                            as="h6"
                            className="text-[1.25rem] font-normal text-white"
                          >
                            Total Cost :{" "}
                          </Heading>
                          <Heading
                            size="headinglg"
                            as="h5"
                            className="text-[1.25rem] font-bold text-white"
                          >
                            ${subtotal.toFixed(2)} AUD
                          </Heading>
                        </div>
                        <div className="flex flex-wrap justify-between gap-[1.25rem]">
                          <Heading
                            size="heading3xl"
                            as="h4"
                            className="text-[1.50rem] font-semibold text-white md:text-[1.38rem] sm:text-[1rem]"
                          >
                            Grand Total :
                          </Heading>
                          <Heading
                            size="heading3xl"
                            as="h4"
                            className="text-[1.50rem] font-bold text-white md:text-[1.38rem] sm:text-[1rem]"
                          >
                            ${grandTotal.toFixed(2)} AUD
                          </Heading>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Heading
                    as="p"
                    className="w-full text-[1.00rem] font-normal italic leading-[1.50rem] text-body"
                  >
                    <span className="text-body">
                      By submitting this order, you agree to Seenyors&nbsp;
                    </span>
                    <a href="#" className="inline text-text underline">
                      Terms of Sale
                    </a>
                    <span className="text-body">,</span>
                    <a href="#" className="inline text-text underline">
                      Terms of Service
                    </a>
                    <span className="text-body">&nbsp;and&nbsp;</span>
                    <a href="#" className="inline text-text underline">
                      Privacy Policy.
                    </a>
                  </Heading>
                  <a
                    href=""
                    target=""
                  >
                    <Button
                      variant="outline"
                      shape="round"
                      rightIcon={
                        <Img
                          src="img_arrowright.svg"
                          width={24}
                          height={24}
                          alt="Arrow Right"
                          className="h-[1.50rem] w-[1.50rem]"
                        />
                      }
                      className="min-w-[10.88rem] gap-[1.00rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
                    >
                      Checkout
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
