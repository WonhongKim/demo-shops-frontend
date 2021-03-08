/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: pendingOrders
// ====================================================

export interface pendingOrders_pendingOrders_driver {
  __typename: "User";
  email: string;
}

export interface pendingOrders_pendingOrders_customer {
  __typename: "User";
  email: string;
}

export interface pendingOrders_pendingOrders_shop {
  __typename: "Shops";
  name: string;
}

export interface pendingOrders_pendingOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  driver: pendingOrders_pendingOrders_driver | null;
  customer: pendingOrders_pendingOrders_customer | null;
  shop: pendingOrders_pendingOrders_shop | null;
}

export interface pendingOrders {
  pendingOrders: pendingOrders_pendingOrders;
}
