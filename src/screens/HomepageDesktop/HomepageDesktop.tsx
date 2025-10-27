import { BrowseCategoriesSubsection } from "./sections/BrowseCategoriesSubsection";
import { DiscoverMoreNftsSubsection } from "./sections/DiscoverMoreNftsSubsection";
import { FooterSubsection } from "../../components/FooterSubsection/FooterSubsection";
import { HeroSectionSubsection } from "./sections/HeroSectionSubsection";
import { HowItWorksSubsection } from "./sections/HowItWorksSubsection";
import { NavigationSubsection } from "../../components/NavigationSubsection/NavigationSubsection";
import { NftHighlightSubsection } from "./sections/NftHighlightSubsection";
import { SubscribeWidgetSubsection } from "./sections/SubscribeWidgetSubsection";
import { TopRatedArtistsSubsection } from "./sections/TopRatedArtistsSubsection";
import { TrendingCollectionSubsection } from "./sections/TrendingCollectionSubsection";

export const HomepageDesktop = (): JSX.Element => {
  return (
    <main className="flex flex-col w-full bg-[#2b2b2b]">
      <NavigationSubsection />
      <HeroSectionSubsection />
      <TrendingCollectionSubsection />
      <TopRatedArtistsSubsection />
      <BrowseCategoriesSubsection />
      <DiscoverMoreNftsSubsection />
      <NftHighlightSubsection />
      <HowItWorksSubsection />
      <SubscribeWidgetSubsection />
      <FooterSubsection />
    </main>
  );
};
