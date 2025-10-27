import { RocketIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";

const stats = [
  {
    value: "240k+",
    label: "Total Sale",
  },
  {
    value: "100k+",
    label: "Auctions",
  },
  {
    value: "240k+",
    label: "Artists",
  },
];

export const HeroSectionSubsection = (): JSX.Element => {
  return (
    <section className="flex items-center justify-center gap-[30px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-[195px] py-10 sm:py-16 lg:py-20 w-full bg-app-background">
      <div className="flex flex-col lg:flex-row w-full max-w-[1050px] items-start gap-[30px]">
        <div className="flex flex-col items-start gap-[30px] flex-1 w-full">
          <div className="flex flex-col items-start gap-5 w-full">
            <h1 className="font-h1-work-sans font-[number:var(--h1-work-sans-font-weight)] text-white text-[28px] sm:text-[38px] md:text-[48px] lg:text-[length:var(--h1-work-sans-font-size)] tracking-[var(--h1-work-sans-letter-spacing)] leading-[1.2] sm:leading-[var(--h1-work-sans-line-height)] [font-style:var(--h1-work-sans-font-style)]">
              Discover Digital Art &amp; Collect Nfts
            </h1>

            <p className="font-body-text-work-sans font-[number:var(--body-text-work-sans-font-weight)] text-white text-[16px] sm:text-[length:var(--body-text-work-sans-font-size)] tracking-[var(--body-text-work-sans-letter-spacing)] leading-[1.6] sm:leading-[var(--body-text-work-sans-line-height)] [font-style:var(--body-text-work-sans-font-style)]">
              Nft Marketplace Ui Created With Anima For Figma. Collect, Buy And
              Sell Art From More Than 20k Nft Artists.
            </p>
          </div>

          <Button className="h-[50px] sm:h-[60px] gap-3 px-8 sm:px-[50px] py-0 bg-call-to-action rounded-[20px] transition-all duration-[0.3s] ease-[ease] hover:bg-call-to-action/90 w-full sm:w-auto">
            <RocketIcon className="w-5 h-5" />
            <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
              Get Started
            </span>
          </Button>

          <div className="flex gap-5 sm:gap-[30px] w-full">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col flex-1 items-start">
                <div className="font-h4-space-mono font-[number:var(--h4-space-mono-font-weight)] text-white text-[18px] sm:text-[24px] md:text-[length:var(--h4-space-mono-font-size)] tracking-[var(--h4-space-mono-letter-spacing)] leading-[var(--h4-space-mono-line-height)] [font-style:var(--h4-space-mono-font-style)]">
                  {stat.value}
                </div>
                <div className="text-white text-base sm:text-lg md:text-2xl leading-[1.6] md:leading-[38.4px] [font-family:'Work_Sans',Helvetica] font-normal tracking-[0]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <img
          className="flex-1 w-full lg:w-auto h-[300px] sm:h-[400px] lg:h-[510px] object-cover rounded-[20px]"
          alt="Highlighted NFT"
          src="https://cdn.animaapp.com/projects/6357ce7c8a65b2f16659918c/files/heroanimationtransparentbck-2.gif"
        />
      </div>
    </section>
  );
};
