import { EyeIcon } from "lucide-react";
import React from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const timerData = [
  { value: "59", label: "Hours" },
  { value: "59", label: "Minutes" },
  { value: "59", label: "Seconds" },
];

export const NftHighlightSubsection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center relative w-full bg-cover bg-[50%_50%]">
      <div className="items-end justify-center pt-[200px] sm:pt-[280px] md:pt-[360px] pb-[40px] sm:pb-[60px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-[195px] bg-[linear-gradient(180deg,rgba(162,89,255,0)_0%,rgba(162,89,255,1)_100%)] flex relative w-full">
        <div className="w-full max-w-[1050px] items-end justify-center flex flex-col lg:flex-row gap-[30px] lg:gap-0 relative">
          <div className="flex flex-col items-start gap-[20px] sm:gap-[30px] relative flex-1 w-full">
            <Badge className="inline-flex gap-3 px-5 py-2.5 items-center bg-[#3b3b3b] rounded-[20px] hover:bg-[#3b3b3b] h-auto">
              <div className="inline-flex items-start gap-2.5 relative transition-all duration-[0.3s] ease-[ease]">
                <div className="relative w-6 h-6 bg-cover bg-[50%_50%]" />
              </div>
              <span className="font-base-body-work-sans font-[number:var(--base-body-work-sans-font-weight)] text-[length:var(--base-body-work-sans-font-size)] leading-[var(--base-body-work-sans-line-height)] text-[#ffffff] tracking-[var(--base-body-work-sans-letter-spacing)] [font-style:var(--base-body-work-sans-font-style)]">
                Shroomie
              </span>
            </Badge>

            <h2 className="relative self-stretch font-h2-work-sans font-[number:var(--h2-work-sans-font-weight)] text-[#ffffff] text-[32px] sm:text-[48px] md:text-[length:var(--h2-work-sans-font-size)] tracking-[var(--h2-work-sans-letter-spacing)] leading-[var(--h2-work-sans-line-height)] [font-style:var(--h2-work-sans-font-style)]">
              Magic Mashrooms
            </h2>

            <Button className="inline-flex h-[50px] sm:h-[60px] items-center justify-center gap-3 px-8 sm:px-[50px] py-[22px] bg-text rounded-[20px] transition-all duration-[0.3s] ease-[ease] hover:bg-text/90 w-full sm:w-auto">
              <EyeIcon className="w-5 h-5" />
              <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-app-background text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
                See NFT
              </span>
            </Button>
          </div>

          <Card className="w-full sm:w-[295px] bg-[#3b3b3b80] rounded-[20px] backdrop-blur-[5px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(5px)_brightness(100%)] border-0">
            <CardContent className="flex flex-col items-start justify-end gap-2.5 p-[30px]">
              <p className="relative self-stretch font-caption-space-mono font-[number:var(--caption-space-mono-font-weight)] text-text text-[length:var(--caption-space-mono-font-size)] tracking-[var(--caption-space-mono-letter-spacing)] leading-[var(--caption-space-mono-line-height)] [font-style:var(--caption-space-mono-font-style)]">
                Auction ends in:
              </p>

              <div className="flex items-start gap-2.5 relative self-stretch w-full">
                {timerData.map((item, index) => (
                  <React.Fragment key={index}>
                    <div className="flex flex-col items-start gap-[5px] relative flex-1">
                      <div className="relative self-stretch font-h3-space-mono font-[number:var(--h3-space-mono-font-weight)] text-text text-[length:var(--h3-space-mono-font-size)] tracking-[var(--h3-space-mono-letter-spacing)] leading-[var(--h3-space-mono-line-height)] [font-style:var(--h3-space-mono-font-style)]">
                        {item.value}
                      </div>
                      <div className="relative flex-1 self-stretch font-caption-space-mono font-[number:var(--caption-space-mono-font-weight)] text-text text-[length:var(--caption-space-mono-font-size)] tracking-[var(--caption-space-mono-letter-spacing)] leading-[var(--caption-space-mono-line-height)] whitespace-nowrap [font-style:var(--caption-space-mono-font-style)]">
                        {item.label}
                      </div>
                    </div>
                    {index < timerData.length - 1 && (
                      <div className="relative w-fit font-h4-space-mono font-[number:var(--h4-space-mono-font-weight)] text-text text-[length:var(--h4-space-mono-font-size)] tracking-[var(--h4-space-mono-letter-spacing)] leading-[var(--h4-space-mono-line-height)] whitespace-nowrap [font-style:var(--h4-space-mono-font-style)]">
                        :
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
