"use client";
import { useAuth } from "@/context/AuthContext";
import { useUserService } from "@/services/userService";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Heading, Img, Text } from "..";

export default function AccountDone() {
  const { user } = useAuth();
  const { createStripeCustomer, createStripeSession } = useUserService();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const processPayment = async () => {
    if (!user) {
      router.push("/register");
      return;
    }

    const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
    if (!orderDetails) {
      router.push("/");
      return;
    }

    setIsProcessing(true);

    try {
      let customerId = user.stripeCustomerId;
      if (!customerId) {
        const customer = await createStripeCustomer({
          email: user.email,
          name: user.name,
        });
        customerId = customer.id;
        // Update user context or make an API call to update user data with Stripe customer ID
      }

      const lineItems = [
        // {
        //   price: orderDetails.products[0].priceId, // Kit
        //   quantity: 1,
        //   adjustable_quantity: { enabled: true },
        // },
      ];

      if (orderDetails.addonQuantity > 0) {
        lineItems.push({
          price: "price_1Q5Dc1Anr9h8Jix3IZme7C2h", // Addon device
          quantity: orderDetails.addonQuantity,
          adjustable_quantity: { enabled: true, minimum: 0, maximum: 10 },
        });
      }
      if (orderDetails.installationPrice > 0) {
        lineItems.push({
          price: "price_1Q5Dc1Anr9h8Jix3IZme7C2h", // Installation
          quantity: 1,
          adjustable_quantity: { enabled: false },
        });
      }

      const session = await createStripeSession({
        customer: "cus_Qw0yUkLc0RWUt1",
        line_items: lineItems,
      });
      // Redirect to Stripe Checkout
      window.location.href = session.url;
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle error (e.g., show error message to user)
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center border-b border-solid border-border py-[3.75rem] md:py-[1.25rem]">
      <div className="container-xs flex flex-col items-center gap-[1rem] px-[3.50rem] md:px-[1.25rem]">
        <Button
          className="checkmark_border w-[3.25rem] h-[3.25rem] rounded-full"
          size="lg"
          shape="circle"
          variant={null}
        >
          <Img
            src="img_checkmark.svg"
            width={20}
            height={14}
            className="text-white"
          />
        </Button>
        <Heading
          size="heading4xl"
          as="h1"
          className="text-[2rem] font-bold text-text md:text-[1.75rem] sm:text-[1.50rem]"
        >
          Account Created Successful!
        </Heading>
        <Text
          as="p"
          className="w-[54%] text-center text-[1.13rem] font-normal leading-[1.69rem] text-body md:w-full"
        >
          Your account created successfully. Please make payment to complete
          your purchase. If payment failed your account will be suspended.
        </Text>
        <Button
          color="body"
          size="sm"
          variant="outline"
          rightIcon={
            <Img
              src="img_arrowleft_text.svg"
              width={24}
              height={24}
              alt="Arrow Left"
              className="h-[1.50rem] w-[1.50rem]"
            />
          }
          className="min-w-[12.75rem] gap-[0.63rem] rounded-[10px] !border-2 font-medium"
          onClick={processPayment}
          disabled={isProcessing}
        >
          {isProcessing ? "Processing..." : "Make Payment"}
        </Button>
      </div>
    </div>
  );
}
