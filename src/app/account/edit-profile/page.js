import { Button, Heading, Img, Input, Text } from "@/components";

export default function EditPage() {
  return (
    <div className="w-full">
      <div className="flex flex-col items-start border-b border-solid border-border pb-4 md:items-center md:text-center">
        <Heading
          size="text4xl"
          as="h3"
          className="text-[1.75rem] font-medium text-[#1d293f] md:text-[1.63rem] sm:text-[1.50rem] md:text-center"
        >
          Edit Profile
        </Heading>
        <Text
          as="p"
          className="mb-[0.05rem] text-[1.13rem] font-normal text-[#6c7482]"
        >
          Personalize your profile, Easily update your name and profile picture.
        </Text>
      </div>
      {/* Profile Image Section */}
      <div className="flex flex-col gap-4 md:text-center mb-10 pt-6">
        {/* Change Profile Image */}
        <div className="flex flex-col gap-2 md:items-center">
          <Heading
            size="headings"
            as="h6"
            className="text-lg font-semibold capitalize text-[#1d293f]"
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
        <div className="flex flex-col gap-1 ">
          <Heading
            size="headings"
            as="h6"
            className="text-lg font-semibold capitalize text-[#1d293f]"
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
        className="md:w-full  w-[10.63rem] rounded-[14px] px-[1.75rem] font-semibold sm:px-[1.25rem]"
      >
        Save Changes
      </Button>
    </div>
  );
}
