import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  ShopDetailQuery,
  ShopDetailQueryVariables,
} from "../../__generated__/ShopDetailQuery";
import { Helmet } from "react-helmet-async";

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
      }
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
    </div>
  );
};
