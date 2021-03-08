import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { gql, useMutation, useSubscription } from "@apollo/client";
import { pickupOrders } from "../../__generated__/pickupOrders";
import { takeOrder, takeOrderVariables } from "../../__generated__/takeOrder";
import { Link, useHistory } from "react-router-dom";

const PICKUP_ORDERS_SUBSCRIPTION = gql`
  subscription pickupOrders {
    pickupOrders {
      id
      status
      total
      driver {
        email
      }
      customer {
        email
      }
      shop {
        name
      }
    }
  }
`;

const TAKE_ORDER_MUTATION = gql`
  mutation takeOrder($input: TakeOrderInput!) {
    takeOrder(input: $input) {
      result
      error
    }
  }
`;

export const StaffDashboard = () => {
  const history = useHistory();
  const onCompleted = (data: takeOrder) => {
    const pageID = subscriptionData?.pickupOrders.id;
    if (data.takeOrder.result) {
      history.push(`/orders/${pageID}`);
    }
  };
  const { data: subscriptionData } = useSubscription<pickupOrders>(
    PICKUP_ORDERS_SUBSCRIPTION
  );

  const [takeOrderMutation] = useMutation<takeOrder, takeOrderVariables>(
    TAKE_ORDER_MUTATION,
    {
      onCompleted,
    }
  );

  const triggerMutation = (orderId: number) => {
    takeOrderMutation({
      variables: {
        input: {
          id: orderId,
        },
      },
    });
  };

  return (
    <div>
      <div className=" max-w-screen-sm mx-auto bg-white shadow-lg py-8 px-5">
        {subscriptionData?.pickupOrders.shop ? (
          <>
            <h1 className="text-center  text-3xl font-medium">
              New Coocked Order
            </h1>
            <h1 className="text-center my-3 text-2xl font-medium">
              Pick it up soon @ {subscriptionData?.pickupOrders.shop?.name}
            </h1>
            <button
              onClick={() => triggerMutation(subscriptionData?.pickupOrders.id)}
              className="btn w-full  block  text-center mt-5"
            >
              Accept Challenge &rarr;
            </button>
          </>
        ) : (
          <h1 className="text-center  text-3xl font-medium">
            No orders yet...
          </h1>
        )}
      </div>
    </div>
  );
};
