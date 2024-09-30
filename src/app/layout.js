import { AuthProvider } from "@/context/AuthContext";
import "@/styles/index.css";
import "@/styles/tailwind.css";
import { Poppins } from "next/font/google";
import { CartProvider } from "../context/CartContext";

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
   preload: false,
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
    <CartProvider>
      <html lang="en">
        <body className={`${poppins.className} bg-white`}>{children}</body>
      </html>
    </CartProvider>
    </AuthProvider>
  );
}
