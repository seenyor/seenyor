import { Button, Input } from "@/components";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
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
                      className="w-full px-3 py-2 !border-solid rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                        className="w-full px-3 py-2  !border-solid rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <div className="flex space-x-1">
                          <svg
                            className="h-6 w-6"
                            viewBox="0 0 36 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="36"
                              height="24"
                              rx="4"
                              fill="#EFF0F2"
                            />
                            <path
                              d="M15.2344 18.8906H20.7031V5.10938H15.2344V18.8906Z"
                              fill="#FF5F00"
                            />
                            <path
                              d="M15.7969 12C15.7969 9.15625 17.1562 6.625 19.3125 5.10938C17.7969 3.90625 15.875 3.20312 13.7969 3.20312C8.79688 3.20312 4.75 7.25 4.75 12C4.75 16.75 8.79688 20.7969 13.7969 20.7969C15.875 20.7969 17.7969 20.0938 19.3125 18.8906C17.1562 17.4219 15.7969 14.8438 15.7969 12Z"
                              fill="#EB001B"
                            />
                            <path
                              d="M31.2031 12C31.2031 16.75 27.1562 20.7969 22.1562 20.7969C20.0781 20.7969 18.1562 20.0938 16.6406 18.8906C18.8438 17.4219 20.1562 14.8438 20.1562 12C20.1562 9.15625 18.8438 6.625 16.6406 5.10938C18.1562 3.90625 20.0781 3.20312 22.1562 3.20312C27.1562 3.20312 31.2031 7.25 31.2031 12Z"
                              fill="#F79E1B"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex mb-6">
                    <div className="w-1/2 mr-2">
                      <Input
                        type="text"
                        placeholder="MM / YY"
                        className="w-full px-3 py-2 !border-solid rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                    <div className="w-1/2 ml-2">
                      <Input
                        type="text"
                        placeholder="CVC"
                        className="w-full px-3 py-2  !border-solid  rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <Button
                    color="green_200_green_400_01"
                    shape="round"
                    className="w-full rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
                    type="submit" // Submit the form
                  >
                    Add Method
                  </Button>
                </form>
                <div className="mt-4 flex justify-end space-x-2">
                  <svg
                    className="h-6 w-9"
                    viewBox="0 0 36 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="24" rx="4" fill="#EFF0F2" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.67578 19.2812H10.5508L13.1758 4.71875H10.3008L7.67578 19.2812Z"
                      fill="#00579F"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.7383 5.01562C19.1758 4.78125 18.3008 4.5 17.2383 4.5C14.4883 4.5 12.5508 5.95312 12.5391 8.0625C12.5273 9.65625 13.9258 10.5469 14.9883 11.0859C16.0742 11.6367 16.4258 11.9766 16.4258 12.4453C16.4141 13.1484 15.5508 13.4766 14.7383 13.4766C13.6523 13.4766 13.0781 13.3125 12.1992 12.9375L11.8477 12.7734L11.4609 15.2344C12.1406 15.5391 13.3945 15.8086 14.7031 15.8203C17.6367 15.8203 19.5391 14.3906 19.5625 12.1406C19.5742 10.8867 18.7969 9.91406 17.2266 9.14062C16.2656 8.625 15.6914 8.28516 15.6914 7.75781C15.7031 7.28906 16.2305 6.80859 17.3633 6.80859C18.3008 6.79688 19.0156 7.00781 19.5742 7.23047L19.8203 7.33594L20.2188 5.01562H19.7383Z"
                      fill="#00579F"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23.2031 15.6094H25.8867L27.7891 4.71875H25.1172L23.2031 15.6094Z"
                      fill="#00579F"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M30.9375 4.71875L28.5 12.0938L28.2422 10.9453C27.7031 9.46875 26.2109 7.85156 24.5625 7.03125L26.8828 15.5977H29.5781L33.3516 4.71875H30.9375Z"
                      fill="#00579F"
                    />
                    <path
                      d="M27.0859 4.71875H23.0859L23.0391 4.91797C26.2109 5.71875 28.3438 7.69922 29.2109 10.1953L28.4961 5.29688C28.3672 4.78125 27.7734 4.73438 27.0859 4.71875Z"
                      fill="#FAA61A"
                    />
                  </svg>
                  <svg
                    className="h-6 w-9"
                    viewBox="0 0 36 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="24" rx="4" fill="#EFF0F2" />
                    <path
                      d="M32.2969 12C32.2969 16.9688 28.2656 21 23.2969 21C20.3906 21 17.7969 19.5938 16.1719 17.3438H19.8281C21.0469 18.2812 22.5469 18.8438 24.1719 18.8438C27.7969 18.8438 30.7031 15.9375 30.7031 12.3125C30.7031 8.6875 27.7969 5.78125 24.1719 5.78125C22.5469 5.78125 21.0469 6.34375 19.8281 7.28125H16.1719C17.7969 5.03125 20.3906 3.625 23.2969 3.625C28.2656 3.625 32.2969 7.65625 32.2969 12Z"
                      fill="#006FCF"
                    />
                    <path
                      d="M23.7031 8.53125V15.4688H22.1094V13.9062H19.5469V12.5312H22.1094V10.9688H19.5469V9.59375H22.1094V8.53125H23.7031Z"
                      fill="#006FCF"
                    />
                    <path
                      d="M26.2969 8.53125V15.4688H24.7031V13.9062H22.1406V12.5312H24.7031V10.9688H22.1406V9.59375H24.7031V8.53125H26.2969Z"
                      fill="#006FCF"
                    />
                    <path
                      d="M28.8906 8.53125V15.4688H27.2969V13.9062H24.7344V12.5312H27.2969V10.9688H24.7344V9.59375H27.2969V8.53125H28.8906Z"
                      fill="#006FCF"
                    />
                  </svg>
                  <svg
                    className="h-6 w-9"
                    viewBox="0 0 36 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="24" rx="4" fill="#EFF0F2" />
                    <path
                      d="M15.2344 18.8906H20.7031V5.10938H15.2344V18.8906Z"
                      fill="#FF5F00"
                    />
                    <path
                      d="M15.7969 12C15.7969 9.15625 17.1562 6.625 19.3125 5.10938C17.7969 3.90625 15.875 3.20312 13.7969 3.20312C8.79688 3.20312 4.75 7.25 4.75 12C4.75 16.75 8.79688 20.7969 13.7969 20.7969C15.875 20.7969 17.7969 20.0938 19.3125 18.8906C17.1562 17.4219 15.7969 14.8438 15.7969 12Z"
                      fill="#EB001B"
                    />
                    <path
                      d="M31.2031 12C31.2031 16.75 27.1562 20.7969 22.1562 20.7969C20.0781 20.7969 18.1562 20.0938 16.6406 18.8906C18.8438 17.4219 20.1562 14.8438 20.1562 12C20.1562 9.15625 18.8438 6.625 16.6406 5.10938C18.1562 3.90625 20.0781 3.20312 22.1562 3.20312C27.1562 3.20312 31.2031 7.25 31.2031 12Z"
                      fill="#F79E1B"
                    />
                  </svg>
                  <svg
                    className="h-6 w-9"
                    viewBox="0 0 36 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="36" height="24" rx="4" fill="#EFF0F2" />
                    <path
                      d="M11.8125 18.7031H8.90625L11.2812 5.29688H14.1875L11.8125 18.7031Z"
                      fill="#006FCF"
                    />
                    <path
                      d="M23.5938 5.53125C22.9375 5.29688 21.9062 5.0625 20.6562 5.0625C17.5938 5.0625 15.4062 6.65625 15.3906 8.95312C15.375 10.6875 16.9375 11.6562 18.125 12.25C19.3438 12.8594 19.75 13.2344 19.75 13.75C19.7344 14.5312 18.7812 14.8906 17.875 14.8906C16.6562 14.8906 15.9844 14.7031 14.9688 14.2812L14.5781 14.0938L14.1406 16.7812C14.9062 17.125 16.3125 17.4219 17.7812 17.4375C21.0625 17.4375 23.2031 15.8594 23.2344 13.4219C23.25 12.0156 22.375 10.9531 20.6094 10.0938C19.5469 9.53125 18.875 9.15625 18.875 8.5625C18.8906 8.04688 19.4844 7.51562 20.7656 7.51562C21.8281 7.5 22.6406 7.73438 23.2812 7.98438L23.5625 8.10938L24.0156 5.53125H23.5938Z"
                      fill="#006FCF"
                    />
                    <path
                      d="M27.4375 5.29688C26.8125 5.29688 26.3125 5.45312 26 5.98438L21.9375 18.7031H25.2188L25.8438 16.8906H29.5L29.8594 18.7031H32.7656L30.0625 5.29688H27.4375ZM26.7188  14.4531C26.9375 13.8594 28.0156 10.9062 28.0156 10.9062L28.4375 9.67188C28.4375 9.67188 28.7344 10.8281 28.9062 11.3906L29.5 14.4531H26.7188Z"
                      fill="#006FCF"
                    />
                  </svg>
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
