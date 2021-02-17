/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateShopsInPut } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createShopMutation
// ====================================================

export interface createShopMutation_createShop {
  __typename: "CreateShopsOutPut";
  result: boolean;
  error: string | null;
}

export interface createShopMutation {
  createShop: createShopMutation_createShop;
}

export interface createShopMutationVariables {
  createShopsInPut: CreateShopsInPut;
}
