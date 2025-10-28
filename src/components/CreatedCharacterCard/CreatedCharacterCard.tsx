interface Metadata {
  animation_url: string;
  attributes: Array<Record<string, any>>;
  background_color: string;
  description: string;
  external_url: string;
  image: string;
  name: string;
  uri: string;
  tokenId: string | number;
  youtube_url: string;
};

interface CharacterCardProps {
  avatar: Metadata
  armor: Metadata | null
  shield: Metadata | null
  weapon: Metadata | null
}

export const CreatedCharacterCard = ({avatar, armor, shield, weapon}: CharacterCardProps) => {
  return (
    <div className="w-[120px] h-[120px] relative ml-2">
      <img
        src={avatar.image}
        alt="Selected Avatar"
        className="w-full h-full rounded-full mb-2 relative z-30"
      />
      {/* Armor */}
      {armor && <img
        src={armor.image}
        alt="Selected Armor"
        className="absolute -top-[15%] left-[44%] -rotate-[5deg] -translate-x-[50%] w-[35%] h-[35%] z-10"
      />}
      {/* Shield */}
      {shield && <img
        src={shield.image}
        alt="Selected Shield"
        className="absolute bottom-[0%] left-[42%] -translate-x-[50%] w-[65%] h-[65%] z-30 "
      />}
      {/* Weapon */}
      {weapon && <img
        src={weapon.image}
        alt="Selected Weapon"
        className="absolute bottom-[15%] -right-[25%] w-[60%] h-[60%] z-30"
      />}
    </div>
  )
}