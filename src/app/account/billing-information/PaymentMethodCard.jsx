import { Heading } from "@/components";

// PaymentMethodCard Component
export default function PaymentMethodCard({
  settingsIcon = "Visa.svg", // Default icon for settings
  cardDescription = "Visa ending in 1234", // Default card description
  cardExpiry = "Expiry 06/2024", // Default card expiry date
  defaultMethodText = "Default Method", // Default text for the default method
  ...props // Spread operator to accept additional props
}) {
  return (
    // Main container with flex, padding, and border styles
    <div
      {...props}
      className={`${props.className} flex  justify-center items-start gap-[0.75rem] p-[1.00rem] border-2 border-solid  flex-1 rounded-lg`}
    >
      {/* Icon container */}
      <div className="flex rounded-md border border-solid border-gray-100_01 bg-[#ffffff] px-[0.38rem] py-[0.63rem]">
        {/* Settings Icon */}
        <svg
          width="33"
          height="12"
          viewBox="0 0 33 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M8.33211 11.1441H5.58578L3.52638 3.0563C3.42863 2.68426 3.22108 2.35536 2.91579 2.20034C2.15389 1.81078 1.31432 1.50075 0.398438 1.34438V1.033H4.82255C5.43314 1.033 5.89108 1.50075 5.9674 2.04398L7.03594 7.878L9.78092 1.033H12.4509L8.33211 11.1441ZM13.9765 11.1443H11.3828L13.5185 1.0332H16.1122L13.9765 11.1443ZM19.4698 3.83409C19.5461 3.28951 20.004 2.97813 20.5383 2.97813C21.3779 2.89995 22.2924 3.05631 23.0557 3.44453L23.5136 1.26755C22.7504 0.956169 21.9108 0.799805 21.1489 0.799805C18.6315 0.799805 16.7998 2.20035 16.7998 4.14412C16.7998 5.62285 18.0973 6.39928 19.0132 6.86703C20.004 7.33342 20.3857 7.64481 20.3093 8.1112C20.3093 8.8108 19.5461 9.12218 18.7842 9.12218C17.8683 9.12218 16.9524 8.88898 16.1142 8.49942L15.6562 10.6777C16.5721 11.066 17.563 11.2223 18.4789 11.2223C21.3015 11.2992 23.0557 9.89996 23.0557 7.79982C23.0557 5.1551 19.4698 5.00009 19.4698 3.83409ZM32.1301 11.1443L30.0707 1.0332H27.8586C27.4007 1.0332 26.9427 1.34458 26.7901 1.81098L22.9766 11.1443H25.6466L26.1795 9.66696H29.4601L29.7654 11.1443H32.1301ZM28.241 3.75586L29.0029 7.56658H26.8672L28.241 3.75586Z"
            fill="#172B85"
          />
        </svg>
      </div>

      {/* Card information container */}
      <div className="flex flex-1 flex-col gap-[0.50rem] self-center">
        {/* Card description and expiry */}
        <div className="flex flex-col items-start">
          <Heading
            size="textmd"
            as="p"
            className="font-inter text-[0.88rem] font-medium text-[2f4d3f]"
          >
            {cardDescription}
          </Heading>
          <Heading
            size="textmd"
            as="p"
            className="font-inter text-[0.88rem] font-normal text-primary"
          >
            {cardExpiry}
          </Heading>
        </div>

        {/* Default method text */}
        <div>
          <div className="flex">
            <Heading
              size="textmd"
              as="p"
              className="font-inter text-[0.88rem] font-medium text-green-300"
            >
              {defaultMethodText}
            </Heading>
            <Heading
              size="textmd"
              as="p"
              className="font-inter text-[0.88rem] pl-3 font-medium text-red-600"
            >
              delete
            </Heading>
          </div>
        </div>
      </div>
    </div>
  );
}
