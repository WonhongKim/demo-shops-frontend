import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import {
  MyShopMainQuery,
  MyShopMainQueryVariables,
} from "../../__generated__/MyShopMainQuery";
import { Helmet } from "react-helmet-async";

export const MY_SHOP_MAIN_QUERY = gql`
  query MyShopMainQuery($input: MyShopInPut!) {
    myShop(input: $input) {
      result
      error
      myShop {
        id
        name
        address
        phoneNumber
        coverImage
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

interface IMyShopParams {
  id: string;
}

export const MyShopMain = () => {
  const { id } = useParams<IMyShopParams>();
  const { data, loading } = useQuery<MyShopMainQuery, MyShopMainQueryVariables>(
    MY_SHOP_MAIN_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
    }
  );

  return (
    <div>
      <Helmet>
        <title>{data?.myShop.myShop?.name || ""} | Demo Shop</title>
      </Helmet>
      <div
        className=" bg-center bg-cover py-20"
        style={{
          backgroundImage: `url(${data?.myShop.myShop?.coverImage})`,
        }}
      >
        <div className="bg-transparent w-3/12 py-8 pl-20 text-white">
          <h4 className="text-4xl font-bold mb-3">
            {data?.myShop.myShop?.name}
          </h4>
          <h5 className="text-lg font-semibold mb-2">
            ● {data?.myShop.myShop?.address} ●{data?.myShop.myShop?.phoneNumber}
          </h5>
        </div>
      </div>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <h4 className="text-3xl font-bold mb-3">Items</h4>
          <div className="mt-6 flex w-full">
            <Link to={`/myShop/${id}/addItem`}>
              <span className="inline-flex w-full px-4 py-2 border border-gray-300 font-medium rounded-md hover:text-gray-600">
                Add New Item
              </span>
            </Link>
          </div>
          {data?.myShop.myShop?.items.length === 0 ? (
            <h4 className="text-xl my-4">
              No Items, Please add new item for sell
            </h4>
          ) : null}
        </div>
      )}
    </div>
  );
};