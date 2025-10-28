import { PlusIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useEffect } from "react";
import { usePushWalletContext, PushUniversalAccountButton } from "@pushchain/ui-kit";
import { useNavigate } from "react-router-dom";

const statistics = [
  { value: "250k+", label: "Volume" },
  { value: "50+", label: "NFTs Sold" },
  { value: "3000+", label: "Followers" },
];

const socialLinks = [
  { alt: "Globe", src: "/globe.svg" },
  { alt: "Discord logo", src: "/discordlogo.svg" },
  { alt: "Youtube logo", src: "/youtubelogo.svg" },
  { alt: "Twitter logo", src: "/twitterlogo.svg" },
  { alt: "Instagram logo", src: "/instagramlogo.svg" },
];

export const ArtistDetailsSection = (): JSX.Element => {
  const { universalAccount } = usePushWalletContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!universalAccount?.address) {
      window.location.reload();
      navigate("/");
    }
  }, [universalAccount]);

  return (
    <section className="flex flex-col gap-8 sm:gap-[30px] px-2 sm:px-4 md:px-6 py-6 sm:py-10 w-full bg-app-background items-center">
      <div className="w-full max-w-[1050px] gap-8 sm:gap-[30px] flex flex-col items-start">
        {/* Responsive flex: column on mobile, row for md+ screens */}
        <div className="flex flex-col md:flex-row md:items-start gap-8 sm:gap-[40px] md:gap-[60px] lg:gap-[100px] w-full">
          {/* Main Info Block */}
          <div className="flex-1 max-w-full md:max-w-[599px] gap-8 sm:gap-[30px] flex flex-col items-start">
            <h1 className="w-full max-w-full md:max-w-[510px] font-h2-work-sans font-[number:var(--h2-work-sans-font-weight)] text-white text-[length:var(--h2-work-sans-font-size)] tracking-[var(--h2-work-sans-letter-spacing)] leading-[var(--h2-work-sans-line-height)] [font-style:var(--h2-work-sans-font-style)] text-2xl sm:text-3xl md:text-4xl">
              Realm Master
            </h1>

            {/* Statistics - stack on mobile, row on md+ */}
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between w-full max-w-full md:max-w-[510px] items-start gap-4 xs:gap-4 sm:gap-5 rounded-[20px]">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start flex-1 rounded-[20px]"
                >
                  <div className="font-h4-space-mono font-[number:var(--h4-space-mono-font-weight)] text-white text-[length:var(--h4-space-mono-font-size)] tracking-[var(--h4-space-mono-letter-spacing)] leading-[var(--h4-space-mono-line-height)] [font-style:var(--h4-space-mono-font-style)] text-lg sm:text-xl">
                    {stat.value}
                  </div>
                  <div className="font-body-text-work-sans font-[number:var(--body-text-work-sans-font-weight)] text-white text-[length:var(--body-text-work-sans-font-size)] tracking-[var(--body-text-work-sans-letter-spacing)] leading-[var(--body-text-work-sans-line-height)] [font-style:var(--body-text-work-sans-font-style)] text-base">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="gap-2.5 w-full flex flex-col items-start">
              <h2 className="font-h5-space-mono font-[number:var(--h5-space-mono-font-weight)] text-[#858584] text-[length:var(--h5-space-mono-font-size)] tracking-[var(--h5-space-mono-letter-spacing)] leading-[var(--h5-space-mono-line-height)] [font-style:var(--h5-space-mono-font-style)] text-base sm:text-lg">
                Bio
              </h2>
              <p className="font-body-text-work-sans font-[number:var(--body-text-work-sans-font-weight)] text-white text-[length:var(--body-text-work-sans-font-size)] tracking-[var(--body-text-work-sans-letter-spacing)] leading-[var(--body-text-work-sans-line-height)] [font-style:var(--body-text-work-sans-font-style)] text-sm sm:text-base">
                The Internet&#39;s Friendliest Designer Kid.
              </p>
            </div>

            {/* Social Links */}
            <div className="gap-2.5 w-full flex flex-col items-start">
              <h2 className="font-h5-space-mono font-[number:var(--h5-space-mono-font-weight)] text-[#858584] text-[length:var(--h5-space-mono-font-size)] tracking-[var(--h5-space-mono-letter-spacing)] leading-[var(--h5-space-mono-line-height)] whitespace-nowrap [font-style:var(--h5-space-mono-font-style)] text-base sm:text-lg">
                Links
              </h2>
              <div className="flex flex-row flex-wrap items-center gap-3 sm:gap-2.5">
                {socialLinks.map((link, index) => (
                  <img
                    key={index}
                    className="w-7 h-7 sm:w-8 sm:h-8 transition-all duration-[0.3s] ease-[ease] cursor-pointer hover:opacity-80"
                    alt={link.alt}
                    src={link.src}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Actions (Follow, Wallet) */}
          <div className="flex flex-row md:flex-col items-center md:items-end justify-end gap-4 sm:gap-5 shrink-0 mt-6 md:mt-0 w-full md:w-auto">
            <Button className="h-auto items-center justify-center gap-3 px-4 sm:px-[25px] py-2 sm:py-[12px] rounded-[12px] border-2 border-solid border-[#a259ff] transition-all duration-[0.3s] ease-[ease] bg-transparent hover:bg-[#a259ff]/10 w-full md:w-auto">
              <PlusIcon className="w-5 h-5" />
              <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
                Follow
              </span>
            </Button>
            <div className="w-full md:w-auto flex justify-end">
              <PushUniversalAccountButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
