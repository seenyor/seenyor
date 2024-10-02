import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./style.css";

const TermsCheckbox = ({ checked, onChange }) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id="termsCheckbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        onClick={onChange}
        className={`flex items-center justify-center h-6 w-6 border-2 rounded-md cursor-pointer transition-colors duration-300 ${
          checked ? "bg-primary border-transparent" : "bg-white border-gray-300"
        }`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <label
        htmlFor="termsCheckbox"
        className="ml-2 text-gray-600 cursor-pointer md:text-sm"
      >
        I agree to the&nbsp;
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <span className="text-primary underline cursor-pointer">
              Terms and Conditions
            </span>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent !max-w-[600px] !md:w-[360px]  overflow-auto">
              <Dialog.Title className="DialogTitle"></Dialog.Title>
              <Dialog.Description className="DialogDescription !p-2 ">
                <em className="text-lg md:text-base font-semibold opacity-85">
                  Before completing your purchase or subscription, please review
                  and acknowledge the following terms:
                </em>

                <ul className="list-disc ml-4 mt-5 gap-4 flex flex-col">
                  <li className="flex flex-col text-[18px] font-medium">
                    24-Month Commitment:
                    <span className="text-[16px] font-normal">
                      I understand that by purchasing the Seenyor system and
                      subscribing to its services, I am committing to a 24-month
                      contract.
                    </span>
                  </li>
                  <li className="flex flex-col text-[18px] font-medium">
                    Early Termination Fee:
                    <span className="text-[16px] font-normal">
                      I acknowledge that an early termination fee will apply if
                      I cancel the service before the end of the 24-month
                      period.
                    </span>
                  </li>
                  <li className="flex flex-col text-[18px] font-medium">
                    Non-Refundable Installation Fee:
                    <span className="text-[16px] font-normal">
                      I agree that the 199 AUD installation fee is
                      non-refundable once the installation is completed, even if
                      I decide to cancel the service afterward.
                    </span>
                  </li>
                  <li className="flex flex-col text-[18px] font-medium">
                    No Refunds After Cooling-Off Period:
                    <span className="text-[16px] font-normal">
                      I confirm that I have read and agree to the Seenyor Terms
                      of Service, including the no-refund policy after the
                      10-day cooling-off period.
                    </span>
                  </li>
                  <li className="flex flex-col text-[18px] font-medium">
                    No Integration with Third-Party Systems:
                    <span className="text-[16px] font-normal">
                      I understand that Seenyor is not responsible for
                      integrating third-party systems (such as smart home
                      devices) with the Seenyor system.
                    </span>
                  </li>
                  <li className="flex flex-col text-[18px] font-medium">
                    Terms of Service :
                    <span className="text-[16px] font-normal">
                      I have read and agree to the Seenyor Terms of Service,
                      which govern my use of the product and
                      subscription services.
                    </span>
                  </li>
                </ul>
              </Dialog.Description>
              {/* <div className="flex justify-end mt-4">
                <Dialog.Close asChild>
                  <button className="Button green">Close</button>
                </Dialog.Close>
              </div> */}
              <Dialog.Close asChild>
                <button
                  className="IconButton cursor-pointer"
                  aria-label="Close"
                >
                  <Cross2Icon className="w-5 h-5" />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
        .
      </label>
    </div>
  );
};

export default TermsCheckbox;
