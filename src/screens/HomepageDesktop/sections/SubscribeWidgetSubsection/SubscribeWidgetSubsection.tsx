import { MailIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

export const SubscribeWidgetSubsection = (): JSX.Element => {
  return (
    <section className="flex-col gap-2.5 pt-10 pb-10 sm:pb-20 px-5 sm:px-8 md:px-12 lg:px-20 xl:px-[195px] flex-[0_0_auto] bg-app-background flex items-center w-full">
      <div className="flex flex-col lg:flex-row w-full max-w-[1050px] items-center gap-8 lg:gap-20 p-6 sm:p-10 lg:p-[60px] bg-[#3b3b3b] rounded-[20px]">
        <img
          className="flex-1 w-full lg:w-auto h-[250px] sm:h-[310px] object-cover rounded-[10px]"
          alt="Photo"
          src="https://cdn.animaapp.com/projects/6183b51d6b5cbed9b6a0c937/releases/6183b5d4be8d7c64e2c9e5e7/img/photo-1@2x.png"
        />

        <div className="flex-col w-full lg:w-[425px] items-start gap-6 lg:gap-10 flex">
          <div className="flex flex-col items-start gap-2.5 w-full">
            <h3 className="self-stretch font-h3-work-sans font-[number:var(--h3-work-sans-font-weight)] text-white text-[24px] sm:text-[32px] md:text-[length:var(--h3-work-sans-font-size)] tracking-[var(--h3-work-sans-letter-spacing)] leading-[var(--h3-work-sans-line-height)] [font-style:var(--h3-work-sans-font-style)]">
              Join Our Weekly Digest
            </h3>

            <p className="self-stretch font-body-text-work-sans font-[number:var(--body-text-work-sans-font-weight)] text-white text-[16px] sm:text-[length:var(--body-text-work-sans-font-size)] tracking-[var(--body-text-work-sans-letter-spacing)] leading-[var(--body-text-work-sans-line-height)] [font-style:var(--body-text-work-sans-font-style)]">
              Get Exclusive Promotions &amp; Updates Straight To Your Inbox.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full h-auto sm:h-[60px] bg-text rounded-[20px] overflow-hidden gap-3 sm:gap-0 p-3 sm:p-0">
            <Input
              className="flex-1 h-[50px] sm:h-full bg-transparent border-0 font-base-body-work-sans font-[number:var(--base-body-work-sans-font-weight)] text-app-background text-[length:var(--base-body-work-sans-font-size)] tracking-[var(--base-body-work-sans-letter-spacing)] leading-[var(--base-body-work-sans-line-height)] [font-style:var(--base-body-work-sans-font-style)] placeholder:text-app-background/60 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none px-3 sm:px-5"
              placeholder="Enter your email here"
              type="email"
            />

            <Button className="h-[50px] sm:h-full px-6 sm:px-[50px] bg-call-to-action hover:bg-call-to-action/90 rounded-[20px] gap-3 transition-all duration-[0.3s] ease-[ease]">
              <MailIcon className="w-5 h-5" />
              <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
                Subscribe
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
