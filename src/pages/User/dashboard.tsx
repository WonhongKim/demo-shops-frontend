import React from "react";
import { Link, useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { authTokenVar } from "../../apollo";
import { LOCALSTORAGE_TOKEN } from "../../constants";
import { Helmet } from "react-helmet-async";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../../hooks/useMe";
import { myShops } from "../../__generated__/myShops";
import { MyShop } from "../../components/my-shop";

export const MY_SHOPS_QUERY = gql`
  query myShops {
    myShops {
      result
      error
      myShops {
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

export const Dashboard = () => {
  const { data: userData } = useMe();
  const { data: myShopsData } = useQuery<myShops>(MY_SHOPS_QUERY);

  const history = useHistory();
  if (authTokenVar() === null) {
    history.push("/login");
  }
  const deletStorage = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    window.location.reload();
  };

  return (
    <div className="bg-gray-50">
      <Helmet>
        <title> Dash Board | Demo Shop</title>
      </Helmet>
      <div className="max-w-screen-2xl mx-auto py-12 h-screen sm:px-4 px-6">
        <h2 className="text-2xl mb-10">Dash board</h2>
        <div className="flex flex-col items-center xl:flex-row justify-between xl:items-start">
          <div className="w-full">
            <div className="bg-white shadow-md rounded-md p-5 max-w-screen-sm w-full">
              <div className="flex flex-col items-center md:flex-row">
                <div className="w-40">
                  <span className="text-9xl text-gray-400">
                    <FontAwesomeIcon icon={faUserCircle} />
                  </span>
                </div>
                <div className="w-full ml-0 py-4 md:ml-10">
                  <div className="mb-2 md:mb-4">
                    <span className="text-md text-gray-400">User Name</span>
                    <h3 className="text-2xl">{userData?.me.name}</h3>
                  </div>
                  <div className="mb-2 md:mb-4">
                    <span className="text-md text-gray-400"> User Email</span>
                    <h3 className="text-2xl">{userData?.me.email}</h3>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-center w-full">
                <Link to="/dashboard">
                  <span className="inline-flex w-full px-4 py-2 border border-gray-300 font-medium rounded-md hover:text-gray-600">
                    Edit Profile
                  </span>
                </Link>
                <button className="ml-4" onClick={deletStorage}>
                  <span className="inline-flex w-full px-4 py-2 border border-gray-300 font-medium rounded-md hover:text-gray-600">
                    Log out
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="w-full mt-6 xl:mt-0">
            <div className="bg-white shadow-md rounded-md p-5 max-w-screen-sm w-full">
              <div className="">
                <div>
                  <span className="text-2xl">Last Order</span>
                </div>
                <div className="">
                  <span> Last Order</span>
                  <span> Will be Here</span>
                  <span> For View</span>
                </div>
              </div>
              <div className="mt-6 flex justify-center">
                <Link to="/dashboard">
                  <span className="inline-flex w-full px-4 py-2 border border-gray-300 font-medium rounded-md hover:text-gray-600">
                    View more orders
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {userData?.me.role === "Owner" && (
          <div className="max-w-screen-2xl mx-auto mt-32">
            <h2 className="text-4xl font-medium mb-10">My Shops</h2>
            <Link to="/createShop">
              <span className="inline-flex w-40 px-4 py-2 border border-gray-300 font-medium rounded-md hover:text-gray-600">
                Create New Shop
              </span>
            </Link>
            {myShopsData?.myShops.result &&
              myShopsData.myShops.myShops?.length === 0 && (
                <>
                  <h4 className="text-xl mb-5">You have no Shop.</h4>
                  <Link
                    className="text-green-600 hover:underline"
                    to="/createShop"
                  >
                    Create one &rarr;
                  </Link>
                </>
              )}
            <div className="grid mt-20 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-10">
              {myShopsData?.myShops.myShops?.map((Shops) => (
                <MyShop
                  key={Shops.id}
                  id={Shops.id + ""}
                  name={Shops.name}
                  coverImage={Shops.coverImage + ""}
                  mallTypeName={Shops.malltype?.name}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
