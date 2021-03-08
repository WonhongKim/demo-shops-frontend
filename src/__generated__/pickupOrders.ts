/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: pickupOrders
// ====================================================

export interface pickupOrders_pickupOrders_driver {
  __typename: "User";
  email: string;
}

export interface pickupOrders_pickupOrders_customer {
  __typename: "User";
  email: string;
}

export interface pickupOrders_pickupOrders_shop {
  __typename: "Shops";
  name: string;
}

export interface pickupOrders_pickupOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: pickupOrders_pickupOrders_driver | null;
  customer: pickupOrders_pickupOrders_customer | null;
  shop: pickupOrders_pickupOrders_shop | null;
}

export interface pickupOrders {
  pickupOrders: pickupOrders_pickupOrders;
}
