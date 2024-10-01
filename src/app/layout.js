import { AuthProvider } from "@/context/AuthContext";
import "@/styles/index.css";
import "@/styles/tailwind.css";
// import { Poppins } from "next/font/google";
import { CartProvider } from "../context/CartContext";



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
    <CartProvider>
      <html lang="en">
        <body >{children}</body>
      </html>
    </CartProvider>
    </AuthProvider>
  );
}
