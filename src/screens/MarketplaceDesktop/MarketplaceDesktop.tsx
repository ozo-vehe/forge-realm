
import { FooterSubsection } from "../../components/FooterSubsection";
import { NavigationSubsection } from "../../components/NavigationSubsection";
import { HeaderSection } from "./sections/HeaderSection";
import { MarketplaceSection } from "./sections/MarketplaceSection";

export const MarketplaceDesktop = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full bg-[#2b2b2b]">
      <NavigationSubsection />
      <HeaderSection />
      <MarketplaceSection />
      <FooterSubsection />
    </div>
  );
};
