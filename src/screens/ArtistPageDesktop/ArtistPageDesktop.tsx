import { ArtistDetailsSection } from "./sections/ArtistDetailsSection";
import { MainContentSection } from "./sections/MainContentSection";
import { NavigationSubsection } from "../../components/NavigationSubsection";
import { FooterSubsection } from "../../components/FooterSubsection";

export const ArtistPageDesktop = (): JSX.Element => {
  return (
    <div className="flex flex-col items-start relative bg-[#2b2b2b] w-full border">
      <NavigationSubsection />
      <ArtistDetailsSection />
      <MainContentSection />
      <FooterSubsection />
    </div>
  );
};