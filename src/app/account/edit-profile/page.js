import { Button, Heading, Img, Input, Text } from "@/components";

export default function EditPage() {
  return (
    <>
      {/* Main Content Area */}
      <div className="flex flex-col items-start gap-5  w-full md:self-stretch">
        {/* Edit Profile Card */}
        <div className="flex flex-col gap-2 self-stretch border-b border-border pb-4">
          <Heading
            size="text3xl"
            as="h6"
            className="text-2xl font-medium text-text md:text-2xl sm:text-xl"
          >
            Edit Profile
          </Heading>
          <Text as="p" className="text-lg font-normal leading-6 text-body">
            Personalize your profile, easily update your name and profile
            picture.
          </Text>
        </div>

        {/* Profile Image Section */}
        <div className="flex flex-col gap-2 w-full">
          {/* Change Profile Image */}
          <div className="flex flex-col gap-1">
            <Heading
              size="headings"
              as="h6"
              className="text-lg font-semibold capitalize text-text"
            >
              Change Your Profile Image
            </Heading>
            <Img
              src="img_ellipse_71.png"
              width={44}
              height={44}
              alt="Ellipse 71"
              className="h-[3rem] w-[3rem] rounded-[22px] object-cover border-2 border-transparent group-hover:border-blue-300 transition-all duration-300"
            />
          </div>

          {/* Display Name Input */}
          <div className="flex flex-col gap-1">
            <Heading
              size="headings"
              as="h6"
              className="text-lg font-semibold capitalize text-text"
            >
              Display Name
            </Heading>
            <Input
              shape="round"
              name="Label"
              placeholder="Kasem Mia"
              className="self-stretch rounded-[12px] !border px-[1.63rem] sm:px-[1.25rem]"
            />
          </div>
        </div>

        {/* Save Changes Button */}
        <Button
          color="green_200_green_400_01"
          shape="round"
          className="min-w-[10.63rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
        >
          Save Changes
        </Button>
      </div>
    </>
  );
}
