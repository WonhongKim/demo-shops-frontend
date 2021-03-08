/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { mallTypeInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: SearchTypeQuery
// ====================================================

export interface SearchTypeQuery_mallType_shops_malltype {
  __typename: "MallType";
  name: string;
}

export interface SearchTypeQuery_mallType_shops {
  __typename: "Shops";
  id: number;
  name: string;
  coverImage: string | null;
  malltype: SearchTypeQuery_mallType_shops_malltype | null;
}

export interface SearchTypeQuery_mallType {
  __typename: "mallTypeOutPut";
  result: boolean;
  error: string | null;
  totalPages: number | null;
  totalResults: number | null;
  shops: SearchTypeQuery_mallType_shops[] | null;
}

export interface SearchTypeQuery {
  mallType: SearchTypeQuery_mallType;
}

export interface SearchTypeQueryVariables {
  input: mallTypeInput;
}
