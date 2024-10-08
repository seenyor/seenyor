import { cookies } from "next/headers";
import { redirect } from 'next/navigation';
import Page from ".";

export default function PaymentPage() {
  const cookieStore = cookies();
  const stripeCustomerId = cookieStore.get("stripeCustomerId");
  const accessToken = cookieStore.get('access_token');

  // If there's an access token, redirect to the homepage
  if (accessToken) {
    redirect('/');  // Assuming '/' is your homepage route
  }

  // If there's no stripeCustomerId, redirect to the registration page
  if (!stripeCustomerId) {
    redirect('/register');
  }

  // If we have a stripeCustomerId but no access token, show the payment page
  return <Page />;
}