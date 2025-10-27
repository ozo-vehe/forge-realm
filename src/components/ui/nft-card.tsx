import React from "react";

type NftCardProps = {
  image: string;
  name: string;
  price?: string | number;
  className?: string;
};

const PRICE = 0.01

export const NftCard: React.FC<NftCardProps> = ({
  image,
  name,
  price = PRICE,
  className = "",
}) => (
  <div
    className={`group relative bg-gradient-to-br from-[#232526] to-[#414345] rounded-2xl overflow-hidden shadow-md hover:scale-105 transition-transform cursor-pointer flex flex-col items-center p-6 ${className}`}
  >
    <div className="w-full flex justify-center">
      <img
        src={image}
        alt={name}
        className="w-32 h-32 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
      />
    </div>
    <p className="mt-5 font-semibold text-lg text-white text-center">
      {name}
    </p>
    {price !== undefined && price !== null && price !== "" && (
      <div className="mt-2 flex items-center gap-2">
        <span className="font-medium text-base text-gray-300">Price:</span>
        <span className="font-bold text-base text-white">
          {typeof price === "number" ? price.toFixed(2) : price}
        </span>
      </div>
    )}
    <div className="mt-2 w-10 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-70 mx-auto" />
  </div>
);

export default NftCard;