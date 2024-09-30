"use client"
import FallDetectorProfile from "@/components/FallDetectorComponent";
import { Heading, Img, Text } from "../../components";
import { useCart } from '../../context/CartContext';

const products = [
  {
    id: 'fall-detector',
    name: 'Fall Detector',
    price: 250,
    image: 'img_fall_detector_2.png',
    description: 'Ensure peace of mind for you and your loved ones with advanced fall detection technology. Receive instant alerts in case of a fall emergency.',
    packageDescription: 'has 2x from basic package'
  },
  {
    id: 'sleep-guardian',
    name: 'Sleep Guardian',
    price: 250,
    image: 'img_sleep_monitoring.png',
    description: 'Optimize your sleep quality and overall well-being with cutting-edge sleep monitoring sensors. Gain insights into your sleep patterns and make informed decisions for a healthier lifestyle.',
    packageDescription: 'has 1x from basic package'
  }
];
export default function ProductAction() {
  const { cart, addToCart, updateQuantity } = useCart();
  return (
    <div className="mt-[6.25rem] flex flex-col items-center">
      <div className="container-xs flex flex-col gap-[3.75rem] md:px-[1.25rem] sm:gap-[1.88rem]">
        <div className="flex items-start gap-[0.63rem] md:flex-col">
          <Img
            src="img_user.svg"
            width={54}
            height={54}
            alt="User"
            className="h-[3.38rem] w-[3.38rem] md:w-full"
          />
          <div>
            <Heading
              as="h2"
              className="text-[2.00rem] font-bold capitalize text-text md:text-[1.88rem] sm:text-[1.75rem]"
            >
              Add more Devices
            </Heading>
            <Text as="p" className="text-[1.13rem] font-normal text-body">
              Build upon your Foundation Package by adding additional devices
              from our curated selection.
            </Text>
          </div>
        </div>

        <div className="flex flex-col gap-[1.88rem]">
        {products.map((product) => (
            <FallDetectorProfile
              key={product.id}
              id={product.id}
              fallDetectorImage={product.image}
              fallDetectorTitle={product.name}
              fallDetectorDescription={product.description}
              price={product.price}
              packageDescription={product.packageDescription}
            />
          ))}
        </div>
       
      </div>
    </div>
  );
}
