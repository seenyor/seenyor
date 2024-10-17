import { Button, Heading, Input } from "@/components";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import "./style.css";

const Address = ({ isOpen, onChange }) => {
  return (
    <div className="flex items-center">
      <Dialog.Root open={isOpen} onOpenChange={onChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent !max-w-[600px] !md:w-[360px] overflow-auto">
            <Dialog.Title className="DialogTitle"></Dialog.Title>
            <Dialog.Description className="DialogDescription p-2">
              <Heading
                size="text4xl"
                as="p"
                className="text-[1.50rem] font-medium text-text md:text-[1.38rem] mb-4"
              >
                Change Address
              </Heading>

              <div className="flex flex-col gap-[0.88rem]">
                <div className="flex flex-col gap-[0.25rem] mb-4">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="text-[1.13rem] font-semibold capitalize text-text"
                  >
                    Address 1
                  </Heading>
                  <Input
                    size="xl"
                    shape="round"
                    type="text"
                    name="streetAddress"
                    className="rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                </div>
                <div className="flex flex-col items-start gap-[0.38rem] mb-4">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="text-[1.13rem] font-semibold capitalize text-text"
                  >
                    Address 2
                  </Heading>
                  <Input
                    size="xl"
                    shape="round"
                    type="text"
                    name="city"
                    className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                </div>
                <div className="flex flex-col items-start gap-[0.38rem] mb-4">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="text-[1.13rem] font-semibold capitalize text-text"
                  >
                    Country
                  </Heading>
                  <Input
                    size="xl"
                    shape="round"
                    type="text"
                    name="state"
                    className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                </div>

                <div className="flex flex-col items-start gap-[0.38rem] mb-4">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="text-[1.13rem] font-semibold capitalize text-text"
                  >
                    City
                  </Heading>
                  <Input
                    size="xl"
                    shape="round"
                    type="text"
                    name="country"
                    className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                </div>
                <div className="flex flex-col items-start gap-[0.38rem] mb-4">
                  <Heading
                    size="headingmd"
                    as="h6"
                    className="text-[1.13rem] font-semibold capitalize text-text"
                  >
                   Phone Number
                  </Heading>
                  <Input
                    size="xl"
                    shape="round"
                    type="text"
                    name="country"
                    className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <Button
                  color="green_200_green_400_01"
                  shape="round"
                  className="w-full rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
                >
                  Confirm
                </Button>
              </div>
            </Dialog.Description>
            <Dialog.Close asChild>
              <button className="IconButton cursor-pointer" aria-label="Close">
                <Cross2Icon className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default Address;
