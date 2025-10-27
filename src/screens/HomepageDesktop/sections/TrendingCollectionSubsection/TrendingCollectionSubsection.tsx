import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Card, CardContent } from "../../../../components/ui/card";
import { ScrollArea, ScrollBar } from "../../../../components/ui/scroll-area";

const collectionsData = [
  {
    title: "Dsgn Animals",
    creator: "MrFox",
    count: "1025+",
    primaryImage: "",
    secondaryImages: ["", ""],
    avatarImage: "",
  },
  {
    title: "Magic Mushrooms",
    creator: "Shroomie",
    count: "1025+",
    primaryImage: "",
    secondaryImages: ["", ""],
    avatarImage: "",
  },
  {
    title: "Disco Machines",
    creator: "BeKind2Robots",
    count: "1025+",
    primaryImage: "",
    secondaryImages: ["", ""],
    avatarImage: "",
  },
];

export const TrendingCollectionSubsection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-[40px] sm:gap-[60px] px-5 sm:px-8 py-10 sm:py-16 lg:py-20 w-full bg-app-background">
      <div className="flex flex-col w-full max-w-[1046px] items-start gap-2.5">
        <div className="flex items-start gap-2.5 w-full">
          <h2 className="flex-1 mt-[-1.00px] font-h3-work-sans font-[number:var(--h3-work-sans-font-weight)] text-white text-[24px] sm:text-[32px] md:text-[length:var(--h3-work-sans-font-size)] tracking-[var(--h3-work-sans-letter-spacing)] leading-[var(--h3-work-sans-line-height)] [font-style:var(--h3-work-sans-font-style)]">
            Trending Collection
          </h2>
        </div>

        <div className="flex items-start gap-2.5 w-full">
          <p className="flex-1 mt-[-1.00px] font-body-text-work-sans font-[number:var(--body-text-work-sans-font-weight)] text-white text-[16px] sm:text-[length:var(--body-text-work-sans-font-size)] tracking-[var(--body-text-work-sans-letter-spacing)] leading-[var(--body-text-work-sans-line-height)] [font-style:var(--body-text-work-sans-font-style)]">
            Checkout Our Weekly Updated Trending Collection.
          </p>
        </div>
      </div>

      <ScrollArea className="w-full max-w-[1050px]">
        <div className="flex items-start gap-[30px] px-5 sm:px-8">
          {collectionsData.map((collection, index) => (
            <Card
              key={index}
              className="w-[280px] sm:w-[330px] min-w-[280px] sm:min-w-[330px] gap-[15px] bg-app-background rounded-[20px] border-0"
            >
              <CardContent className="p-0">
                <div className="flex flex-col items-start gap-[15px]">
                  <img
                    className="w-full h-[330px] rounded-t-[20px] transition-all duration-[0.3s] ease-[ease] object-cover"
                    alt="Primary photo"
                    src={collection.primaryImage}
                  />

                  <div className="flex items-start gap-[15px] w-full px-[15px]">
                    <img
                      className="flex-1 h-[100px] rounded-[20px] transition-all duration-[0.3s] ease-[ease] object-cover"
                      alt="Secondary photo"
                      src={collection.secondaryImages[0]}
                    />

                    <img
                      className="flex-1 h-[100px] rounded-[20px] transition-all duration-[0.3s] ease-[ease] object-cover"
                      alt="Secondary photo"
                      src={collection.secondaryImages[1]}
                    />

                    <div className="flex flex-col h-[100px] flex-1 items-center justify-center gap-2.5 px-[15px] py-8 bg-call-to-action rounded-[20px] transition-all duration-[0.3s] ease-[ease]">
                      <div className="flex items-center justify-center w-fit mt-[-0.50px] font-h5-space-mono font-[number:var(--h5-space-mono-font-weight)] text-[#ffffff] text-[length:var(--h5-space-mono-font-size)] text-center tracking-[var(--h5-space-mono-letter-spacing)] leading-[var(--h5-space-mono-line-height)] whitespace-nowrap [font-style:var(--h5-space-mono-font-style)]">
                        {collection.count}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-2.5 w-full px-[15px] pb-[15px]">
                    <h3 className="w-full mt-[-1.00px] font-h5-work-sans font-[number:var(--h5-work-sans-font-weight)] text-[#ffffff] text-[length:var(--h5-work-sans-font-size)] tracking-[var(--h5-work-sans-letter-spacing)] leading-[var(--h5-work-sans-line-height)] [font-style:var(--h5-work-sans-font-style)]">
                      {collection.title}
                    </h3>

                    <div className="flex items-center gap-3 w-full rounded-[20px]">
                      <Avatar className="w-6 h-6 transition-all duration-[0.3s] ease-[ease]">
                        <AvatarImage
                          src={collection.avatarImage}
                          alt={collection.creator}
                        />
                        <AvatarFallback>
                          {collection.creator.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <span className="flex-1 mt-[-1.00px] font-base-body-work-sans font-[number:var(--base-body-work-sans-font-weight)] text-[#ffffff] text-[length:var(--base-body-work-sans-font-size)] tracking-[var(--base-body-work-sans-letter-spacing)] leading-[var(--base-body-work-sans-line-height)] [font-style:var(--base-body-work-sans-font-style)]">
                        {collection.creator}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};
