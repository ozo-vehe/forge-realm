import { Avatar, AvatarImage } from "../../../../components/ui/avatar";
import { Card, CardContent } from "../../../../components/ui/card";

const nftData = [
  {
    id: 1,
    title: "Distant Galaxy",
    image: "/image-placeholder-1.png",
    avatar: "/avatar-placeholder-9.png",
    artist: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 2,
    title: "Life On Edena",
    image: "/image-placeholder-2.png",
    avatar: "/avatar-placeholder-9.png",
    artist: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 3,
    title: "Astrofiction",
    image: "/image-placeholder-3.png",
    avatar: "/avatar-placeholder-9.png",
    artist: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 4,
    title: "Cryptocity",
    image: "/image-placeholder-4.png",
    avatar: "/avatar-placeholder-9.png",
    artist: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 5,
    title: "Colorfuldog 0524",
    image: "/image-placeholder-5.png",
    avatar: "/avatar-placeholder-9.png",
    artist: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 6,
    title: "Space Tales",
    image: "/image-placeholder-6.png",
    avatar: "/avatar-placeholder-9.png",
    artist: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 7,
    title: "Cherry Blossom Girl 037",
    image: "/image-placeholder-7.png",
    avatar: "/avatar-placeholder-9.png",
    artist: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 8,
    title: "Dancing Robots 0987",
    image: "/image-placeholder-8.png",
    avatar: "/avatar-placeholder-9.png",
    artist: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
  {
    id: 9,
    title: "Icecream Ape",
    image: "/image-placeholder-9.png",
    avatar: "/avatar-placeholder-9.png",
    artist: "Animakid",
    price: "1.63 ETH",
    highestBid: "0.33 wETH",
  },
];

export const NftGallerySection = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center px-0 py-20 w-full bg-background-secondary gap-[30px]">
      <div className="w-full max-w-[1050px] grid grid-cols-3 gap-[30px]">
        {nftData.map((nft) => (
          <Card
            key={nft.id}
            className="flex flex-col min-w-[260px] items-center bg-app-background rounded-[20px] transition-all duration-[0.3s] ease-[ease] border-0 overflow-hidden hover:shadow-lg cursor-pointer"
          >
            <div className="flex flex-col items-start gap-2.5 w-full rounded-[20px_20px_0px_0px]">
              <img
                className="w-full h-[295px] rounded-[20px_20px_0px_0px] object-cover"
                alt={nft.title}
                src={nft.image}
              />
            </div>

            <CardContent className="flex flex-col items-start gap-[25px] pt-5 pb-[25px] px-[30px] w-full">
              <div className="flex flex-col items-start gap-[5px] w-full">
                <h3 className="w-full mt-[-1.00px] font-h5-work-sans font-[number:var(--h5-work-sans-font-weight)] text-white text-[length:var(--h5-work-sans-font-size)] tracking-[var(--h5-work-sans-letter-spacing)] leading-[var(--h5-work-sans-line-height)] [font-style:var(--h5-work-sans-font-style)]">
                  {nft.title}
                </h3>

                <div className="flex items-start gap-3 w-full">
                  <Avatar className="w-6 h-6">
                    <AvatarImage
                      src={nft.avatar}
                      alt={nft.artist}
                      className="rounded-[120px] object-cover"
                    />
                  </Avatar>

                  <p className="flex-1 mt-[-1.00px] font-base-body-space-mono font-[number:var(--base-body-space-mono-font-weight)] text-white text-[length:var(--base-body-space-mono-font-size)] tracking-[var(--base-body-space-mono-letter-spacing)] leading-[var(--base-body-space-mono-line-height)] [font-style:var(--base-body-space-mono-font-style)]">
                    {nft.artist}
                  </p>
                </div>
              </div>

              <div className="flex items-start w-full">
                <div className="flex flex-col items-start gap-2 pl-0 pr-[21px] py-0 flex-1">
                  <p className="w-full mt-[-1.00px] font-caption-space-mono font-[number:var(--caption-space-mono-font-weight)] text-[#858584] text-[length:var(--caption-space-mono-font-size)] tracking-[var(--caption-space-mono-letter-spacing)] leading-[var(--caption-space-mono-line-height)] [font-style:var(--caption-space-mono-font-style)]">
                    Price
                  </p>

                  <p className="w-full font-base-body-space-mono font-[number:var(--base-body-space-mono-font-weight)] text-white text-[length:var(--base-body-space-mono-font-size)] tracking-[var(--base-body-space-mono-letter-spacing)] leading-[var(--base-body-space-mono-line-height)] [font-style:var(--base-body-space-mono-font-style)]">
                    {nft.price}
                  </p>
                </div>

                <div className="flex flex-col items-end justify-center gap-2 flex-1">
                  <p className="w-full mt-[-1.00px] font-caption-space-mono font-[number:var(--caption-space-mono-font-weight)] text-[#858584] text-[length:var(--caption-space-mono-font-size)] text-right tracking-[var(--caption-space-mono-letter-spacing)] leading-[var(--caption-space-mono-line-height)] [font-style:var(--caption-space-mono-font-style)]">
                    Highest Bid
                  </p>

                  <p className="w-full font-base-body-space-mono font-[number:var(--base-body-space-mono-font-weight)] text-white text-[length:var(--base-body-space-mono-font-size)] text-right tracking-[var(--base-body-space-mono-letter-spacing)] leading-[var(--base-body-space-mono-line-height)] [font-style:var(--base-body-space-mono-font-style)]">
                    {nft.highestBid}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
