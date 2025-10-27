import { useEffect, useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Separator } from "../../../../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";
import { supabase } from "../../../../lib/supabase";
import NftCard from "../../../../components/ui/nft-card";
import { ethers } from "ethers"
import baseJson from "../../../../contract/abi/BaseNFT.json"
import { baseNftContractAddress } from "../../../../contract/address";

export const MarketplaceSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("avatars");
  const [assetsData, setAssetsData] = useState<any[]>([]);
  const [avatarData, setAvatarData] = useState<any[]>([]);

  const fetchData = async (tableName: string, uri: string): Promise<any[]> => {
    console.log(uri);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")

      if (error) throw error;

      if (data) {
        // Properly await all fetches and get the resulting metadata objects
        const jsonData = await Promise.all(
          data.map(async (d: any) => {
            const req = await fetch(`https://intellectual-emerald-elephant.myfilebase.com/ipfs/${d.cid}`);
            return req.json();
          })
        );

        return jsonData;
      }
      return []
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const interactWithSC = async () => {
    try {
      const provider = new ethers.JsonRpcProvider("https://evm.rpc-testnet-donut-node1.push.org/")
      const contract = new ethers.Contract(baseNftContractAddress, baseJson, provider);

      console.log(contract);
      const id = contract._nextId
      if(id) {
        for (let i = 1; i < Number(id); i++){
          const uri = await contract.tokenURI(i)
          console.log(uri)
        }
      }
      const tokenURI = await contract.tokenURI(0);
      console.log(tokenURI);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error)
      console.log(message)
    }
  }

  useEffect(() => {
    const fetchAllData = async () => {
      const assets = await fetchData("assets", "");
      const avatars = await fetchData("avatars", "");

      setAssetsData(assets);
      setAvatarData(avatars)
      await interactWithSC();
    }

    fetchAllData();
  }, [])

  return (
    <section className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center gap-2.5 w-full">
        <Separator className="w-full h-px bg-[#858584]" />
        <div className="flex w-full max-w-5xl items-start justify-center px-2 sm:px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex p-0">
              {/* Minted Avatars Available for Sale */}
              <TabsTrigger
                value="avatars"
                className={`flex-1 flex items-center justify-center gap-2 h-14 text-white ${activeTab === "avatars" ? "border-b-4 border-gray-500" : "border-b-4 border-[#2b2b2b]"
                  }`}
              >
                <span className="font-h5-work-sans text-white">
                  Avatars
                </span>
                <Badge className="px-2 bg-[#858584] rounded-full">
                  <span className="text-white font-base-body-space-mono">{avatarData.length}</span>
                </Badge>
              </TabsTrigger>

              {/* Minted Assets Available for Sale */}
              <TabsTrigger
                value="assets"
                className={`flex-1 flex items-center justify-center gap-2 h-14 ${activeTab === "assets" ? "border-b-4 border-gray-500" : "border-b-4 border-[#2b2b2b]"
                  }`}
              >
                <span className="font-h5-work-sans text-white">
                  Assets
                </span>
                <Badge className="px-2 bg-background-secondary rounded-full">
                  <span className="text-white font-base-body-space-mono">{assetsData.length}</span>
                </Badge>
              </TabsTrigger>

              {/* Avatar and Assets Available for Minting */}
              <TabsTrigger
                value="mint"
                className={`flex-1 flex items-center justify-center gap-2 h-14 ${activeTab === "mint" ? "border-b-4 border-gray-500" : "border-b-4 border-[#2b2b2b]"
                  }`}
              >
                <span className="font-h5-work-sans text-white">
                  Mint
                </span>
                <Badge className="px-2 bg-background-secondary rounded-full">
                  <span className="text-white font-base-body-space-mono">{avatarData.length + assetsData.length}</span>
                </Badge>
              </TabsTrigger>
            </TabsList>


            <TabsContent value="avatars">
              <div className="flex flex-col items-center pt-10 pb-20 w-full gap-8">
                <div className="w-full max-w-5xl text-white px-2">
                  <div className="flex flex-col gap-10">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {avatarData?.map((avatar, index) => (
                        <NftCard key={index} name={avatar.name} image={avatar.image} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="assets">
              <div className="flex flex-col items-center pt-10 pb-20 w-full gap-8">
                <div className="w-full max-w-5xl text-white px-2">
                  <div className="flex flex-col gap-10">
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {assetsData?.map((asset, index) => (

                        <NftCard key={index} name={asset.name} image={asset.image} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mint">
              <div className="flex flex-col items-center pt-10 pb-20 w-full gap-8">
                <div className="w-full max-w-5xl text-white px-2">
                  <div className="flex mb-12 flex-col gap-6">
                    <h2 className="text-3xl font-semibold">Avatars</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {avatarData?.map((avatar, index) => (
                        <NftCard key={index} name={avatar.name} image={avatar.image} />
                      ))}
                    </div>
                  </div>


                  <div className="flex mb-12 flex-col gap-6">
                    <h2 className="text-3xl font-semibold">Assets</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {assetsData?.map((asset, index) => (

                        <NftCard key={index} name={asset.name} image={asset.image} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};
