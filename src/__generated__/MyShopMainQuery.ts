/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyShopInPut } from "./globalTypes";

// ====================================================
// GraphQL query operation: MyShopMainQuery
// ====================================================

export interface MyShopMainQuery_myShop_myShop_items_options_choices {
  __typename: "ItemOptionsSubItem";
  name: string;
  extra: number | null;
}

export interface MyShopMainQuery_myShop_myShop_items_options {
  __typename: "ItemOption";
  name: string;
  extra: number | null;
  choices: MyShopMainQuery_myShop_myShop_items_options_choices[] | null;
}

export interface MyShopMainQuery_myShop_myShop_items {
  __typename: "Item";
  id: number;
  name: string;
  price: number;
  photourl: string;
  description: string;
  options: MyShopMainQuery_myShop_myShop_items_options[] | null;
}

export interface MyShopMainQuery_myShop_myShop {
  __typename: "Shops";
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  coverImage: string | null;
  items: MyShopMainQuery_myShop_myShop_items[];
}

export interface MyShopMainQuery_myShop {
  __typename: "MyShopOutPut";
  result: boolean;
  error: string | null;
  myShop: MyShopMainQuery_myShop_myShop | null;
}

export interface MyShopMainQuery {
  myShop: MyShopMainQuery_myShop;
}

export interface MyShopMainQueryVariables {
  input: MyShopInPut;
}
