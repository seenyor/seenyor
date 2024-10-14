import ProfileNav from "./ProfileNav";

export default function AccountLayout({ children }) {
  return (
    <div className="flex w-full flex-col items-center py-[1.50rem] sm:py-[1.25rem]">
      {/* <Header /> */}
      <div className="container-xs mb-[0.25rem] flex flex-col gap-[4.38rem] md:gap-[3.25rem] md:px-[1.25rem] sm:gap-[2.19rem]">
        {/* here will be header */}
        <div className="mx-[13.75rem] mt-10 flex items-start gap-[2.50rem] md:mx-0 md:flex-col">
          <ProfileNav />
          {/* Main Content */}

          {children}
        </div>
      </div>
    </div>
  );
}


