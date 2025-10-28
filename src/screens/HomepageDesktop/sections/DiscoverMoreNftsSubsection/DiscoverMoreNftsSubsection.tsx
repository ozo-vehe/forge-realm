import { EyeIcon } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

const nftCards = [
  {
    title: "Distant Galaxy",
    artist: "MoonDancer",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    title: "Life On Edena",
    artist: "NebulaKid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    title: "Astrofiction",
    artist: "Spaceone",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
];

export const DiscoverMoreNftsSubsection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-[40px] sm:gap-[60px] px-5 sm:px-8 md:px-12 lg:px-20 xl:px-[195px] py-10 sm:py-16 lg:py-20 w-full bg-app-background">
      <div className="flex flex-col sm:flex-row flex-wrap w-full max-w-[1320px] items-start sm:items-end gap-6 sm:gap-[100px] justify-between">
        <div className="flex flex-col items-start gap-2.5 flex-1">
          <h2 className="self-stretch mt-[-1.00px] font-h3-work-sans font-[number:var(--h3-work-sans-font-weight)] text-white text-[24px] sm:text-[32px] md:text-[length:var(--h3-work-sans-font-size)] tracking-[var(--h3-work-sans-letter-spacing)] leading-[var(--h3-work-sans-line-height)] [font-style:var(--h3-work-sans-font-style)]">
            Discover More Nfts
          </h2>

          <p className="self-stretch font-body-text-work-sans font-[number:var(--body-text-work-sans-font-weight)] text-white text-[16px] sm:text-[length:var(--body-text-work-sans-font-size)] tracking-[var(--body-text-work-sans-letter-spacing)] leading-[var(--body-text-work-sans-line-height)] [font-style:var(--body-text-work-sans-font-style)]">
            Explore New Trending Nfts
          </p>
        </div>

        <Button
          variant="outline"
          className="h-[50px] sm:h-[60px] gap-3 px-6 sm:px-[50px] py-0 rounded-[20px] border-2 border-[#a259ff] bg-transparent hover:bg-[#a259ff] transition-all duration-[0.3s] ease-[ease] w-full sm:w-auto"
        >
          <EyeIcon className="w-5 h-5" />
          <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
            See All
          </span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-[1320px] gap-[20px] sm:gap-[30px]">
        {nftCards.map((nft, index) => (
          <Card
            key={index}
            className="flex flex-col h-[469px] items-center bg-[#3b3b3b] rounded-[20px] border-0 transition-all duration-[0.3s] ease-[ease] hover:shadow-lg cursor-pointer"
          >
            <div className="flex flex-col items-start gap-2.5 self-stretch w-full rounded-[20px_20px_0px_0px] overflow-hidden">
              <div className="self-stretch w-full h-[296px] bg-gradient-to-br from-gray-600 to-gray-800" />
            </div>

            <CardContent className="flex flex-col items-start gap-[25px] pt-5 pb-[25px] px-[30px] self-stretch w-full">
              <div className="flex flex-col items-start gap-[5px] self-stretch w-full">
                <h3 className="self-stretch mt-[-1.00px] font-h5-work-sans font-[number:var(--h5-work-sans-font-weight)] text-white text-[length:var(--h5-work-sans-font-size)] tracking-[var(--h5-work-sans-letter-spacing)] leading-[var(--h5-work-sans-line-height)] [font-style:var(--h5-work-sans-font-style)]">
                  {nft.title}
                </h3>

                <div className="flex items-start gap-3 self-stretch w-full">
                  <div className="inline-flex items-start gap-2.5">
                    <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full" />
                  </div>

                  <p className="flex-1 mt-[-1.00px] font-base-body-space-mono font-[number:var(--base-body-space-mono-font-weight)] text-white text-[length:var(--base-body-space-mono-font-size)] tracking-[var(--base-body-space-mono-letter-spacing)] leading-[var(--base-body-space-mono-line-height)] [font-style:var(--base-body-space-mono-font-style)]">
                    {nft.artist}
                  </p>
                </div>
              </div>

              <div className="flex self-stretch w-full items-start">
                <div className="flex flex-col items-start gap-2 pl-0 pr-[21px] py-0 flex-1">
                  <p className="self-stretch mt-[-1.00px] font-caption-space-mono font-[number:var(--caption-space-mono-font-weight)] text-[#858584] text-[length:var(--caption-space-mono-font-size)] tracking-[var(--caption-space-mono-letter-spacing)] leading-[var(--caption-space-mono-line-height)] [font-style:var(--caption-space-mono-font-style)]">
                    Price
                  </p>

                  <p className="self-stretch font-base-body-space-mono font-[number:var(--base-body-space-mono-font-weight)] text-white text-[length:var(--base-body-space-mono-font-size)] tracking-[var(--base-body-space-mono-letter-spacing)] leading-[var(--base-body-space-mono-line-height)] [font-style:var(--base-body-space-mono-font-style)]">
                    {nft.price}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-center gap-2 flex-1">
                  <p className="self-stretch mt-[-1.00px] font-caption-space-mono font-[number:var(--caption-space-mono-font-weight)] text-[#858584] text-[length:var(--caption-space-mono-font-size)] text-right tracking-[var(--caption-space-mono-letter-spacing)] leading-[var(--caption-space-mono-line-height)] [font-style:var(--caption-space-mono-font-style)]">
                    Highest Bid
                  </p>

                  <p className="self-stretch font-base-body-space-mono font-[number:var(--base-body-space-mono-font-weight)] text-white text-[length:var(--base-body-space-mono-font-size)] text-right tracking-[var(--base-body-space-mono-letter-spacing)] leading-[var(--base-body-space-mono-line-height)] [font-style:var(--base-body-space-mono-font-style)]">
                    {nft.highestBid}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
