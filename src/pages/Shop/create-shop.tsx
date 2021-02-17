import React from "react";
import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import {
  createShopMutation,
  createShopMutationVariables,
} from "../../__generated__/createShopMutation";
import { FormError } from "../../components/form-error";
import { Button } from "../../components/button";
import { useHistory } from "react-router-dom";

export const CREATE_SHOP_MUTATION = gql`
  mutation createShopMutation($createShopsInPut: CreateShopsInPut!) {
    createShop(input: $createShopsInPut) {
      result
      error
    }
  }
`;

interface ICreateShopForm {
  name: string;
  address: string;
  phoneNumber: string;
  coverImage: string;
  mallTypeName: string;
}

export const CreateShop = () => {
  const history = useHistory();
  const tempImageUrl =
    "https://www.jobs.ca/content/uploads/2018/03/How-to-Transform-a-Temporary-Assignment-into-a-Permanent-job.jpg";
  const MallTypesOptions = [
    { value: "food", label: "Food" },
    { value: "pet", label: "Pet" },
    { value: "health", label: "Health" },
    { value: "sport", label: "Sport" },
    { value: "clothe", label: "Clothe" },
    { value: "digital", label: "Digital" },
    { value: "retail", label: "Retail" },
    { value: "book", label: "Book" },
  ];
  const onCompleted = (data: createShopMutation) => {
    const {
      createShop: { result },
    } = data;
    if (result) {
      history.push("/dashboard");
    }
  };
  const {
    register,
    getValues,
    handleSubmit,
    formState,
  } = useForm<ICreateShopForm>({
    mode: "onChange",
  });

  const [createShopMutation, { data, loading }] = useMutation<
    createShopMutation,
    createShopMutationVariables
  >(CREATE_SHOP_MUTATION, { onCompleted });

  const onSubmit = () => {
    if (!loading) {
      const { name, address, phoneNumber, mallTypeName } = getValues();
      createShopMutation({
        variables: {
          createShopsInPut: {
            name,
            address,
            phoneNumber,
            mallTypeName,
            coverImage: tempImageUrl,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Shop | Demo Shop </title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col px-5 items-center justify-center">
        <h3 className="font-semibold text-2xl mb-3">Create New Shop</h3>
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
            type="text"
            name="address"
            placeholder="Address"
            ref={register({ required: "Address is required." })}
          />
          <input
            className="input"
            type="text"
            name="phoneNumber"
            placeholder="phoneNumber"
            ref={register({ required: "phoneNumber is required." })}
          />

          <h4 className="font-semibold text-xl ml-1 mt-2"> Selete Mall Type</h4>

          <select
            name="mallTypeName"
            ref={register({ required: true })}
            className="input"
          >
            {MallTypesOptions.map((options) => (
              <option key={options.value}>{options.label}</option>
            ))}
          </select>

          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText={"Create Shop"}
          />
          {data?.createShop.error && (
            <FormError errorMessage={data?.createShop.error} />
          )}
        </form>
      </div>
    </div>
  );
};
