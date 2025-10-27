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
import { ethers, Contract, parseEther } from "ethers"
import baseJson from "../../../../contract/abi/BaseNFT.json"
import assetJson from "../../../../contract/abi/TraitNFT.json";
import { baseNftContractAddress, traitNftContractAddress } from "../../../../contract/address";
import { usePushChainClient, usePushChain, usePushWalletContext } from "@pushchain/ui-kit";

type LoadingState = "none" | "mint";

export const MarketplaceSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("avatars");
  const [assetsData, setAssetsData] = useState<any[]>([]);
  const [avatarData, setAvatarData] = useState<any[]>([]);
  const [txHash, setTxHash] = useState<string | null>(null);

  const [loadingState, setLoadingState] = useState<LoadingState>("none");

  const { pushChainClient } = usePushChainClient()
  const { universalAccount } = usePushWalletContext()
  const { PushChain } = usePushChain()

  const fetchAvatarData = async (tableName: string, uri: string): Promise<any[]> => {
    console.log(uri);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")

      if (error) throw error;

      if (data) {
        // Properly await all fetches and get the resulting metadata objects and original uri
        const jsonData = await Promise.all(
          data.map(async (d: any) => {
            const uri = `https://intellectual-emerald-elephant.myfilebase.com/ipfs/${d.cid}`;
            const req = await fetch(uri);
            const metadata = await req.json();
            return { ...metadata, uri }; // include the uri in the returned object
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

  const fetchAssetData = async (tableName: string, uri: string): Promise<any[]> => {
    console.log(uri);
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select("*")

      if (error) throw error;

      if (data) {
        // Properly await all fetches and get the resulting metadata objects and original uri
        const jsonData = await Promise.all(
          data.map(async (d: any) => {
            const uri = `https://intellectual-emerald-elephant.myfilebase.com/ipfs/${d.cid}`;
            const req = await fetch(uri);
            const metadata = await req.json();
            return { ...metadata, uri }; // include the uri in the returned object
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

  const getMintAvatarData = async (abi: any, functionName: string, uri: string) => {
    return PushChain.utils.helpers.encodeTxData({
      abi,
      functionName,
      args: [universalAccount?.address, uri]
    });
  }

  const getMintAssetTxData = async (abi: any, functionName: string, tokenId: string | number, amount: string | number) => {
    return PushChain.utils.helpers.encodeTxData({
      abi,
      functionName,
      args: [tokenId, amount]
    });
  }

  const handleMintAvatar = async (uri: string) => {
    // const baseContract = await contractSetup(baseNftContractAddress, baseJson);
    if (pushChainClient) {
      try {
        setLoadingState("mint");
        const data = await getMintAvatarData(baseJson, "mint", uri);

        const tx = await pushChainClient.universal.sendTransaction({
          to: baseNftContractAddress as `0x${string}`,
          value: parseEther("0.01"),
          data: data,
        });

        setTxHash(tx.hash);
        await tx.wait();
        // await fetchCounters();
        setLoadingState("none");
      } catch (err) {
        console.error('Transaction error:', err);
        setLoadingState("none");
      }
    }
    // if(type == "avatar") console.log(uri);
    // else console.log(uri)
  }

  const handleMintAsset = async (tokenId: string | number) => {
    // const baseContract = await contractSetup(baseNftContractAddress, baseJson);
    if (pushChainClient) {
      try {
        setLoadingState("mint");
        const data = await getMintAssetTxData(assetJson, "mint", tokenId, 1);
        const tx = await pushChainClient.universal.sendTransaction({
          to: traitNftContractAddress,
          value: parseEther("0.01"),
          data: data,
        });

        setTxHash(tx.hash);
        await tx.wait();
        // await fetchCounters();
        setLoadingState("none");
      } catch (err) {
        console.error('Transaction error:', err);
        setLoadingState("none");
      }
    }
    // if(type == "avatar") console.log(uri);
    // else console.log(uri)
  }

  useEffect(() => {
    const fetchAllData = async () => {
      const assets = await fetchAvatarData("assets", "");
      const avatars = await fetchAvatarData("avatars", "");

      console.log(assets)
      console.log(avatars)

      setAssetsData(assets);
      setAvatarData(avatars)
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
                        <NftCard key={index} name={avatar.name} image={avatar.image} onMint={() => handleMintAvatar(avatar.uri)} />
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

                        <NftCard key={index} name={asset.name} image={asset.image} onMint={() => handleMintAsset(asset.uri)} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            {/* 
            <TabsContent value="mint">
              <div className="flex flex-col items-center pt-10 pb-20 w-full gap-8">
                <div className="w-full max-w-5xl text-white px-2">
                  <div className="flex mb-12 flex-col gap-6">
                    <h2 className="text-3xl font-semibold">Avatars</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {avatarData?.map((avatar, index) => (
                        <NftCard key={index} name={avatar.name} image={avatar.image}  />
                      ))}
                    </div>
                  </div>


                  <div className="flex mb-12 flex-col gap-6">
                    <h2 className="text-3xl font-semibold">Assets</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                      {assetsData?.map((asset, index) => (

                        <NftCard type="asset" key={index} name={asset.name} image={asset.image} uri={asset.uri}  />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent> */}
          </Tabs>
        </div>
      </div>
    </section>
  );
};
