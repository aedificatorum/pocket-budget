import React, { useState } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const SpeedyAddButton = styled.button`
  ${tw`shadow bg-orange-400 hover:bg-orange-300 focus:shadow-outline focus:outline-none text-white m-2 mb-12 py-2 px-4 rounded`}
`;

const InputStyled = styled.input`
  ${tw`bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500`};
`;

const SpeedyAdd = ({ saveItem }) => {
  // button with name of a shop: Amazon, KeyFood, Fresh Direct...
  // click the button - open a field amount
  // enter amount - press ok - done

  const [form, setForm] = useState({
    amount: "",
    to:""
  });

  const getCategory = to => {
    // to do
  };

  const getSubCategory = category => {
    // to do 
  }

  const formIsValid = () => {
    return (
      form.amount.length > 0
    );
  };

  const handleChange = e => {
    setForm({ [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formIsValid()) {
      return;
    }

    const item = {
      date: new Date(),
      reportingDate: new Date(),
      currency: "USD",
      location: "New York",
      category: "food", //getCategory(form.to),
      subcategory: "groceries",//getSubCategory(form.category),
      to: form.to,
      amount: parseFloat(form.amount),
      details: "",
      project: ""
    };
    saveItem(undefined, item);
    console.log(item)
  }

  return (
    <div css={tw`lg:max-w-lg lg:mx-auto`}>
      <form css={tw`flex flex-col`} onSubmit={handleSubmit}>
        <InputStyled
          placeholder="Amount"
          name="amount"
          type="number"
          onChange={handleChange}
        ></InputStyled>
        <SpeedyAddButton name="to" value="Key Food" onChange={handleChange} >Key Food</SpeedyAddButton>
        <SpeedyAddButton name="to" value="Fresh Direct" onChange={handleChange}>
          Fresh Direct
        </SpeedyAddButton>
      </form>
    </div>
  );
};

export default SpeedyAdd;
