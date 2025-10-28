import { NavLink } from "react-router-dom";
import { MenuIcon, Wallet } from "lucide-react"
import { usePushWalletContext } from "@pushchain/ui-kit";
import { useState } from "react";

const navigationItems = [
  { label: "Marketplace", url: "/marketplace" },
  { label: "Rankings", url: "/" },
];

export const NavigationSubsection = (): JSX.Element => {
  const { universalAccount } = usePushWalletContext()
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="flex items-center justify-between px-5 sm:px-8 lg:px-[50px] py-5 w-full bg-app-background max-w-[1440px] mx-auto">
      <div className="inline-flex items-center gap-2.5">
        <NavLink to="/" className="relative w-fit flex gap-3 items-center sm:w-[220px] lg:w-[243.41px] h-8">
          <img
            className="w-7 h-7 object-contain"
            alt="Storefront"
            src="/logo-t.png"
          />
          <span className="block text-2xl text-gray-100 font-h4-space-mono font-semibold">Forge Realm</span>
          {/* <img
            className="absolute top-[9px] left-11 w-[140px] sm:w-[175px] lg:w-[199px] h-5"
            alt="Nft marketplace"
            src="/nft-marketplace.svg"
          /> */}
        </NavLink>
      </div>

      <div className="lg:inline-flex md:inline-flex hidden items-center justify-end gap-1 sm:gap-2 lg:gap-2.5">
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
          <NavLink to="/profile" className="h-auto flex items-center justify-center gap-3 px-[25px] py-[12px] rounded-[30px] transition-all duration-[0.3s] ease-[ease] bg-transparent hover:bg-[#a259ff]/10">
            <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
              Profile
            </span>
          </NavLink>
        ) : (
          <NavLink to="/connect-wallet" className="h-[50px] sm:h-[60px] px-4 sm:px-6 lg:px-[30px] bg-call-to-action rounded-[20px] transition-all duration-[0.3s] ease-[ease] hover:bg-call-to-action/90 items-center lg:flex md:flex hidden relative text-white">
            <Wallet className="w-5 h-5 mr-2 sm:mr-3" />
            Connect Wallet
          </NavLink>
        )}
      </div>

      {/* Mobile */}
      <div className="">
        <MenuIcon onClick={() => setShowMenu(!showMenu)} className="lg:hidden md:hidden flex text-white" />
        {showMenu && <div className="flex flex-col p-4 lg:hidden md:hidden items-center justify-end gap-2 absolute top-16 left-0 bg-black w-full">
          {navigationItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.url}
              className="my-2"
            >
              <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] lg:text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
                {item.label}
              </span>
            </NavLink>
          ))}
          {universalAccount ? (
            <NavLink to="/profile" className="h-auto flex items-center justify-center gap-3 px-[25px] py-[12px] rounded-[30px] transition-all duration-[0.3s] ease-[ease] bg-transparent hover:bg-[#a259ff]/10">
              <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
                Profile
              </span>
            </NavLink>
          ) : (
            <NavLink to="/connect-wallet" className="h-[50px] sm:h-[60px] px-4 sm:px-6 lg:px-[30px] bg-call-to-action rounded-[20px] transition-all duration-[0.3s] ease-[ease] hover:bg-call-to-action/90 items-center lg:flex md:flex hidden relative text-white">
              <Wallet className="w-5 h-5 mr-2 sm:mr-3" />
              Connect Wallet
            </NavLink>
          )}
        </div>}
      </div>
    </nav>
  );
};
