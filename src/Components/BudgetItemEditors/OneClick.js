import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
// import styled from "@emotion/styled";
import { addItem, getSpeedyAdd } from "../Store";
import styled from "styled-components";

const SpeedyAddButton = styled.button`
  background-color: ${ props => props.theme.accentOne };
  color: ${ props => props.theme.textInverse };
  padding: .5rem;
  border-radius: .5rem;
  width: 100%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  :hover {
    background-color: ${ props => props.theme.accentTwo };
    color: ${ props => props.theme.textNormal }
  }
`

const InputStyled = styled.input`
  border: .125rem solid ${ props => props.theme.accentOne };
  padding: .5rem;
  width: 100%;
  border-radius: .5rem;
  background-color: #edf2f7;
  :focus {
    background-color: white;
  }
`

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
