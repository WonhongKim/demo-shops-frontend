import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import {
  SearchTypeQuery,
  SearchTypeQueryVariables,
} from "../__generated__/SearchTypeQuery";
import { useParams } from "react-router-dom";
import { Shop } from "../components/shop";

const SEARCH_TYPE_QUERY = gql`
  query SearchTypeQuery($input: mallTypeInput!) {
    mallType(input: $input) {
      result
      error
      totalPages
      totalResults
      shops {
        id
        name
        coverImage
        malltype {
          name
        }
      }
    }
  }
`;

interface ISearchTypeParams {
  slug: string;
}

export const SearchType = () => {
  const params = useParams<ISearchTypeParams>();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<
    SearchTypeQuery,
    SearchTypeQueryVariables
  >(SEARCH_TYPE_QUERY, {
    variables: {
      input: {
        page,
        slug: params.slug,
      },
    },
  });
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  return (
    <div>
      <div className="bg-gray-800 w-full py-40 ">
        <div className="flex flex-col items-center text-white">
          <span className="text-2xl my-2">"{params.slug}"</span>
          <span>{data?.mallType.shops?.length} Shops are found</span>
        </div>
      </div>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="grid mt-20 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-10">
            {data?.mallType.shops?.map((Shops) => (
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
              Page {page} of {data?.mallType.totalPages}
            </span>
            {page !== data?.mallType.totalPages ? (
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
