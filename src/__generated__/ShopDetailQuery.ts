/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShopInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: ShopDetailQuery
// ====================================================

export interface ShopDetailQuery_shopbyid_shop_malltype {
  __typename: "MallType";
  name: string;
}

export interface ShopDetailQuery_shopbyid_shop_items_options_choices {
  __typename: "ItemOptionsSubItem";
  name: string;
  extra: number | null;
}

export interface ShopDetailQuery_shopbyid_shop_items_options {
  __typename: "ItemOption";
  name: string;
  extra: number | null;
  choices: ShopDetailQuery_shopbyid_shop_items_options_choices[] | null;
}

export interface ShopDetailQuery_shopbyid_shop_items {
  __typename: "Item";
  id: number;
  name: string;
  price: number;
  photourl: string;
  description: string;
  options: ShopDetailQuery_shopbyid_shop_items_options[] | null;
}

export interface ShopDetailQuery_shopbyid_shop {
  __typename: "Shops";
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  coverImage: string | null;
  malltype: ShopDetailQuery_shopbyid_shop_malltype | null;
  items: ShopDetailQuery_shopbyid_shop_items[];
}

export interface ShopDetailQuery_shopbyid {
  __typename: "ShopOutput";
  result: boolean;
  error: string | null;
  shop: ShopDetailQuery_shopbyid_shop | null;
}

export interface ShopDetailQuery {
  shopbyid: ShopDetailQuery_shopbyid;
}

export interface ShopDetailQueryVariables {
  input: ShopInput;
}
