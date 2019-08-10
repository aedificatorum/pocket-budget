import React, { useState, useEffect } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { getSpeedyAdd } from "../Firebase/firebaseStore";

const SpeedyAddButton = styled.button`
  ${tw`shadow bg-orange-400 m-2 mb-4 hover:bg-orange-300 focus:shadow-outline focus:outline-none text-white py-4 px-4 rounded`}
`;

const InputStyled = styled.input`
  ${tw`bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500`};
`;

const SpeedyAdd = ({ saveItem }) => {
  const [amount, setAmount] = useState("");
  const [speedyAdds, setSpeedyAdds] = useState([]);

  useEffect(() => {
    const getSpeedyAddAsync = async () => {
      const list = await getSpeedyAdd();
      setSpeedyAdds(list)
      }
    getSpeedyAddAsync();
  }, []);

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

    const { category, subcategory } = speedyAdds.find(s => s.to === to);

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
        <div css={tw`flex p-4 pt-8`}>
          <InputStyled
            placeholder="Amount"
            name="amount"
            type="number"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div css={tw`p-4`}>
          <div css={tw`flex`}>
            <SpeedyAddButton css={tw`w-1/2 flex`} name="to" value="Fresh Direct" onClick={handleToClick}>
              Fresh Direct
            </SpeedyAddButton>
            <SpeedyAddButton css={tw`w-1/2 flex`} name="to" value="Key Foods" onClick={handleToClick}>
              Key Foods
            </SpeedyAddButton>
          </div>
          <div css={tw`flex`}>
            <SpeedyAddButton css={tw`w-1/2 flex`} name="to" value="Burger Garage" onClick={handleToClick}>
              Burger Garage
            </SpeedyAddButton>
            <SpeedyAddButton css={tw`w-1/2 flex`} name="to" value="Misfits Market" onClick={handleToClick}>
              Misfits Market
            </SpeedyAddButton>
          </div>
          <div css={tw`flex`}>
            <SpeedyAddButton css={tw`w-1/2 flex`}name="to" value="Metro" onClick={handleToClick}>
              Metro
            </SpeedyAddButton>
            <SpeedyAddButton css={tw`w-1/2 flex`}name="to" value="Metro" onClick={handleToClick}>
              Metro
            </SpeedyAddButton>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SpeedyAdd;
