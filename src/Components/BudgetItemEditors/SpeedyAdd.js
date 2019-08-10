import React, { useState } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const SpeedyAddButton = styled.button`
  ${tw`shadow bg-orange-400 hover:bg-orange-300 focus:shadow-outline focus:outline-none text-white m-2 mb-2 py-2 px-4 rounded`}
`;

const InputStyled = styled.input`
  ${tw`bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500`};
`;

const SpeedyAdd = ({ saveItem }) => {
  const [amount, setAmount] = useState("");

  const getCategory = to => {
    switch (to) {
      case "Key Food":
      case "Fresh Direct":
        return { category: "Food", subcategory: "Groceries" };
      case "Burger Garage":
        return { category: "Entertainment", subcategory: "Restaurant" };
      case "MTA":
        return { category: "Travel", subcategory: "Public Transport"};
    }
  };

  const formIsValid = () => {
    return amount.length > 0;
  };

  const handleChange = e => {
    setAmount(e.target.value);
  };

  const handleToClick = (e) => {
    const to = e.target.value;

    if (!formIsValid()) {
      return;
    }

    const { category, subcategory } = getCategory(to);

    const item = {
      date: new Date(),
      reportingDate: new Date(),
      currency: "USD",
      location: "New York",
      category,
      subcategory,
      to,
      amount: parseFloat(amount),
      details: "",
      project: ""
    };

    saveItem(undefined, item);
  };

  return (
    <div css={tw`lg:max-w-lg lg:mx-auto`}>
      <form css={tw`flex flex-col`} onSubmit={(e) => {e.preventDefault()}}>
        <div css={tw`flex p-4`}>
          <InputStyled
            placeholder="Amount"
            name="amount"
            type="number"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <SpeedyAddButton name="to" value="Fresh Direct" onClick={handleToClick}>
          Fresh Direct
        </SpeedyAddButton>
        <SpeedyAddButton name="to" value="Key Food" onClick={handleToClick}>
          Key Food
        </SpeedyAddButton>
        <SpeedyAddButton name="to" value="Burger Garage" onClick={handleToClick}>
          Burger Garage
        </SpeedyAddButton>
        <SpeedyAddButton name="to" value="Misfits Market" onClick={handleToClick}>
          Misfits Market
        </SpeedyAddButton>
        <SpeedyAddButton name="to" value="Metro" onClick={handleToClick}>
          Metro
        </SpeedyAddButton>
      </form>
    </div>
  );
};

export default SpeedyAdd;
