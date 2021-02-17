import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  HomePageQuery,
  HomePageQueryVariables,
} from "../__generated__/HomePageQuery";
import { Shop } from "../components/shop";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const HOME_SHOPS_QUERY = gql`
  query HomePageQuery($input: ShopsInput!) {
    allMallTypes {
      result
      error
      mallTypes {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
    allShops(input: $input) {
      result
      error
      totalPages
      totalResults
      ShopList {
        id
        name
        coverImage
        malltype {
          name
        }
        address
      }
    }
  }
`;

export const Home = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<HomePageQuery, HomePageQueryVariables>(
    HOME_SHOPS_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    }
  );
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  return (
    <div>
      <Helmet>
        <title>HOME | DemoShop</title>
      </Helmet>
      <div className="bg-gray-800 w-full py-40">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-x-5">
            <div className="flex flex-col items-center text-white">
              <span className="text-xl"> Welcome to Demoshop</span>
              <span className="border-t mt-1 py-1 text-xs ">
                enjoy your shopping at Demoshop
              </span>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around max-w-sm mx-auto ">
            {data?.allMallTypes.mallTypes?.map((malltype) => (
              <Link key={malltype.id} to={`/searchType/${malltype.slug}`}>
                <div className="flex flex-col items-center cursor-pointer">
                  <div
                    key={malltype.id}
                    className=" w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full"
                    style={{ backgroundImage: `url(${malltype.coverImage})` }}
                  ></div>
                  <span className="mt-1 text-sm text-center font-medium">
                    {malltype.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="grid mt-20 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-10">
            {data?.allShops.ShopList?.map((Shops) => (
              <Shop
                key={Shops.id}
                id={Shops.id + ""}
                name={Shops.name}
                mallTypeName={Shops.malltype?.name}
                coverImage={Shops.coverImage + ""}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-md items-center mx-auto my-10">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span>
              Page {page} of {data?.allShops.totalPages}
            </span>
            {page !== data?.allShops.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="focus:outline-none font-medium text-2xl"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
