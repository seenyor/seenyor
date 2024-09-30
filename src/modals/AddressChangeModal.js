import { Button, Heading, Input, Text } from '@/components';
import { useEffect, useRef } from 'react';
const AddressChangeModal = ({ isOpen, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
      if (isOpen && modalRef.current) {
        modalRef.current.focus();
        modalRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
      }
      return () => {
        document.body.style.overflow = 'unset'; // Re-enable scrolling when modal closes
      };
    }, [isOpen]);
  
    if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div 
        ref={modalRef}
        tabIndex={-1} // Makes the div focusable
        className="bg-white rounded-lg p-6 w-full max-w-md relative focus:outline-none"
      >
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <Heading size="text3xl" as="p" className="text-[1.50rem] font-medium text-text md:text-[1.38rem] mb-4">
          Change Address
        </Heading>
        <Text as="p" className="w-full text-[1.13rem] font-normal leading-[1.69rem] text-body mb-4">
          Update your current address information
        </Text>
        <div className="flex flex-col gap-[0.88rem]">
          <div className="flex flex-col gap-[0.25rem] mb-4">
            <Heading size="headingmd" as="h6" className="text-[1.13rem] font-semibold capitalize text-text">
              Street Address
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
            <Heading size="headingmd" as="h6" className="text-[1.13rem] font-semibold capitalize text-text">
              City
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
            <Heading size="headingmd" as="h6" className="text-[1.13rem] font-semibold capitalize text-text">
              State/Province
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
            <Heading size="headingmd" as="h6" className="text-[1.13rem] font-semibold capitalize text-text">
              Zip/Postal Code
            </Heading>
            <Input
              size="xl"
              shape="round"
              type="text"
              name="zipCode"
              className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
            />
          </div>
          <div className="flex flex-col items-start gap-[0.38rem] mb-4">
            <Heading size="headingmd" as="h6" className="text-[1.13rem] font-semibold capitalize text-text">
              Country
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
            color="gray_500"
            shape="round"
            className="min-w-[6rem] rounded-[14px] px-[1.25rem] font-semibold"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            color="green_200_green_400_01"
            shape="round"
            className="min-w-[10.63rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
          >
            Update Address
          </Button>
        </div>
      </div>
    </div>
   
  );
};

export default AddressChangeModal;