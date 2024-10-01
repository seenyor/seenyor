"use client";
import { useEffect, useState } from "react";
import { Heading, Img, Text } from "../../components";
import UserProfile from "../../components/UserProfile";

export default function ProductService() {
  const [serviceTerms, setServiceTerms] = useState(null);

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      // Replace this with your actual API call
      const response = {
        message: "Service terms fetch successfully",
        data: [
          {
            _id: "66ede4458cf24948d69b54ec",
            status: true,
            soft_deleted: false,
            terms: [
              "10 Day Cooling Off Period",
              "24 Month Contract",
              "Monthly Charge Of $50.00 For Monitoring And Alerts",
              "Payment For Subscription Taken Upon Sign Up"
            ],
            details: "Our comprehensive service package includes the following key elements.",
            note: "Please note for the first few days the system will learn your routines and no alert services will work with the monitoring company until after 7 days from going live while you test the system.",
            creator_id: "66e9bee258630531b90a2dfd",
            created_at: "2024-09-20T21:08:21.830Z",
            updated_at: "2024-09-20T21:08:21.831Z",
            __v: 0
          },
        ]
      };
      setServiceTerms(response.data[0]); // Using the first object in the array
    };

    fetchData();
  }, []);

  if (!serviceTerms) return <div>Loading...</div>;

  return (
    
      <div className="container-xs flex justify-center md:px-5">
        <div className="w-full rounded-[40px] bg-gradient1 relative overflow-hidden">
          {/* Background image */}
          <div className="absolute inset-0">
            <Img
              src="image.png"
              alt="Background"
              width={500}
              height={720}
              className="absolute right-0 top-0 h-full sm:h-[86%] w-auto object-contain white-shade-mask"
            />
          </div>
          <div className="relative z-10 p-10 md:p-6 sm:p-4">
            <div className="flex flex-col gap-6 tab:gap-4">
              <div className="flex items-center gap-4 tab:flex-col">
                <div className="flex-1 flex flex-col gap-8 md:gap-6">
                  <div className="flex flex-col items-center">
                    <Heading
                      size="heading8xl"
                      as="h1"
                      className="text-center tab:text-left text-4xl tab:text-2xl sm:text-xl font-bold capitalize leading-tight text-white"
                    >
                      Services Terms
                    </Heading>
                    <Text
                      as="p"
                      className="mt-2 text-lg tab:text-base sm:text-sm font-medium capitalize text-color_white-a700_d1"
                    >
                      {serviceTerms.details}
                    </Text>
                  </div>

                  <div className="flex gap-8 md:gap-6 sm:gap-4 tab:flex-col w-[70%] md:w-full m-auto tab:m-0 ">
                    <UserProfile
                      coolingOffText={serviceTerms.terms[0]}
                      monthlyChargeText={serviceTerms.terms[2]}
                    />
                    <UserProfile
                      coolingOffText={serviceTerms.terms[1]}
                      monthlyChargeText={serviceTerms.terms[3]}
                    />
                  </div>
                </div>
              </div>

              <Text
                as="p"
                className="text-center text-base sm:text-sm font-normal capitalize italic leading-relaxed text-color_white-a700_cc w-[67%] tab:w-[80%] m-auto"
              >
                {serviceTerms.note}
              </Text>
            </div>
          </div>
        </div>
      </div>
  );
}