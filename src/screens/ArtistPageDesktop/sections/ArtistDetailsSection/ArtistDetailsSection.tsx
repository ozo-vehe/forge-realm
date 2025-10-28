import { PlusIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useEffect } from "react";
import { usePushWalletContext, PushUniversalAccountButton } from "@pushchain/ui-kit";
import { useNavigate } from "react-router-dom";

const statistics = [
  { value: "250k+", label: "Volume" },
  { value: "50+", label: "NFTs Sold" },
  { value: "3000+", label: "Followers" },
]

const socialLinks = [
  { alt: "Globe", src: "/globe.svg" },
  { alt: "Discord logo", src: "/discordlogo.svg" },
  { alt: "Youtube logo", src: "/youtubelogo.svg" },
  { alt: "Twitter logo", src: "/twitterlogo.svg" },
  { alt: "Instagram logo", src: "/instagramlogo.svg" },
];

export const ArtistDetailsSection = (): JSX.Element => {
  const {universalAccount} = usePushWalletContext()
  const navigate = useNavigate();

  useEffect(() => {
    console.log(universalAccount)
    if(!universalAccount?.address) {
      window.location.reload();
      navigate("/")
    }
  }, [universalAccount])

  return (
    <section className="flex flex-col gap-[30px] px-0 py-10 w-full bg-app-background items-center">
      <div className="w-full max-w-[1050px] gap-[30px] flex flex-col items-start">
        <div className="flex items-start gap-[100px] w-full">
          <div className="flex-1 max-w-[599px] gap-[30px] flex flex-col items-start">
            <h1 className="w-full max-w-[510px] font-h2-work-sans font-[number:var(--h2-work-sans-font-weight)] text-white text-[length:var(--h2-work-sans-font-size)] tracking-[var(--h2-work-sans-letter-spacing)] leading-[var(--h2-work-sans-line-height)] [font-style:var(--h2-work-sans-font-style)]">
              Realm Master
            </h1>

            <div className="flex w-full max-w-[510px] items-start gap-5 rounded-[20px]">
              {statistics.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start flex-1 rounded-[20px]"
                >
                  <div className="font-h4-space-mono font-[number:var(--h4-space-mono-font-weight)] text-white text-[length:var(--h4-space-mono-font-size)] tracking-[var(--h4-space-mono-letter-spacing)] leading-[var(--h4-space-mono-line-height)] [font-style:var(--h4-space-mono-font-style)]">
                    {stat.value}
                  </div>
                  <div className="font-body-text-work-sans font-[number:var(--body-text-work-sans-font-weight)] text-white text-[length:var(--body-text-work-sans-font-size)] tracking-[var(--body-text-work-sans-letter-spacing)] leading-[var(--body-text-work-sans-line-height)] [font-style:var(--body-text-work-sans-font-style)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="gap-2.5 w-full flex flex-col items-start">
              <h2 className="font-h5-space-mono font-[number:var(--h5-space-mono-font-weight)] text-[#858584] text-[length:var(--h5-space-mono-font-size)] tracking-[var(--h5-space-mono-letter-spacing)] leading-[var(--h5-space-mono-line-height)] [font-style:var(--h5-space-mono-font-style)]">
                Bio
              </h2>
              <p className="font-body-text-work-sans font-[number:var(--body-text-work-sans-font-weight)] text-white text-[length:var(--body-text-work-sans-font-size)] tracking-[var(--body-text-work-sans-letter-spacing)] leading-[var(--body-text-work-sans-line-height)] [font-style:var(--body-text-work-sans-font-style)]">
                The Internet&#39;s Friendliest Designer Kid.
              </p>
            </div>

            <div className="gap-2.5 w-full flex flex-col items-start">
              <h2 className="font-h5-space-mono font-[number:var(--h5-space-mono-font-weight)] text-[#858584] text-[length:var(--h5-space-mono-font-size)] tracking-[var(--h5-space-mono-letter-spacing)] leading-[var(--h5-space-mono-line-height)] whitespace-nowrap [font-style:var(--h5-space-mono-font-style)]">
                Links
              </h2>
              <div className="inline-flex items-start gap-2.5">
                {socialLinks.map((link, index) => (
                  <img
                    key={index}
                    className="w-8 h-8 transition-all duration-[0.3s] ease-[ease] cursor-pointer hover:opacity-80"
                    alt={link.alt}
                    src={link.src}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="inline-flex items-center justify-end gap-5">
            <Button className="h-auto items-center justify-center gap-3 px-[25px] py-[12px] rounded-[12px] border-2 border-solid border-[#a259ff] transition-all duration-[0.3s] ease-[ease] bg-transparent hover:bg-[#a259ff]/10">
              <PlusIcon className="w-5 h-5" />
              <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
                Follow
              </span>
            </Button>
            <PushUniversalAccountButton />
          </div>
        </div>
      </div>
    </section>
  );
};
