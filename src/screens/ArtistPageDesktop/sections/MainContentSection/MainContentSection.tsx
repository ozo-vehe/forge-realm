import { useState, useEffect } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { Card, CardContent } from "../../../../components/ui/card";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { usePushWalletContext } from "@pushchain/ui-kit";
import { ethers } from "ethers";
import baseJson from "../../../../contract/abi/BaseNFT.json";
import assetJson from "../../../../contract/abi/TraitNFT.json";
import { baseNftContractAddress, traitNftContractAddress } from "../../../../contract/address";
import NftCard from "../../../../components/ui/nft-card";
import { Button } from "../../../../components/ui/button";

type NftItem = {
  id: number;
  title: string;
  image: string;
  avatar: string;
  artist: string;
  price: string;
  highestBid: string;
  creator: string;
};


interface Metadata {
  animation_url: string;
  attributes: Array<Record<string, any>>;
  background_color: string;
  description: string;
  external_url: string;
  image: string;
  name: string;
  uri: string;
  youtube_url: string;
};
// const tabs = [
//   {
//     label: "Created",
//     count: "302",
//     isActive: true,
//   },
//   {
//     label: "Owned",
//     count: "67",
//     isActive: false,
//   },
//   {
//     label: "Collection",
//     count: "4",
//     isActive: false,
//   },
// ];

export const MainContentSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("created")
  const [created, setCreated] = useState<NftItem[]>([]);
  const [assets, setAssets] = useState<Metadata[]>([]);
  const [avatars, setAvatars] = useState<Metadata[]>([]);

  const { universalAccount } = usePushWalletContext()

  // To avoid duplicates, fetch all avatars first and then update state once
  const fetchUserAvatars = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(
        'https://evm.rpc-testnet-donut-node1.push.org/'
      );
      const contract = new ethers.Contract(baseNftContractAddress, baseJson, provider);

      const id = await contract.nextId();
      const avatarsArr: Metadata[] = [];
      for (let i = 1; i <= Number(id); i++) {
        const uri = await contract.tokenURI(i);
        const req = await fetch(uri)
        const res = await req.json();

        const data = { ...res, uri };
        console.log(data);
        avatarsArr.push(data);
      }
      setAvatars(avatarsArr);
    } catch (err) {
      console.error('Error fetching counter values:', err as Error);
    }
  }

  const fetchUserAssets = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(
        'https://evm.rpc-testnet-donut-node1.push.org/'
      );
      const contract = new ethers.Contract(traitNftContractAddress, assetJson, provider);

      const id = contract._nextTypeId;
      console.log(id);
      const assetsArr: Metadata[] = [];
      for (let i = 1; i <= Number(id); i++) {
        const uri = await contract.uri(i);
        const req = await fetch(uri)
        const res = await req.json();

        const data = { ...res, uri };
        console.log(data);
        assetsArr.push(data);
      }
      setAssets(assetsArr);
    } catch (err) {
      console.error('Error fetching counter values:', err as Error);
    }
  }

  useEffect(() => {
    fetchUserAvatars()
    fetchUserAssets()
  }, [universalAccount])

  return (
    <section className="flex flex-col items-center gap-2.5 w-full bg-app-background">
      <img className="w-full h-px object-cover" alt="Line" src="/line-2.svg" />
      {/* 
      <div className="flex w-[1050px] items-start">
        <div className="flex items-start flex-1">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`flex h-[60px] items-center justify-center gap-4 px-[30px] py-0 flex-1 ${
                tab.isActive
                  ? "border-b-2 [border-bottom-style:solid] border-[#858584]"
                  : ""
              }`}
            >
              <div
                className={`w-fit font-h5-work-sans font-[number:var(--h5-work-sans-font-weight)] text-[length:var(--h5-work-sans-font-size)] text-center tracking-[var(--h5-work-sans-letter-spacing)] leading-[var(--h5-work-sans-line-height)] whitespace-nowrap [font-style:var(--h5-work-sans-font-style)] ${
                  tab.isActive ? "text-white" : "text-caption-label-text"
                }`}
              >
                {tab.label}
              </div>

              <Badge
                className={`inline-flex items-center gap-2.5 px-2.5 py-[5px] rounded-[20px] ${
                  tab.isActive ? "bg-[#858584]" : "bg-background-secondary"
                }`}
              >
                <span className="w-fit mt-[-1.00px] font-base-body-space-mono font-[number:var(--base-body-space-mono-font-weight)] text-[#ffffff] text-[length:var(--base-body-space-mono-font-size)] tracking-[var(--base-body-space-mono-letter-spacing)] leading-[var(--base-body-space-mono-line-height)] whitespace-nowrap [font-style:var(--base-body-space-mono-font-style)]">
                  {tab.count}
                </span>
              </Badge>
            </div>
          ))}
        </div>
      </div> */}

      <div className="flex w-full max-w-5xl items-start justify-center px-2 sm:px-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex p-0">
            <TabsTrigger
              value="created"
              className={`flex-1 flex items-center justify-center gap-2 h-14 text-white ${activeTab === "created" ? "border-b-4 border-gray-500" : "border-b-4 border-[#2b2b2b]"
                }`}
            >
              <span className="font-h5-work-sans text-white">
                Created
              </span>
              <Badge className="px-2 bg-[#858584] rounded-full">
                <span className="text-white font-base-body-space-mono">{created.length}</span>
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="avatars"
              className={`flex-1 flex items-center justify-center gap-2 h-14 ${activeTab === "avatars" ? "border-b-4 border-gray-500" : "border-b-4 border-[#2b2b2b]"
                }`}
            >
              <span className="font-h5-work-sans text-white">
                Avatars
              </span>
              <Badge className="px-2 bg-background-secondary rounded-full">
                <span className="text-white font-base-body-space-mono">{avatars.length}</span>
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="assets"
              className={`flex-1 flex items-center justify-center gap-2 h-14 ${activeTab === "assets" ? "border-b-4 border-gray-500" : "border-b-4 border-[#2b2b2b]"
                }`}
            >
              <span className="font-h5-work-sans text-white">
                Assets
              </span>
              <Badge className="px-2 bg-background-secondary rounded-full">
                <span className="text-white font-base-body-space-mono">{assets.length}</span>
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="created">
            <div className="flex justify-end mb-6">
              <Button className="h-auto items-center justify-center gap-3 px-[25px] py-[12px] rounded-[12px] border-2 border-solid border-[#a259ff] transition-all duration-[0.3s] ease-[ease] bg-transparent hover:bg-[#a259ff]/10">
              <span className="[font-family:'Work_Sans',Helvetica] font-semibold text-[#ffffff] text-base text-center tracking-[0] leading-[22.4px] whitespace-nowrap">
                Create New Character
              </span>
            </Button>
            </div>
            <div className="flex flex-col items-center pt-10 pb-20 w-full gap-8">
              <div
                className="
                    w-full 
                    max-w-5xl
                    grid 
                    gap-6
                    grid-cols-1
                    sm:grid-cols-2
                    md:grid-cols-3
                  "
              >
                {created.map((nft) => (
                  <Card
                    key={nft.id}
                    className="flex flex-col h-full items-center shadow rounded-2xl transition-shadow hover:shadow-lg border-gray-800 overflow-hidden cursor-pointer"
                  >
                    <img
                      className="w-full h-72 sm:h-60 md:h-52 object-cover rounded-t-2xl"
                      alt={nft.title}
                      src={nft.image}
                    />
                    <CardContent className="flex flex-col gap-5 pt-5 pb-6 px-4 w-full">
                      <div className="flex flex-col gap-2 w-full">
                        <h3 className="font-h5-work-sans text-white">
                          {nft.title}
                        </h3>
                        <div className="flex items-center gap-2 w-full">
                          <Avatar className="w-6 h-6">
                            <AvatarImage
                              src={nft.avatar}
                              alt={nft.creator}
                              className="rounded-full object-cover"
                            />
                          </Avatar>
                          <span className="text-white font-base-body-space-mono">
                            {nft.creator}
                          </span>
                        </div>
                      </div>
                      <div className="flex w-full gap-2">
                        <div className="flex flex-col flex-1">
                          <span className="text-[#858584] text-xs">Price</span>
                          <span className="text-white font-base-body-space-mono">{nft.price}</span>
                        </div>
                        <div className="flex flex-col flex-1 items-end">
                          <span className="text-[#858584] text-xs text-right">
                            Highest Bid
                          </span>
                          <span className="text-white font-base-body-space-mono text-right">
                            {nft.highestBid}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="assets">
            <div className="flex flex-col items-center pt-10 pb-20 w-full gap-8">
              <div className="w-full max-w-5xl text-white px-2">
                <div className="flex flex-col gap-10">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {assets?.map((asset, index) => (
                      <NftCard key={index} name={asset.name} image={asset.image} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="avatars">
            <div className="flex flex-col items-center pt-10 pb-20 w-full gap-8">
              <div className="w-full max-w-5xl text-white px-2">
                <div className="flex flex-col gap-10">
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {avatars?.map((avatar, index) => (
                      <NftCard key={index} name={avatar.name} image={avatar.image} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
