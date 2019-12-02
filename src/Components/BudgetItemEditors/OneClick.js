import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { addItem, getSpeedyAdd } from "../Store";

const SpeedyAddButton = styled.button`
  ${tw`shadow bg-green-500 p-2 w-full h-full hover:bg-green-300 focus:shadow-outline focus:outline-none text-white rounded`}
`;

const InputStyled = styled.input`
  ${tw`bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500`};
`;

const OneClick = ({ updateState }) => {
  const [amount, setAmount] = useState("");
  const [speedyAdds, setSpeedyAdds] = useState([]);

  useEffect(() => {
    const getSpeedyAddAsync = async () => {
      const list = await getSpeedyAdd();
      list.sort((a, b) => {
        return a.to < b.to ? -1 : a.to > b.to ? 1 : 0;
      });
      setSpeedyAdds(list);
    };
    getSpeedyAddAsync();
  }, []);

  const formIsValid = () => {
    return amount.length > 0;
  };

  const handleChange = e => {
    setAmount(e.target.value);
  };

  const handleToClick = async e => {
    const id = e.target.value;

    if (!formIsValid()) {
      return;
    }

    const { category, subcategory, to } = speedyAdds.find(s => s.id === id);

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

    await addItem(item);
    toast.success("Item added! 🦄");
    await updateState();
  };

  return (
    <div css={tw`lg:max-w-lg lg:mx-auto p-4`}>
      <form
        css={tw`flex flex-col`}
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div css={tw`flex py-4`}>
          <InputStyled
            placeholder="Amount"
            name="amount"
            type="number"
            step="0.01"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <div css={tw`flex flex-wrap overflow-hidden -mx-2`}>
          {speedyAdds.map(s => {
            return (
              <div css={tw`w-1/2 overflow-hidden my-2 px-2`} key={s.id}>
                <SpeedyAddButton name="to" value={s.id} onClick={handleToClick}>
                  {s.displayName ? s.displayName : s.to}
                </SpeedyAddButton>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
};

export default OneClick;
