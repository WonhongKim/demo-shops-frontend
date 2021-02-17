/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myShops
// ====================================================

export interface myShops_myShops_myShops_malltype {
  __typename: "MallType";
  name: string;
}

export interface myShops_myShops_myShops {
  __typename: "Shops";
  id: number;
  name: string;
  address: string;
  phoneNumber: string;
  coverImage: string | null;
  malltype: myShops_myShops_myShops_malltype | null;
}

export interface myShops_myShops {
  __typename: "MyShopsOutPut";
  result: boolean;
  error: string | null;
  myShops: myShops_myShops_myShops[] | null;
}

export interface myShops {
  myShops: myShops_myShops;
}
