import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

const howItWorksSteps = [
  {
    icon: "/icon-1.svg",
    title: "Setup Your Wallet",
    description:
      "Set up your wallet of choice. Connect it to the Animarket by clicking the wallet icon in the top right corner.",
  },
  {
    icon: "/icon.svg",
    title: "Create Collection",
    description:
      "Upload your work and setup your collection. Add a description, social links and floor price.",
  },
  {
    icon: "/icon-2.svg",
    title: "Start Earning",
    description:
      "Choose between auctions and fixed-price listings. Start earning by selling your NFTs or trading others.",
  },
];

export const HowItWorksSubsection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-8 sm:gap-12 px-5 sm:px-8 md:px-12 lg:px-20 xl:px-[195px] py-10 sm:py-16 lg:py-20 w-full bg-app-background">
      <header className="flex flex-col items-start gap-2.5 w-full max-w-[1050px]">
        <h2 className="w-full font-h3-work-sans font-[number:var(--h3-work-sans-font-weight)] text-white text-[24px] sm:text-[32px] md:text-[length:var(--h3-work-sans-font-size)] tracking-[var(--h3-work-sans-letter-spacing)] leading-[var(--h3-work-sans-line-height)] [font-style:var(--h3-work-sans-font-style)]">
          How It Works
        </h2>

        <p className="w-full font-body-text-work-sans font-[number:var(--body-text-work-sans-font-weight)] text-white text-[16px] sm:text-[length:var(--body-text-work-sans-font-size)] tracking-[var(--body-text-work-sans-letter-spacing)] leading-[var(--body-text-work-sans-line-height)] [font-style:var(--body-text-work-sans-font-style)]">
          Find Out How To Get Started
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] sm:gap-[30px] w-full max-w-[1050px]">
        {howItWorksSteps.map((step, index) => (
          <Card
            key={index}
            className="flex flex-col w-full bg-background-secondary rounded-[20px] border-0"
          >
            <CardContent className="flex flex-col items-center gap-5 pt-2.5 pb-[30px] px-[30px]">
              <img
                className="w-[250px] h-[250px]"
                alt={step.title}
                src={step.icon}
              />

              <div className="flex flex-col items-center gap-2.5 w-full">
                <h3 className="w-full font-h5-work-sans font-[number:var(--h5-work-sans-font-weight)] text-[#ffffff] text-[length:var(--h5-work-sans-font-size)] text-center tracking-[var(--h5-work-sans-letter-spacing)] leading-[var(--h5-work-sans-line-height)] [font-style:var(--h5-work-sans-font-style)]">
                  {step.title}
                </h3>

                <p className="w-full font-base-body-work-sans font-[number:var(--base-body-work-sans-font-weight)] text-white text-[length:var(--base-body-work-sans-font-size)] text-center tracking-[var(--base-body-work-sans-letter-spacing)] leading-[var(--base-body-work-sans-line-height)] [font-style:var(--base-body-work-sans-font-style)]">
                  {step.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
