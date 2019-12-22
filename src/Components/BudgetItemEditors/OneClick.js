import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addItem, getSpeedyAdd, getRecent } from "../Store";
import styled from "styled-components";

const SpeedyAddButton = styled.button`
  background-color: ${props => props.theme.accentOne};
  color: ${props => props.theme.textInverse};
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  :hover {
    background-color: ${props => props.theme.accentTwo};
    color: ${props => props.theme.textNormal};
  }
`;

const SpeedyButtonRow = styled.div`
  width: 50%;
  padding: 0.5rem;
`;

const SpeedyButtonContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
`;

const InputStyled = styled.input`
  border: 0.125rem solid ${props => props.theme.accentOne};
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.5rem;
  background-color: #edf2f7;
  margin: 1rem 0;
  :focus {
    background-color: white;
    border-color: darkgray;
  }
`;

const OneClickContainer = styled.div`
  padding-top: 2rem;
  max-width: 48rem;
  margin: auto;

  @media (max-width: ${props => props.theme.breakpoint}) {
    padding-top: 1rem;
    width: 90%;
    margin: auto;
  }
`;

const OneClick = ({ updateState }) => {
  const [amount, setAmount] = useState("");
  const [speedyAdds, setSpeedyAdds] = useState([]);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const getSpeedyAddAsync = async () => {
      const list = await getSpeedyAdd();
      list.sort((a, b) => {
        return a.to < b.to ? -1 : a.to > b.to ? 1 : 0;
      });
      setSpeedyAdds(list);
    };

    const getRecentAsync = async () => {
      const list = await getRecent();
      list.forEach(
        item => (item.key = `${item.category}|${item.subcategory}|${item.to}`)
      );
      const reduceList = list.reduce((acc, item) => {
        if (acc[item.key]) {
          acc[item.key].times += 1;
        } else {
          acc[item.key] = {
            times: 1,
            category: item.category,
            subcategory: item.subcategory,
            to: item.to
          };
        }
        return acc;
      }, {});

      const sortedList = [];

      for (let key in reduceList) {
        sortedList.push({ key, ...reduceList[key] });
      }

      sortedList.sort((a, b) => {
        return b.times - a.times;
      });

      const topItems = sortedList.slice(0, 6);
      console.log(topItems);

      setRecent(topItems);
    };

    getSpeedyAddAsync();
    getRecentAsync();
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
    <OneClickContainer>
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div>
          <InputStyled
            placeholder="Amount"
            name="amount"
            type="number"
            step="0.01"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <SpeedyButtonContainer>
          {speedyAdds.map(s => {
            return (
              <SpeedyButtonRow key={s.id}>
                <SpeedyAddButton name="to" value={s.id} onClick={handleToClick}>
                  {s.displayName ? s.displayName : s.to}
                </SpeedyAddButton>
              </SpeedyButtonRow>
            );
          })}
          {recent.map(s => {
            return (
              <SpeedyButtonRow key={s.key}>
                <SpeedyAddButton name="to" value={s.to} onClick={handleToClick}>
                  {s.displayName ? s.displayName : s.to}
                </SpeedyAddButton>
              </SpeedyButtonRow>
            );
          })}
        </SpeedyButtonContainer>
      </form>
    </OneClickContainer>
  );
};

export default OneClick;
