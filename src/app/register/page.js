
import RegisterImage from "@/components/RegisterImage";
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RegisterPage from "./RegisterPage";

export default function Page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token');

  if (accessToken) {
    redirect('/profile');
  }
  return (
    <div className="flex w-full items-start bg-white md:flex-col h-[100vh]">
      <RegisterImage />
      <RegisterPage />
    </div>
  );
}
