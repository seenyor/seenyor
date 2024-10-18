import Header from "@/components/Header";
import ProfileNav from "./ProfileNav";
export default function AccountLayout({ children }) {
  return (
    <div className="flex w-full flex-col items-center py-[1.50rem] sm:py-[1.25rem]">
        <Header />
      <div className="container-xss mb-[0.25rem] flex flex-col gap-[4.38rem] md:gap-[3.25rem] md:px-[1.25rem] sm:gap-[2.19rem] h-full pt-12">
      
        {/* here will be header */}
        <div className="flex md:w-full md:flex-col max-w-[55rem] gap-8 mx-auto md:items-center">
          <ProfileNav />
          {/* Main Content */}
          <div className="flex flex-col items-start gap-5 max-w-[34.37rem] md:w-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
