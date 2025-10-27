import { NavLink } from "react-router-dom";
import { MenuIcon, Wallet } from "lucide-react"
import { usePushWalletContext, PushUniversalAccountButton } from "@pushchain/ui-kit";

const navigationItems = [
  { label: "Marketplace", url: "/marketplace" },
  { label: "Rankings", url: "/" },
];

export const NavigationSubsection = (): JSX.Element => {
  const { universalAccount } = usePushWalletContext()

  return (
    <nav className="flex items-center justify-between px-5 sm:px-8 lg:px-[50px] py-5 w-full bg-app-background max-w-[1440px] mx-auto">
      <div className="inline-flex items-center gap-2.5">
        <NavLink to="/" className="relative w-[180px] sm:w-[220px] lg:w-[243.41px] h-8">
          <img
            className="absolute top-0 left-0 w-8 h-8"
            alt="Storefront"
            src="/storefront.svg"
          />
          <img
            className="absolute top-[9px] left-11 w-[140px] sm:w-[175px] lg:w-[199px] h-5"
            alt="Nft marketplace"
            src="/nft-marketplace.svg"
          />
        </NavLink>
      </div>

      <div className="inline-flex items-center justify-end gap-1 sm:gap-2 lg:gap-2.5">
        {navigationItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.url}
            className="h-[46px] px-2 sm:px-3 lg:px-5 py-0 rounded-[20px] transition-all duration-[0.3s] ease-[ease] hover:bg-background-secondary hidden md:inline-flex items-center"
          >
            <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] text-sm lg:text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
              {item.label}
            </span>
          </NavLink>
        ))}
        {universalAccount ? (
          <PushUniversalAccountButton />
        ) : (
          <NavLink to="/connect-wallet" className="h-[50px] sm:h-[60px] px-4 sm:px-6 lg:px-[30px] bg-call-to-action rounded-[20px] transition-all duration-[0.3s] ease-[ease] hover:bg-call-to-action/90 items-center lg:flex md:flex hidden relative text-white">
            <Wallet className="w-5 h-5 mr-2 sm:mr-3" />
            Connect Wallet
          </NavLink>
        )}

        {/* Mobile */}
        <MenuIcon className="lg:hidden md:hidden flex text-white" />
      </div>
    </nav>
  );
};
