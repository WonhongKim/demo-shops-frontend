import React from "react";

interface IShopProps {
  id: string;
  coverImage: string;
  name: string;
  mallTypeName?: string;
}

export const Shop: React.FC<IShopProps> = ({
  coverImage,
  name,
  mallTypeName,
}) => (
  <div className="flex flex-col">
    <div
      style={{ backgroundImage: `url(${coverImage})` }}
      className="bg-cover bg-center mb-3 py-28"
    ></div>
    <h3 className="text-xl">{name}</h3>
    <span className="border-t mt-2 py-2 text-xs opacity-50 border-gray-400">
      {mallTypeName}
    </span>
  </div>
);
