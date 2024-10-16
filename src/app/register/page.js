import { cookies } from "next/headers";
import RegisterPage from "./RegisterPage";

export default function Page() {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access_token");

  // if (accessToken) {
  //   redirect("/profile");
  // }
  return (
    <div className="w-full bg-white">
      {/* <RegisterImage /> */}
      <RegisterPage />
    </div>
  );
}
