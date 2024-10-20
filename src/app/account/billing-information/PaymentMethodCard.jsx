import { Heading } from "@/components"; // Adjust the import path based on your project structure

// PaymentMethodCard Component
export default function PaymentMethodCard({
  id,
  card,
  billing_details,
  defaultMethodText = "Set As Default",
  isDefault = false,
  onDelete,
  ...props
}) {
  const cardDescription = `${billing_details?.name} Ending in ${card?.last4}`;
  const cardExpiry = `Expiry ${card?.exp_month < 10 ? "0" : ""}${
    card?.exp_month
  }/${card?.exp_year}`;
  console.log("i am biliiiii", billing_details);
  return (
    <div
      {...props}
      className={`${props.className} flex justify-center items-start gap-[0.75rem] p-[1.00rem] border-2 border-solid flex-1 rounded-lg`}
    >
      {/* Card brand icon */}
      <div className="flex rounded-md border border-solid border-gray-100_01 bg-[#ffffff] px-[0.38rem] py-[0.63rem]">
        <img
          src={`${card.brand}.svg`}
          alt={`${card.brand} icon`}
          className="h-[1.5rem] w-[1.5rem]"
        />
      </div>

      {/* Card information container */}
      <div className="flex flex-1 flex-col gap-[0.50rem] self-center">
        <div className="flex flex-col items-start">
          <Heading
            size="textmd"
            as="p"
            className="font-inter text-[0.88rem] font-medium text-[#2f4d3f] "
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

        <div>
          <div className="flex">
            <Heading
              size="textmd"
              as="p"
              className="font-inter text-[0.88rem] font-medium text-primary"
            >
              {isDefault ? "Default Method" : defaultMethodText}
            </Heading>
            <Heading
              size="textmd"
              as="p"
              className="font-inter text-[0.88rem] pl-3 font-medium !text-red-600 cursor-pointer capitalize"
              onClick={() => onDelete(id)} // Call the delete handler
            >
              delete
            </Heading>
          </div>
        </div>
      </div>
    </div>
  );
}
