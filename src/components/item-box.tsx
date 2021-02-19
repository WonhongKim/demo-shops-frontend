import React from "react";
import { ShopDetailQuery_shopbyid_shop_items_options } from "../__generated__/ShopDetailQuery";

interface IItemProps {
  id?: number;
  name: string;
  description: string;
  price: number;
  orderStarted?: boolean;
  isSelected?: boolean;
  options?: ShopDetailQuery_shopbyid_shop_items_options[] | null;
  addItemToOrder?: (itemId: number) => void;
  removeFromOrder?: (itemId: number) => void;
}

export const ItemBox: React.FC<IItemProps> = ({
  id = 0,
  name,
  description,
  price,
  orderStarted = false,
  options,
  isSelected,
  addItemToOrder,
  removeFromOrder,
  children: ItemOptions,
}) => {
  const onClick = () => {
    if (orderStarted) {
      if (!isSelected && addItemToOrder) {
        return addItemToOrder(id);
      }
      if (isSelected && removeFromOrder) {
        return removeFromOrder(id);
      }
    }
  };
  console.log(options);

  return (
    <div
      className={` px-8 py-4 border cursor-pointer  transition-all ${
        isSelected ? "border-gray-800" : " hover:border-gray-800"
      }`}
    >
      <div className="mb-5">
        <h3 className="text-lg font-medium flex items-center ">
          {name}
          {orderStarted && (
            <button
              className={`ml-3 py-1 px-3 focus:outline-none text-sm  text-white ${
                isSelected ? "bg-red-500" : " bg-green-600"
              }`}
              onClick={onClick}
            >
              {isSelected ? "Remove" : "Add"}
            </button>
          )}
        </h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>${price}</span>
      {options && options?.length !== 0 && (
        <div>
          <h5 className="mt-8 mb-3 font-medium">Dish Options:</h5>
          <div className="grid gap-2  justify-start">{ItemOptions}</div>
        </div>
      )}
    </div>
  );
};
