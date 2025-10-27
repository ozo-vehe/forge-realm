import { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs";
import { Card, CardContent } from "../../../../components/ui/card";
import { Avatar, AvatarImage } from "../../../../components/ui/avatar";

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
  const [created, setCreated] = useState<NftItem []>([]);
  const [assets, setAssets] = useState([]);
  const [avatars, setAvatars] = useState([]);

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
                <span className="text-white font-base-body-space-mono">302</span>
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
                <span className="text-white font-base-body-space-mono">67</span>
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
                <span className="text-white font-base-body-space-mono">67</span>
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="created">
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
                <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                  Asset Collections
                </h2>
                <div className="flex flex-col gap-10">
                  {[
                    {
                      category: "Helmets",
                      assets: [
                        {
                          img: "/assets/helmet1.png",
                          alt: "Helmet 1",
                          name: "Viking Helmet",
                        },
                        {
                          img: "/assets/helmet2.png",
                          alt: "Helmet 2",
                          name: "Samurai Kabuto",
                        },
                        {
                          img: "/assets/helmet3.png",
                          alt: "Helmet 3",
                          name: "Space Explorer",
                        },
                      ],
                    },
                    {
                      category: "Shields",
                      assets: [
                        {
                          img: "/assets/shield1.png",
                          alt: "Shield 1",
                          name: "Knight Shield",
                        },
                        {
                          img: "/assets/shield2.png",
                          alt: "Shield 2",
                          name: "Dragon Aegis",
                        },
                        {
                          img: "/assets/shield3.png",
                          alt: "Shield 3",
                          name: "Futuristic Barrier",
                        },
                      ],
                    },
                    {
                      category: "Weapons",
                      assets: [
                        {
                          img: "/assets/weapon1.png",
                          alt: "Weapon 1",
                          name: "Excalibur Sword",
                        },
                        {
                          img: "/assets/weapon2.png",
                          alt: "Weapon 2",
                          name: "Blaster Rifle",
                        },
                        {
                          img: "/assets/weapon3.png",
                          alt: "Weapon 3",
                          name: "Crystal Staff",
                        },
                      ],
                    },
                  ].map(({ category, assets }) => (
                    <div key={category}>
                      <h3 className="text-lg md:text-xl font-semibold mb-4">{category}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {assets.map(asset => (
                          <div
                            key={asset.name}
                            className="bg-background-secondary rounded-xl p-4 flex flex-col items-center shadow hover:shadow-lg transition"
                          >
                            <img
                              src={asset.img}
                              alt={asset.alt}
                              className="w-full max-w-[160px] aspect-square object-cover rounded-lg"
                            />
                            <p className="mt-3 font-medium">{asset.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="avatars">
            <div className="flex flex-col items-center pt-10 pb-20 w-full gap-8">
              <div className="w-full max-w-5xl text-white px-2">
                <div className="flex flex-col gap-10">
                  {[
                    {
                      category: "Helmets",
                      assets: [
                        {
                          img: "/assets/helmet1.png",
                          alt: "Helmet 1",
                          name: "Viking Helmet",
                        },
                        {
                          img: "/assets/helmet2.png",
                          alt: "Helmet 2",
                          name: "Samurai Kabuto",
                        },
                        {
                          img: "/assets/helmet3.png",
                          alt: "Helmet 3",
                          name: "Space Explorer",
                        },
                      ],
                    },
                    {
                      category: "Shields",
                      assets: [
                        {
                          img: "/assets/shield1.png",
                          alt: "Shield 1",
                          name: "Knight Shield",
                        },
                        {
                          img: "/assets/shield2.png",
                          alt: "Shield 2",
                          name: "Dragon Aegis",
                        },
                        {
                          img: "/assets/shield3.png",
                          alt: "Shield 3",
                          name: "Futuristic Barrier",
                        },
                      ],
                    },
                    {
                      category: "Weapons",
                      assets: [
                        {
                          img: "/assets/weapon1.png",
                          alt: "Weapon 1",
                          name: "Excalibur Sword",
                        },
                        {
                          img: "/assets/weapon2.png",
                          alt: "Weapon 2",
                          name: "Blaster Rifle",
                        },
                        {
                          img: "/assets/weapon3.png",
                          alt: "Weapon 3",
                          name: "Crystal Staff",
                        },
                      ],
                    },
                  ].map(({ category, assets }) => (
                    <div key={category}>
                      <h3 className="text-lg md:text-xl font-semibold mb-4">{category}</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {assets.map(asset => (
                          <div
                            key={asset.name}
                            className="bg-background-secondary rounded-xl p-4 flex flex-col items-center shadow hover:shadow-lg transition"
                          >
                            <img
                              src={asset.img}
                              alt={asset.alt}
                              className="w-full max-w-[160px] aspect-square object-cover rounded-lg"
                            />
                            <p className="mt-3 font-medium">{asset.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
