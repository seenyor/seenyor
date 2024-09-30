
import AccountSetting from "@/components/AccountSetting";
import ProfileSection from "./ProfileSection";
export default function ProfileContent() {
  return (
    <div className="flex w-full flex-col items-center py-[1.50rem] sm:py-[1.25rem]">
      <div className="container-xs mb-[0.25rem] flex flex-col gap-[4.38rem] md:gap-[3.25rem] md:px-[1.25rem] sm:gap-[2.19rem]">
        {/* <Header /> */}
        {/* here will be header */}
        <div className="mx-[13.75rem] mt-10 flex items-start gap-[2.50rem] md:mx-0 md:flex-col">
       <ProfileSection />
       {/* <BillingStatus /> */}
       <AccountSetting />
      </div>
    </div>
    </div>
  );
}