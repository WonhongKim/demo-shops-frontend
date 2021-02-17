/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum Role {
  Admin = "Admin",
  Customer = "Customer",
  Owner = "Owner",
  Staff = "Staff",
}

export interface CreateItemInput {
  name: string;
  price: number;
  photourl: string;
  description: string;
  options?: ItemOptionType[] | null;
  shopId: number;
}

export interface CreateShopsInPut {
  name: string;
  address: string;
  phoneNumber: string;
  coverImage?: string | null;
  mallTypeName: string;
}

export interface ItemOptionType {
  name: string;
  choices?: OptionsInputType[] | null;
  extra?: number | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface MyShopInPut {
  id: number;
}

export interface OptionsInputType {
  name: string;
  extra?: number | null;
}

export interface ShopInput {
  shopId: number;
}

export interface ShopsInput {
  page?: number | null;
}

export interface mallTypeInput {
  page?: number | null;
  slug: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
