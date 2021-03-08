import React, { useState } from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import {
  ShopDetailQuery,
  ShopDetailQueryVariables,
} from "../../__generated__/ShopDetailQuery";
import { Helmet } from "react-helmet-async";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";
import {
  createOrder,
  createOrderVariables,
} from "../../__generated__/createOrder";
import { ItemBox } from "../../components/item-box";
import { ItemOptions } from "../../components/item-options";

const SHOP_DETAIL_QUERY = gql`
  query ShopDetailQuery($input: ShopInput!) {
    shopbyid(input: $input) {
      result
      error
      shop {
        id
        name
        address
        phoneNumber
        coverImage
        malltype {
          name
        }
        items {
          id
          name
          price
          photourl
          description
          options {
            name
            extra
            choices {
              name
              extra
            }
          }
        }
      }
    }
  }
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      result
      error
      orderId
    }
  }
`;

interface IShopParams {
  id: string;
}

export const ShopDetail = () => {
  const params = useParams<IShopParams>();
  const { data } = useQuery<ShopDetailQuery, ShopDetailQueryVariables>(
    SHOP_DETAIL_QUERY,
    {
      variables: {
        input: {
          shopId: +params.id,
        },
      },
    }
  );

  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => {
    setOrderStarted(true);
  };

  const getItem = (itemId: number) => {
    return orderItems.find((order) => order.itemId === itemId);
  };
  const isSelected = (itemId: number) => {
    return Boolean(getItem(itemId));
  };
  const addItemToOrder = (itemId: number) => {
    if (isSelected(itemId)) {
      return;
    }
    setOrderItems((current) => [{ itemId, options: [] }, ...current]);
  };
  const removeFromOrder = (itemId: number) => {
    setOrderItems((current) =>
      current.filter((item) => item.itemId !== itemId)
    );
  };
  const addOptionToItem = (itemId: number, optionName: string) => {
    if (!isSelected(itemId)) {
      return;
    }
    const oldItem = getItem(itemId);
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find((aOption) => aOption.name === optionName)
      );
      if (!hasOption) {
        removeFromOrder(itemId);
        setOrderItems((current) => [
          { itemId, options: [{ name: optionName }, ...oldItem.options!] },
          ...current,
        ]);
      }
    }
  };
  const removeOptionFromItem = (itemId: number, optionName: string) => {
    if (!isSelected(itemId)) {
      return;
    }
    const oldItem = getItem(itemId);
    if (oldItem) {
      removeFromOrder(itemId);
      setOrderItems((current) => [
        {
          itemId,
          options: oldItem.options?.filter(
            (option) => option.name !== optionName
          ),
        },
        ...current,
      ]);
      return;
    }
  };
  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string
  ) => {
    return item.options?.find((option) => option.name === optionName);
  };

  const isOptionSelected = (itemId: number, optionName: string) => {
    const item = getItem(itemId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
    return false;
  };
  const triggerCancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };
  const history = useHistory();
  const onCompleted = (data: createOrder) => {
    const {
      createOrder: { result, orderId },
    } = data;
    if (data.createOrder.result) {
      history.push(`/orders/${orderId}`);
    }
  };
  const [createOrderMutation, { loading: placingOrder }] = useMutation<
    createOrder,
    createOrderVariables
  >(CREATE_ORDER_MUTATION, {
    onCompleted,
  });
  const triggerConfirmOrder = () => {
    if (placingOrder) {
      return;
    }
    if (orderItems.length === 0) {
      alert("Can't place empty order");
      return;
    }
    const ok = window.confirm("Do you want to place an order?");
    if (ok) {
      createOrderMutation({
        variables: {
          input: {
            shopId: +params.id,
            items: orderItems,
          },
        },
      });
    }
  };

  return (
    <div>
      <Helmet>
        <title>{data?.shopbyid.shop?.name || ""} | DemoShop</title>
      </Helmet>
      <div
        className=" bg-center bg-cover py-20"
        style={{
          backgroundImage: `url(${data?.shopbyid.shop?.coverImage})`,
        }}
      >
        <div className="bg-transparent w-3/12 py-8 pl-20 text-white">
          <h4 className="text-4xl font-bold mb-3">
            {data?.shopbyid.shop?.name}
          </h4>

          <h5 className="text-lg font-semibold mb-2">
            ● {data?.shopbyid.shop?.malltype?.name} ●
            {data?.shopbyid.shop?.address}
          </h5>
        </div>
      </div>

      <div className="container pb-32 flex flex-col items-end mt-20">
        {!orderStarted && (
          <button onClick={triggerStartOrder} className="btn px-10">
            Start Order
          </button>
        )}
        {orderStarted && (
          <div className="flex items-center">
            <button onClick={triggerConfirmOrder} className="btn px-10 mr-3">
              Confirm Order
            </button>
            <button
              onClick={triggerCancelOrder}
              className="btn px-10 bg-black hover:bg-black"
            >
              Cancel Order
            </button>
          </div>
        )}
        {data?.shopbyid.shop?.items.length === 0 ? (
          <h4 className="text-xl my-4">
            No Items, Please add new item for sell
          </h4>
        ) : (
          <div className="w-full grid mt-20 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-10">
            {data?.shopbyid.shop?.items.map((item) => (
              <ItemBox
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                description={item.description}
                isSelected={isSelected(item.id)}
                orderStarted={orderStarted}
                addItemToOrder={addItemToOrder}
                removeFromOrder={removeFromOrder}
                options={item.options}
              >
                {item.options?.map((option, index) => (
                  <ItemOptions
                    key={index}
                    itemId={item.id}
                    isSelected={isOptionSelected(item.id, option.name)}
                    name={option.name}
                    extra={option.extra}
                    addOptionToItem={addOptionToItem}
                    removeOptionFromItem={removeOptionFromItem}
                  />
                ))}
              </ItemBox>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
