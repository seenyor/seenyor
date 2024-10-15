import { Heading, Img } from "@/components";

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
      className={`${props.className} flex sm:flex-col justify-center items-start gap-[0.75rem] p-[1.00rem] border border-solid flex-1 rounded-lg`}
    >
      {/* Icon container */}
      <div className="flex rounded-md border border-solid border-gray-100_01 bg-[#ffffff] px-[0.38rem] py-[0.63rem]">
        {/* Settings Icon */}
        <Img
          src={settingsIcon}
          width={30}
          height={10}
          alt="Settings"
          className="h-[0.63rem]"
        />
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
              className="font-inter text-[0.88rem] font-medium italic text-green-300"
            >
              {defaultMethodText}
            </Heading>
          </div>
        </div>
      </div>
    </div>
  );
}
