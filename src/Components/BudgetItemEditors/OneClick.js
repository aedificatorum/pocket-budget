import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addItem, getSpeedyAdd, getRecent } from "../Store";
import styled from "styled-components";

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
`;

const ButtonStyled = styled.button`
  background-color: ${props => props.theme.accentOne};
  color: ${props => props.theme.textInverse};
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;
  height: 64px;
  :hover {
    background-color: ${props => props.theme.accentTwo};
    color: ${props => props.theme.textNormal};
  }
`;

const ButtonRow = styled.div`
  width: 33%;
  padding: 0.5rem;
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

const ButtonGroupContainer = styled.div`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  margin-bottom: 1rem;
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

  const handleButtonClick = async (to, category, subcategory) => {
    if (!formIsValid()) {
      return;
    }

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

    await submitItem(item);
  };

  const submitItem = async item => {
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
        <ButtonsContainer>
          <ButtonGroupContainer>
            {speedyAdds.map(s => {
              return (
                <ButtonRow key={s.id}>
                  <ButtonStyled name="to" value={s.id} onClick={() =>
                      handleButtonClick(s.to, s.category, s.subcategory)
                    }>
                    {s.displayName ? s.displayName : s.to}
                  </ButtonStyled>
                </ButtonRow>
              );
            })}
          </ButtonGroupContainer>
          <ButtonGroupContainer>
            {recent.map(s => {
              return (
                <ButtonRow key={s.key}>
                  <ButtonStyled
                    name="to"
                    style={{
                      backgroundColor: "#eadee0",
                      color: "#252627",
                      fontSize: "0.75rem"
                    }}
                    value={s.to}
                    onClick={() =>
                      handleButtonClick(s.to, s.category, s.subcategory)
                    }
                  >
                    {s.to} {s.subcategory}
                  </ButtonStyled>
                </ButtonRow>
              );
            })}
          </ButtonGroupContainer>
        </ButtonsContainer>
      </form>
    </OneClickContainer>
  );
};

export default OneClick;
