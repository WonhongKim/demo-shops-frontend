import React from "react";
import { Link } from "react-router-dom";

interface IMyShopProps {
  id: string;
  coverImage: string;
  name: string;
  mallTypeName?: string;
}

export const MyShop: React.FC<IMyShopProps> = ({
  id,
  coverImage,
  name,
  mallTypeName,
}) => (
  <Link to={`/myShop/${id}`}>
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
  </Link>
);
