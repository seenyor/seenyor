import { Button, Input } from "@/components";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { CreditCard } from "lucide-react";
import "./style.css";

const AddressModal = ({ isOpen, onChange }) => {
  return (
    <div className="flex items-center">
      <Dialog.Root open={isOpen} onOpenChange={onChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="DialogOverlay" />
          <Dialog.Content className="DialogContent !max-w-[600px] !md:w-[360px] overflow-auto">
            <Dialog.Description className="DialogDescription p-2">
              <div className="max-w-md mx-auto p-6 bg-white">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                  Add New Method
                </h1>

                <form>
                  <div className="mb-4">
                    <label
                      htmlFor="cardholderName"
                      className="block text-md font-medium text-gray-700 mb-1"
                    >
                      Cardholder name
                    </label>
                    <Input
                      type="text"
                      id="cardholderName"
                      placeholder="Full name on card"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="cardNumber"
                      className="block text-md font-medium text-gray-700 mb-1"
                    >
                      Card information
                    </label>
                    <div className="relative">
                      <Input
                        type="text"
                        id="cardNumber"
                        placeholder="1234 1234 1234 1234"
                        className="w-full px-3 py-2 !border-solid rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </div>

                  <div className="flex mb-6">
                    <div className="w-1/2 mr-2">
                      <Input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full px-3 py-2 !border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-1/2 ml-2">
                      <Input
                        type="text"
                        placeholder="CVC"
                        className="w-full px-3 py-2 border border-gray-400  rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out"
                  >
                    Add Method
                  </Button>
                </form>

                <div className="mt-4 flex justify-end space-x-2">
                  <img
                    src="/placeholder.svg?height=20&width=32"
                    alt="Visa"
                    className="h-5"
                  />
                  <img
                    src="/placeholder.svg?height=20&width=32"
                    alt="American Express"
                    className="h-5"
                  />
                  <img
                    src="/placeholder.svg?height=20&width=32"
                    alt="Mastercard"
                    className="h-5"
                  />
                  <img
                    src="/placeholder.svg?height=20&width=32"
                    alt="JCB"
                    className="h-5"
                  />
                </div>
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

export default AddressModal;
