import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { MY_SHOPS_QUERY } from "../User/dashboard";
import { MY_SHOP_MAIN_QUERY } from "../Shop/my-shop-main";
import {
  createItem,
  createItemVariables,
} from "../../__generated__/createItem";
import { useForm } from "react-hook-form";
import { Helmet } from "react-helmet-async";
import { Button } from "../../components/button";
import { FormError } from "../../components/form-error";

const CREATE_ITEM_MUTATION = gql`
  mutation createItem($input: CreateItemInput!) {
    createItem(input: $input) {
      result
      error
    }
  }
`;

interface IParams {
  id: string;
}

interface IForm {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

export const AddItem = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const [createItem, { loading, data }] = useMutation<
    createItem,
    createItemVariables
  >(CREATE_ITEM_MUTATION, {
    refetchQueries: [
      {
        query: MY_SHOP_MAIN_QUERY,
        variables: {
          input: {
            id: +id,
          },
        },
      },
    ],
  });
  const {
    register,
    handleSubmit,
    formState,
    getValues,
    setValue,
  } = useForm<IForm>({
    mode: "onChange",
  });
  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();
    const optionObjects = optionsNumber.map((theId) => ({
      name: rest[`${theId}-optionName`],
      extra: +rest[`${theId}-optionExtra`],
    }));
    createItem({
      variables: {
        input: {
          name,
          price: +price,
          description,
          shopId: +id,
          options: optionObjects,
          photourl: "",
        },
      },
    });
    history.goBack();
  };
  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const onAddOptionClick = () => {
    setOptionsNumber((current) => [Date.now(), ...current]);
  };
  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current.filter((id) => id !== idToDelete));
    setValue(`${idToDelete}-optionName`, "");
    setValue(`${idToDelete}-optionExtra`, "");
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Item | Demo Shop </title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center justify-center">
        <h3 className="font-semibold text-2xl mb-3">Create New Item</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <input
            className="input"
            type="text"
            name="name"
            placeholder="name"
            ref={register({ required: "name is required." })}
          />
          <input
            className="input"
            type="number"
            name="price"
            min={0}
            placeholder="price"
            ref={register({ required: "price is required." })}
          />
          <input
            className="input"
            type="text"
            name="description"
            placeholder="description"
            ref={register({ required: "description is required." })}
          />

          <div className="my-10 w-full">
            <span
              onClick={onAddOptionClick}
              className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5"
            >
              Add Item Option
            </span>
            {optionsNumber.length !== 0 &&
              optionsNumber.map((id) => (
                <div key={id} className="mt-5">
                  <input
                    ref={register}
                    name={`${id}-optionName`}
                    className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
                    type="text"
                    placeholder="Option Name"
                  />
                  <input
                    ref={register}
                    name={`${id}-optionExtra`}
                    className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
                    type="number"
                    min={0}
                    placeholder="Option Extra"
                  />
                  <span
                    className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 bg-"
                    onClick={() => onDeleteClick(id)}
                  >
                    Delete Option
                  </span>
                </div>
              ))}
          </div>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Add Item"}
          />
          {data?.createItem.error && (
            <FormError errorMessage={data?.createItem.error} />
          )}
        </form>
      </div>
    </div>
  );
};
