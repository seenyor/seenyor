import AccountComplete from "@/components/AccountComplete";
function page() {
  // const cookieStore = cookies();
  // const accessToken = cookieStore.get("access_token");

  // if (!accessToken) {
  //   redirect("/");
  // }

  return (
    <div>
      <AccountComplete />
    </div>
  );
}

export default page;
