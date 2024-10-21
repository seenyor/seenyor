"use client";
import { Heading, Img, Text } from "@/components";
import { useUserService } from "@/services/userService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
  const router = useRouter();
  const {
    getSessionDetails,
    createOrder,
    handlePaymentStatus,
    handlePaymentSubscription,
  } = useUserService();
  const [isProcessing, setIsProcessing] = useState(false); // State to track processing
  let sessionId;
  if (typeof window !== "undefined") {
    sessionId = new URLSearchParams(window.location.search).get("session_id");
  }

  const handleOrder = async (orderData) => {
    const agent_id = localStorage.getItem("agent_id");
    const installation_address = localStorage.getItem("installation_address");
    const user_credentials = localStorage.getItem("user_credentials");
    const addressPharsed = JSON.parse(installation_address);
    const order = {
      total: orderData.amount_total / 100,
      grand_total: orderData.amount_total / 100, // Adjust if you have discounts or shipping
      is_paid: orderData.payment_status === "paid",
      payment_status: orderData.payment_status,
      payment_method: orderData.payment_method_types[0], // Assuming credit card for now
      transaction_id: orderData.payment_intent, // Use the payment intent ID
      agent_unique_id: JSON.parse(agent_id), // Replace with actual agent ID if available
      email: JSON.parse(user_credentials).email,
      password: JSON.parse(user_credentials).password,
      products: orderData.line_items.map((item) => ({
        id: item.productId, // Assuming this is the product ID
        name: item.productName,
        type:
          item.productName === "AI Monitoring" ||
          item.productName === "Required with your system"
            ? "Seenyor Kit"
            : item.productName === "Installation"
            ? "Installation"
            : item.productName === "All in One AI Sensor"
            ? `AI Sensor ${item.quantity}x`
            : "package",
        price: item.price, // Convert from cents to dollars
        quantity: item.quantity,
        priceId: item.productId,
      })),
      total_details: {
        amount_discount: orderData.total_details.amount_discount,
        amount_shipping: orderData.total_details.amount_shipping,
        amount_tax: orderData.total_details.amount_tax,
      },
      address: {
        city: addressPharsed?.city || "",
        country: orderData?.customer_details?.address?.country || "",
        line1: addressPharsed?.address || "",
        line2: addressPharsed?.address2 || "",
        postal_code: addressPharsed?.postal_code || "",
        state: addressPharsed?.state || "",
      },
    };
    try {
      const response = await createOrder(order);
      console.log("Order created successfully:", response);
      // Clear the orderDetails from localStorage
      localStorage.removeItem("orderDetails");
      // Optionally, redirect to an order confirmation page
      // router.push("/");
    } catch (error) {
      console.error("Error creating order:", error);
      // Handle error (e.g., show error message to user)
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    let customerId;
    let hasRun = false;

    if (sessionId && !hasRun) {
      hasRun = true;
      setIsProcessing(true);

      getSessionDetails(sessionId)
        .then((session) => {
          customerId = session.customer;
          return handleOrder(session);
        })
        .then(() => handlePaymentStatus(sessionId))
        .then((response) => {
          if (response.success) {
            const subscriptionProducts = JSON.parse(
              localStorage.getItem("subscriptionProducts")
            );
            const user_credentials = localStorage.getItem("user_credentials");

            if (subscriptionProducts && subscriptionProducts.length > 0) {
              console.log(user_credentials);

              return handlePaymentSubscription(
                customerId,
                subscriptionProducts[0].priceId,
                JSON.parse(user_credentials).email,
                JSON.parse(user_credentials).password
              );
            }
          } else {
            console.log("Payment Status False");
          }
        })
        .then((response) => {
          if (response) console.log(response);
          // Clear localStorage
          [
            "subscriptionProducts",
            "orderDetails",
            "installation_address",
            "user_credentials",
            "agent_id",
          ].forEach((item) => localStorage.removeItem(item));
        })
        .catch((error) => {
          console.error("Error in payment process:", error);
        })
        .finally(() => {
          setIsProcessing(false);
        });
    }
  }, [sessionId]);

  // useEffect(() => {
  //   if (sessionId) {
  //     getSessionDetails(sessionId)
  //       .then((session) => {
  //         // Retrieve products from local storage
  //         const storedProducts = localStorage.getItem("orderDetails");
  //         const products = storedProducts ? JSON.parse(storedProducts) : []; // Parse the products or default to an empty array
  //         console.log(session);
  //         console.log("logged");

  //         // Create the order with the session details and products from local storage
  //         const orderData = {
  //           total: session.amount_total,
  //           grand_total: session.amount_total, // Adjust if you have discounts or shipping
  //           is_paid: session.payment_status === "paid",
  //           payment_status: session.payment_status,
  //           payment_method: "Credit Card", // Assuming credit card for now
  //           transaction_id: session.payment_intent, // Use the payment intent ID
  //           agent_unique_id: "000001", // Replace with actual agent ID if available
  //           products: products.map((item) => ({
  //             id: item.id, // Assuming the product object has an id
  //             name: item.name, // Assuming the product object has a name
  //             price: item.price, // Assuming the product object has a price
  //             quantity: item.quantity, // Assuming the product object has a quantity
  //             priceId: item.priceId, // Assuming the product object has a priceId
  //           })),
  //           total_details: {
  //             amount_discount: session.total_details.amount_discount,
  //             amount_shipping: session.total_details.amount_shipping,
  //             amount_tax: session.total_details.amount_tax,
  //           },
  //           address: {
  //             city: session.customer_details.address?.city || "",
  //             country: session.customer_details.address?.country || "",
  //             line1: session.customer_details.address?.line1 || "",
  //             line2: session.customer_details.address?.line2 || "",
  //             postal_code: session.customer_details.address?.postal_code || "",
  //             state: session.customer_details.address?.state || "",
  //           },
  //         };

  //         // Prevent multiple requests
  //         if (isProcessing) return; // Skip if already processing

  //         setIsProcessing(true); // Set processing to true

  //         handleOrder(orderData);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching session details:", error);
  //       });
  //   }
  // }, [sessionId, isProcessing]);

  return (
    <div className="flex w-full flex-col gap-[1.63rem] bg-gradient-to-b from-white to-blue-50 ">
      <div className="flex flex-col items-center justify-center gap-[1.50rem] border-b border-solid border-border py-[18.50rem] h-[100vh]">
        <div className="flex flex-col items-center self-stretch">
          <div className="container-xs flex flex-col items-center gap-[0.75rem] px-[3.50rem] md:px-[1.25rem]">
            <Img
              src="img_checkmark.svg"
              width={44}
              height={44}
              alt="Frame 1261153926"
              className="h-[2.75rem] w-[2.75rem] rounded-[50%]"
            />
            <Heading
              size="heading4xl"
              as="h1"
              className="text-[1.75rem] font-semibold text-text md:text-[1.63rem] sm:text-[1.50rem]"
            >
              Payment Successfully!
            </Heading>
            <Text
              as="p"
              className="w-[50%] text-center text-[1.13rem] font-normal leading-[1.69rem] text-body md:w-full"
            >
              There is a confirmation mail sent to your E-mail. Please check and
              Click on the link attached to setup your password.
            </Text>
          </div>
        </div>
        <div className="container-xs flex flex-col items-center px-[3.50rem] md:px-[1.25rem]">
          <div className="flex items-center gap-[0.63rem]">
            <Text
              as="p"
              className="text-[1.13rem] font-medium text-text cursor-pointer"
            >
              <Link href="/login">Sign in</Link>
            </Text>
            <Img
              src="img_arrowleft_text.svg"
              width={24}
              height={24}
              alt="Arrow Left"
              className="h-[1.50rem] w-[1.50rem]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
