import React from "react";

interface IDishOptionProps {
  isSelected: boolean;
  name: string;
  extra?: number | null;
  itemId: number;
  addOptionToItem: (itemId: number, optionName: string) => void;
  removeOptionFromItem: (itemId: number, optionName: string) => void;
}

export const ItemOptions: React.FC<IDishOptionProps> = ({
  isSelected,
  name,
  extra,
  addOptionToItem,
  removeOptionFromItem,
  itemId,
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionFromItem(itemId, name);
    } else {
      addOptionToItem(itemId, name);
    }
  };

  console.log(name, extra);

  return (
    <span
      onClick={onClick}
      className={`border px-2 py-1 ${
        isSelected ? "bg-green-600 text-white" : "hover:border-gray-800 "
      }`}
    >
      <span className="mr-2">{name}</span>
      {<span className="text-sm opacity-75">(${extra})</span>}
    </span>
  );
};
