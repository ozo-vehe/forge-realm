import { NavigationSubsection } from "../../components/NavigationSubsection";
import { FooterSubsection } from "../../components/FooterSubsection";
import { useNavigate } from "react-router-dom";
import { PushUniversalAccountButton, usePushWalletContext } from "@pushchain/ui-kit";
import { useEffect } from "react";
import { supabase } from "../../lib/supabase";
import { Button } from "../../components/ui/button";


export const ConnectWallet = (): JSX.Element => {
  const { universalAccount } = usePushWalletContext();
  const navigate = useNavigate();

  const fetchUser = async (address: string) => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("address", address)

      if (error) throw error
      else if (data && data.length < 1) {
        const { error } = await supabase
          .from("users")
          .insert([{ "address": address }])

        if(error) throw error
      }

      navigate("/profile")
      console.log(error)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (universalAccount) {
      console.log(universalAccount)
      fetchUser(universalAccount.address)
    }
  }, [universalAccount])
  return (
    <div className="flex flex-col items-start bg-app-background">
      <NavigationSubsection />
      <main className="flex flex-wrap flex-col-reverse md:flex-row justify-center items-center md:items-stretch gap-8 md:gap-[60px] w-full bg-app-background px-4 sm:px-8 lg:px-0 py-16">
        <section className="flex flex-col items-center gap-8 sm:gap-10 px-0 py-10 sm:py-16 md:py-[100px] flex-1 w-full md:max-w-[460px]">
          <div className="flex flex-col w-full items-start gap-8 sm:gap-10">
            <div className="flex flex-col items-start gap-3 sm:gap-5 w-full">
              <div className="flex items-start gap-2.5 w-full">
                <h1 className="flex items-center justify-center flex-1 font-h2-work-sans font-[number:var(--h2-work-sans-font-weight)] text-white text-[28px] sm:text-[32px] md:text-[length:var(--h2-work-sans-font-size)] tracking-[var(--h2-work-sans-letter-spacing)] leading-[var(--h2-work-sans-line-height)] [font-style:var(--h2-work-sans-font-style)]">
                  Connect Wallet
                </h1>
              </div>

              <div className="flex flex-col text-center gap-2 w-full">
                <p className="[font-family:'Work_Sans',Helvetica] font-normal text-white text-base sm:text-lg md:text-[22px] tracking-[0] leading-7 md:leading-[35.2px]">
                  Choose a wallet you want to connect. There are several wallet
                  providers.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full max-w-xs items-start gap-4 sm:gap-5">
            <Button className="w-[186px] h-auto items-center justify-center gap-3 px-[50px] py-[19px] bg-call-to-action rounded-[20px] transition-all duration-[0.3s] ease-[ease] hover:bg-call-to-action/90 relative text-lg">
              <span className="absolute w-full opacity-0">
                <PushUniversalAccountButton connectButtonText="Connect Wallet" />
              </span>
              Connect Wallet
            </Button>
          </div>
        </section>
        <img
          className="lg:max-w-[550px] md:max-w-[500px] w-full rounded-[32px] shadow-xl"
          alt="Image placeholder"
          src="/image-placeholder.png"
        />
      </main>
      <FooterSubsection />
    </div>
  );
};
