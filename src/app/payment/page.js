import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import Page from ".";
export default function PaymentPage() {
  const cookieStore = cookies();
  const stripeCustomerId = cookieStore.get("stripeCustomerId");

  if (!stripeCustomerId) {
    redirect('/register');
  }

  return <Page />;
}