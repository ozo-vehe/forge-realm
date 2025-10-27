import { SearchIcon } from "lucide-react";
import { Input } from "../../../../components/ui/input";

export const HeaderSection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center gap-10 px-0 py-20 w-full bg-app-background">
      <div className="flex flex-col w-full max-w-[1050px] items-start gap-[30px] px-4">
        <div className="inline-flex flex-col items-start gap-2.5 w-full">
          <h1 className="w-full font-h2-work-sans font-[number:var(--h2-work-sans-font-weight)] text-white text-[length:var(--h2-work-sans-font-size)] tracking-[var(--h2-work-sans-letter-spacing)] leading-[var(--h2-work-sans-line-height)] [font-style:var(--h2-work-sans-font-style)]">
            Browse Marketplace
          </h1>

          <p className="w-full [font-family:'Work_Sans',Helvetica] font-normal text-white text-[22px] tracking-[0] leading-[35.2px]">
            Browse through more than 50k NFTs on the NFT Marketplace.
          </p>
        </div>

        <div className="flex w-full items-center justify-center gap-2.5 px-5 py-3 rounded-[20px] border border-solid border-[#3b3b3b]">
          <Input
            className="flex-1 border-0 bg-transparent h-auto p-0 font-base-body-work-sans font-[number:var(--base-body-work-sans-font-weight)] text-caption-label-text text-[length:var(--base-body-work-sans-font-size)] tracking-[var(--base-body-work-sans-letter-spacing)] leading-[var(--base-body-work-sans-line-height)] [font-style:var(--base-body-work-sans-font-style)] focus-visible:ring-0 focus-visible:ring-offset-0"
            placeholder="SearchIcon your favourite NFTs"
          />

          <SearchIcon className="w-6 h-6 text-caption-label-text flex-shrink-0" />
        </div>
      </div>
    </section>
  );
};
