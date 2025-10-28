import { useState, useEffect } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { usePushWalletContext } from "@pushchain/ui-kit";
import { ethers } from "ethers";
import baseJson from "../../../../contract/abi/BaseNFT.json";
import assetJson from "../../../../contract/abi/TraitNFT.json";
import { baseNftContractAddress, traitNftContractAddress } from "../../../../contract/address";
import NftCard from "../../../../components/ui/nft-card";
import { getCreatedCharacter, saveUserAvatar, saveUserCharacter, supabase } from "../../../../lib/supabase";
import { CreateNewCharacterModal } from "../CreateNewCharacterSection";
import { v4 } from "uuid"
import { CreatedCharacterCard } from "../../../../components/CreatedCharacterCard";

interface CreatedCharacter {
  id: string;
  created_at: string;
  avatar: Metadata;
  armor: Metadata;
  shield: Metadata;
  weapon: Metadata | null;
}

interface Metadata {
  animation_url: string;
  attributes: Array<Record<string, any>>;
  background_color: string;
  description: string;
  external_url: string;
  image: string;
  name: string;
  tokenId: string
  uri: string;
  youtube_url: string;
};

export const MainContentSection = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState("created")
  const [created, setCreated] = useState<CreatedCharacter[] | null>(null);
  const [assets, setAssets] = useState<Metadata[]>([]);
  const [avatars, setAvatars] = useState<Metadata[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
      const uriArr: string[] = []
      for (let i = 1; i <= Number(id); i++) {
        const owner = await contract.ownerOf(i);
        console.log(owner)
        if (owner !== universalAccount?.address) continue;
        const uri = await contract.tokenURI(i);
        const req = await fetch(uri)
        const res = await req.json();

        const data = { ...res, uri };
        uriArr.push(uri);
        avatarsArr.push(data);
      }

      await saveUserAvatar(universalAccount?.address as string, uriArr)
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

      const id = await contract.nextTypeId();
      console.log(id);
      const assetsArr: Metadata[] = [];
      for (let i = 1; i <= Number(id); i++) {
        if (i === 2) continue
        const hasMinted = await contract.hasMintedType(i, universalAccount?.address)
        if (hasMinted) {
          const uri = await contract.uri(i);
          const req = await fetch(uri)
          const res = await req.json();

          const data = { ...res, uri };
          assetsArr.push(data);
        }
      }
      setAssets(assetsArr);
    } catch (err) {
      console.error('Error fetching counter values:', err as Error);
    }
  }

  const handleCreateNftCharacter = async (avatar: Metadata, assets: Metadata[]) => {
    setIsLoading(true);
    const armor = assets.find((asset: Metadata) => asset.attributes[0].value.toLowerCase() === "armor")
    const weapon = assets.find((asset: Metadata) => asset.attributes[0].value.toLowerCase() === "weapon")
    const shield = assets.find((asset: Metadata) => asset.attributes[0].value.toLowerCase() === "shield")
    console.log(armor);
    console.log(weapon);
    console.log(shield);

    const { data, error } = await supabase
      .from("characters")
      .insert([{
        id: v4(),
        avatar,
        armor: armor ? armor : null,
        weapon: weapon ? weapon : null,
        shield: shield ? shield : null
      }])
      .select();

    if (error) throw error
    if (data) {
      const characterId = data[0].id
      await saveUserCharacter(universalAccount?.address as `0x${string}`, characterId)
    }
    setIsLoading(false);
  }



  useEffect(() => {
    const fetchAllData = async () => {
      if (universalAccount) {
        fetchUserAvatars()
        fetchUserAssets()
        const createdCharacters = await getCreatedCharacter(universalAccount.address)
        setCreated(createdCharacters as CreatedCharacter[])
      }
    }
    fetchAllData();
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
                <span className="text-white font-base-body-space-mono">{created?.length}</span>
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
            <div className="flex justify-start mt-8">
              <CreateNewCharacterModal onCreate={(avatar, assets) => handleCreateNftCharacter(avatar, assets)} assets={assets} avatars={new Array(...new Set(avatars))} isLoading={isLoading} />
            </div>
            <div className="flex flex-col items-center pt-10 pb-20 w-full gap-8">
              <div
                className="
                    w-full
                    max-w-5xl
                    grid 
                    gap-6
                    grid-cols-1
                    sm:grid-cols-3
                    md:grid-cols-3
                  "
              >
                {created?.map((nft: CreatedCharacter, index) => (
                  <div key={index} className="group relative bg-gradient-to-br from-[#232526] to-[#414345] rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer flex flex-col items-center justify-center p-6 h-[230px]">
                  <CreatedCharacterCard avatar={nft.avatar} armor={nft.armor} shield={nft.shield} weapon={nft.weapon} />

                  <span className="text-white">{nft.avatar.name}</span>
                  </div>
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
