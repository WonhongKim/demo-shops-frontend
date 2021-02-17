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

export interface ShopDetailQuery_shopbyid_shop {
  __typename: "Shops";
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  coverImage: string | null;
  malltype: ShopDetailQuery_shopbyid_shop_malltype | null;
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
