"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import ProductAction from "./ProductAction";

const ProductDetails = dynamic(() => import("./ProductDetails"), { 
  loading: () => <LoadingSpinner />,
  ssr: false 
});
const ProductHero = dynamic(() => import("../buydevice/ProductHero"), { 
  loading: () => <LoadingSpinner />,
  ssr: false 
});
const ProductPack = dynamic(() => import("./ProductPack"), { 
  loading: () => <LoadingSpinner />,
  ssr: false 
});
const ProductService = dynamic(() => import("./ProductService"), { 
  loading: () => <LoadingSpinner />,
  ssr: false 
});

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [fallDetectorQuantity, setFallDetectorQuantity] = useState(2);
  const [sleepGuardianQuantity, setSleepGuardianQuantity] = useState(1);
  const [calculatedTotals, setCalculatedTotals] = useState({
    fallDetectorTotal: 500,
    sleepGuardianTotal: 250,
    packageTotal: 999,
    monitoringServiceTotal: 49.99,
    grandTotal: 1798.99
  });

  const calculateTotals = useCallback(() => {
    const fallDetectorTotal = fallDetectorQuantity * 250;
    const sleepGuardianTotal = sleepGuardianQuantity * 250;
    const packageTotal = 999;
    const monitoringServiceTotal = 49.99;
    const grandTotal = fallDetectorTotal + sleepGuardianTotal + packageTotal + monitoringServiceTotal;

    setCalculatedTotals({
      fallDetectorTotal,
      sleepGuardianTotal,
      packageTotal,
      monitoringServiceTotal,
      grandTotal
    });
  }, [fallDetectorQuantity, sleepGuardianQuantity]);

  useEffect(() => {
    calculateTotals();
    setIsLoading(false);
  }, [calculateTotals]);

  const handleQuantityChange = useCallback((device, newQuantity) => {
    if (device === "fallDetector") {
      setFallDetectorQuantity(newQuantity);
    } else if (device === "sleepGuardian") {
      setSleepGuardianQuantity(newQuantity);
    }
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex w-full flex-col gap-[6.13rem] bg-white py-[1.50rem] md:gap-[4.56rem] sm:gap-[3.06rem] sm:py-[1.25rem]">
      <ProductHero />
      <div className="mb-[0.25rem] flex flex-col gap-[6.25rem] md:gap-[4.69rem] sm:gap-[3.13rem]">
        <div>
          <ProductPack />
          <div className="flex flex-col gap-[6.25rem] md:gap-[4.69rem] sm:gap-[3.13rem]">
            <ProductAction
              fallDetectorQuantity={fallDetectorQuantity}
              sleepGuardianQuantity={sleepGuardianQuantity}
              onQuantityChange={handleQuantityChange}
            />
            <ProductService />
          </div>
        </div>
        <ProductDetails
          fallDetectorQuantity={fallDetectorQuantity}
          sleepGuardianQuantity={sleepGuardianQuantity}
          {...calculatedTotals}
        />
      </div>
    </div>
  );
}