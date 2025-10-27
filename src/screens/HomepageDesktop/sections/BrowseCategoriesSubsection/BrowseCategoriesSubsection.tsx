import { Card, CardContent } from "../../../../components/ui/card";

const categories = [
  {
    name: "Art",
    icon: "/paintbrush.svg",
    alt: "Paint brush",
  },
  {
    name: "Collectibles",
    icon: "/swatches.svg",
    alt: "Swatches",
  },
  {
    name: "Music",
    icon: "/musicnotes.svg",
    alt: "Music notes",
  },
  {
    name: "Photography",
    icon: "/camera.svg",
    alt: "Camera",
  },
  {
    name: "Video",
    icon: "/videocamera.svg",
    alt: "Video camera",
  },
  {
    name: "Utility",
    icon: "/magicwand.svg",
    alt: "Magic wand",
  },
  {
    name: "Sport",
    icon: "/basketball.svg",
    alt: "Basketball",
  },
  {
    name: "Virtual Worlds",
    icon: "/planet.svg",
    alt: "Planet",
  },
];

export const BrowseCategoriesSubsection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-[40px] sm:gap-[60px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-[195px] py-10 sm:py-16 lg:py-20 w-full bg-app-background">
      <div className="flex flex-col w-full max-w-[1050px] items-start gap-2.5">
        <h2 className="flex-1 self-stretch font-h3-work-sans font-[number:var(--h3-work-sans-font-weight)] text-white text-[24px] sm:text-[32px] md:text-[length:var(--h3-work-sans-font-size)] tracking-[var(--h3-work-sans-letter-spacing)] leading-[var(--h3-work-sans-line-height)] [font-style:var(--h3-work-sans-font-style)]">
          Browse Categories
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[20px] sm:gap-[30px] w-full max-w-[1050px]">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="bg-[#3b3b3b] rounded-[20px] border-0 transition-all duration-[0.3s] ease-[ease] hover:shadow-lg cursor-pointer overflow-hidden"
          >
            <CardContent className="p-0">
              <div className="relative w-full h-60">
                <div className="absolute w-full top-0 left-0 h-60 bg-cover bg-[50%_50%]" />
                <div className="w-full h-60 flex items-center justify-center gap-2.5 absolute top-0 left-0 bg-[#ffffff1a] rounded-[20px_20px_0px_0px] backdrop-blur-[7.5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(7.5px)_brightness(100%)]">
                  <img
                    className="w-[100px] h-[100px] transition-all duration-[0.3s] ease-[ease]"
                    alt={category.alt}
                    src={category.icon}
                  />
                </div>
              </div>
              <div className="flex flex-col items-start gap-[25px] pt-5 pb-[25px] px-[30px]">
                <h3 className="self-stretch font-h5-work-sans font-[number:var(--h5-work-sans-font-weight)] text-white text-[length:var(--h5-work-sans-font-size)] tracking-[var(--h5-work-sans-letter-spacing)] leading-[var(--h5-work-sans-line-height)] [font-style:var(--h5-work-sans-font-style)]">
                  {category.name}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
