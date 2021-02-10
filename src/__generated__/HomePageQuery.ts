/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ShopsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: HomePageQuery
// ====================================================

export interface HomePageQuery_allMallTypes_mallTypes {
  __typename: "MallType";
  id: number;
  name: string;
  coverImage: string | null;
  slug: string;
  restaurantCount: number;
}

export interface HomePageQuery_allMallTypes {
  __typename: "AllMallTypeOutPut";
  result: boolean;
  error: string | null;
  mallTypes: HomePageQuery_allMallTypes_mallTypes[] | null;
}

export interface HomePageQuery_allShops_ShopList_malltype {
  __typename: "MallType";
  name: string;
}

export interface HomePageQuery_allShops_ShopList {
  __typename: "Shops";
  id: number;
  name: string;
  coverImage: string | null;
  malltype: HomePageQuery_allShops_ShopList_malltype | null;
  address: string;
}

export interface HomePageQuery_allShops {
  __typename: "ShopsOutput";
  result: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  ShopList: HomePageQuery_allShops_ShopList[] | null;
}

export interface HomePageQuery {
  allMallTypes: HomePageQuery_allMallTypes;
  allShops: HomePageQuery_allShops;
}

export interface HomePageQueryVariables {
  input: ShopsInput;
}
