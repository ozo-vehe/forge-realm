import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";

const socialLinks = [
  { alt: "Discord logo", src: "/discordlogo.svg" },
  { alt: "Youtube logo", src: "/youtubelogo.svg" },
  { alt: "Twitter logo", src: "/twitterlogo.svg" },
  { alt: "Instagram logo", src: "/instagramlogo.svg" },
];

const exploreLinks = ["Marketplace", "Rankings", "Connect a wallet"];

export const FooterSubsection = (): JSX.Element => {
  return (
    <footer className="flex flex-col items-center gap-[30px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-[195px] py-10 w-full bg-background-secondary">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-full max-w-[1050px]">
        <div className="flex flex-col items-start gap-[30px] lg:col-span-1">
          <div className="flex items-center gap-3">
            <img className="w-8 h-8" alt="Storefront" src="/storefront.svg" />
            <img
              className="w-[199px] h-5"
              alt="Nft marketplace"
              src="/nft-marketplace.svg"
            />
          </div>

          <div className="flex flex-col gap-5">
            <p className="max-w-[238px] font-base-body-work-sans font-[number:var(--base-body-work-sans-font-weight)] text-[#cccccc] text-[length:var(--base-body-work-sans-font-size)] tracking-[var(--base-body-work-sans-letter-spacing)] leading-[var(--base-body-work-sans-line-height)] [font-style:var(--base-body-work-sans-font-style)]">
              NFT marketplace UI created with Anima for Figma.
            </p>

            <div className="flex flex-col items-start gap-[15px]">
              <p className="font-base-body-work-sans font-[number:var(--base-body-work-sans-font-weight)] text-[#cccccc] text-[length:var(--base-body-work-sans-font-size)] tracking-[var(--base-body-work-sans-letter-spacing)] leading-[var(--base-body-work-sans-line-height)] [font-style:var(--base-body-work-sans-font-style)]">
                Join our community
              </p>

              <div className="flex items-start gap-2.5">
                {socialLinks.map((social, index) => (
                  <img
                    key={index}
                    className="w-8 h-8"
                    alt={social.alt}
                    src={social.src}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-[25px]">
          <h3 className="font-h5-space-mono font-[number:var(--h5-space-mono-font-weight)] text-[#ffffff] text-[length:var(--h5-space-mono-font-size)] tracking-[var(--h5-space-mono-letter-spacing)] leading-[var(--h5-space-mono-line-height)] [font-style:var(--h5-space-mono-font-style)]">
            Explore
          </h3>

          <nav className="flex flex-col items-start gap-5">
            {exploreLinks.map((link, index) => (
              <a
                key={index}
                className="font-base-body-work-sans font-[number:var(--base-body-work-sans-font-weight)] text-[#cccccc] text-[length:var(--base-body-work-sans-font-size)] tracking-[var(--base-body-work-sans-letter-spacing)] leading-[var(--base-body-work-sans-line-height)] [font-style:var(--base-body-work-sans-font-style)] cursor-pointer hover:text-white transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-start gap-[25px] md:col-span-2 lg:col-span-1">
          <h3 className="font-h5-space-mono font-[number:var(--h5-space-mono-font-weight)] text-[#ffffff] text-[length:var(--h5-space-mono-font-size)] tracking-[var(--h5-space-mono-letter-spacing)] leading-[var(--h5-space-mono-line-height)] [font-style:var(--h5-space-mono-font-style)]">
            Join Our Weekly Digest
          </h3>

          <div className="flex flex-col items-start gap-5 w-full">
            <p className="max-w-[330px] font-base-body-work-sans font-[number:var(--base-body-work-sans-font-weight)] text-[#cccccc] text-[length:var(--base-body-work-sans-font-size)] tracking-[var(--base-body-work-sans-letter-spacing)] leading-[var(--base-body-work-sans-line-height)] [font-style:var(--base-body-work-sans-font-style)]">
              Get exclusive promotions &amp; updates straight to your inbox.
            </p>

            <div className="flex flex-col sm:flex-row w-full max-w-[420px] h-auto sm:h-[60px] items-stretch sm:items-center gap-3 sm:gap-0 p-3 sm:pl-5 sm:pr-0 sm:py-4 bg-text rounded-[20px]">
              <Input
                className="flex-1 h-[50px] sm:h-auto bg-transparent font-base-body-work-sans font-[number:var(--base-body-work-sans-font-weight)] text-app-background text-[length:var(--base-body-work-sans-font-size)] tracking-[var(--base-body-work-sans-letter-spacing)] leading-[var(--base-body-work-sans-line-height)] border-0 p-3 sm:p-0 [font-style:var(--base-body-work-sans-font-style)] focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Enter your email here"
              />

              <Button className="h-[50px] sm:h-[60px] px-6 sm:px-[50px] py-0 bg-call-to-action rounded-[20px] hover:bg-call-to-action/90 transition-all duration-300 ease-in-out">
                <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
                  Subscribe
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-5 w-full max-w-[1050px]">
        <Separator className="w-full bg-[#858584]" />

        <p className="font-caption-work-sans font-[number:var(--caption-work-sans-font-weight)] text-[#cccccc] text-[length:var(--caption-work-sans-font-size)] tracking-[var(--caption-work-sans-letter-spacing)] leading-[var(--caption-work-sans-line-height)] [font-style:var(--caption-work-sans-font-style)]">
          Ⓒ NFT Market. Use this template freely.
        </p>
      </div>
    </footer>
  );
};
