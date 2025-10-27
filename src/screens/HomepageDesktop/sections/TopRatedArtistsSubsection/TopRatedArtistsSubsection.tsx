import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const creators = [
  { id: 1, name: "Keepitreal", sales: "34.53 ETH", rank: 1 },
  { id: 2, name: "Digilab", sales: "34.53 ETH", rank: 2 },
  { id: 3, name: "Gravityone", sales: "34.53 ETH", rank: 3 },
  { id: 4, name: "Juanie", sales: "34.53 ETH", rank: 4 },
  { id: 5, name: "Bluewhale", sales: "34.53 ETH", rank: 5 },
  { id: 6, name: "Mr Fox", sales: "34.53 ETH", rank: 6 },
  { id: 7, name: "Shroomie", sales: "34.53 ETH", rank: 7 },
  { id: 8, name: "Robotica", sales: "34.53 ETH", rank: 8 },
  { id: 9, name: "Rustyrobot", sales: "34.53 ETH", rank: 9 },
  { id: 10, name: "Animakid", sales: "34.53 ETH", rank: 10 },
  { id: 11, name: "Dotgu", sales: "34.53 ETH", rank: 11 },
  { id: 12, name: "Ghiblier", sales: "34.53 ETH", rank: 12 },
];

export const TopRatedArtistsSubsection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-[40px] sm:gap-[60px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-[195px] py-10 sm:py-16 lg:py-20 w-full bg-app-background">
      <div className="flex flex-col sm:flex-row w-full max-w-[1050px] items-start sm:items-end justify-between gap-6 sm:gap-[100px]">
        <div className="flex flex-col items-start gap-2.5 flex-1">
          <h2 className="font-h3-work-sans font-[number:var(--h3-work-sans-font-weight)] text-white text-[24px] sm:text-[32px] md:text-[length:var(--h3-work-sans-font-size)] tracking-[var(--h3-work-sans-letter-spacing)] leading-[var(--h3-work-sans-line-height)] [font-style:var(--h3-work-sans-font-style)]">
            Top Creators
          </h2>
          <p className="font-body-text-work-sans font-[number:var(--body-text-work-sans-font-weight)] text-white text-[16px] sm:text-[length:var(--body-text-work-sans-font-size)] tracking-[var(--body-text-work-sans-letter-spacing)] leading-[var(--body-text-work-sans-line-height)] [font-style:var(--body-text-work-sans-font-style)]">
            Checkout Top Rated Creators On The Nft Marketplace
          </p>
        </div>

        <Button
          variant="outline"
          className="h-[50px] sm:h-[60px] gap-3 px-6 sm:px-[50px] py-0 rounded-[20px] border-2 border-[#a259ff] bg-transparent hover:bg-[#a259ff] transition-all duration-[0.3s] ease-[ease] w-full sm:w-auto"
        >
          <img
            className="w-5 h-5"
            alt="Rocket launch"
            src="/rocketlaunch.svg"
          />
          <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
            View Rankings
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[20px] sm:gap-[30px] w-full max-w-[1050px]">
        {creators.map((creator) => (
          <Card
            key={creator.id}
            className="relative flex flex-col gap-5 p-5 transition-all duration-[0.3s] ease-[ease] items-center bg-[#3b3b3b] rounded-[20px] border-0"
          >
            <CardContent className="flex flex-col items-center gap-5 p-0 w-full">
              <div className="flex flex-col items-end">
                <Avatar className="w-[120px] h-[120px]">
                  <AvatarImage src="" alt={creator.name} />
                  <AvatarFallback className="bg-cover bg-[50%_50%]" />
                </Avatar>
              </div>

              <div className="flex flex-col items-center justify-center gap-[5px] w-full">
                <h3 className="w-full font-h5-work-sans font-[number:var(--h5-work-sans-font-weight)] text-[#ffffff] text-[length:var(--h5-work-sans-font-size)] text-center tracking-[var(--h5-work-sans-letter-spacing)] leading-[var(--h5-work-sans-line-height)] [font-style:var(--h5-work-sans-font-style)]">
                  {creator.name}
                </h3>

                <div className="flex items-start justify-center gap-2.5 w-full">
                  <span className="flex-1 text-caption-label-text text-[length:var(--base-body-work-sans-font-size)] text-right leading-[var(--base-body-work-sans-line-height)] font-base-body-work-sans font-[number:var(--base-body-work-sans-font-weight)] tracking-[var(--base-body-work-sans-letter-spacing)] [font-style:var(--base-body-work-sans-font-style)]">
                    Total Sales:
                  </span>

                  <span className="flex-1 font-base-body-space-mono font-[number:var(--base-body-space-mono-font-weight)] text-text text-[length:var(--base-body-space-mono-font-size)] tracking-[var(--base-body-space-mono-letter-spacing)] leading-[var(--base-body-space-mono-line-height)] [font-style:var(--base-body-space-mono-font-style)]">
                    {creator.sales}
                  </span>
                </div>
              </div>
            </CardContent>

            <Badge className="absolute top-[18px] left-5 w-[30px] h-[30px] bg-app-background rounded-[20px] flex items-center justify-center border-0 hover:bg-app-background">
              <span className="font-base-body-space-mono font-[number:var(--base-body-space-mono-font-weight)] text-caption-label-text text-[length:var(--base-body-space-mono-font-size)] text-center tracking-[var(--base-body-space-mono-letter-spacing)] leading-[var(--base-body-space-mono-line-height)] [font-style:var(--base-body-space-mono-font-style)]">
                {creator.rank}
              </span>
            </Badge>
          </Card>
        ))}
      </div>
    </section>
  );
};
