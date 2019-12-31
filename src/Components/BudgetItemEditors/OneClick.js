import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import { addItem, getSpeedyAdd, getItemsForReportingPeriod } from "../Store";
import styled from "styled-components";
import moment from "moment";
import { getTodayTicks, getToday } from "../../Utils/dateUtils";

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

const OneClick = ({ updateState, accounts }) => {
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
      const utcMidnight = getToday();
      const fromDate = moment.utc(utcMidnight).add(-2, "month");
      const toDate = moment.utc(utcMidnight).add(1, "day");

      const list = await getItemsForReportingPeriod(
        fromDate.unix() * 1000,
        toDate.unix() * 1000
      );

      const topItems = _.chain(list)
        .groupBy(item => {
          return `${item.category}|${item.subcategory}|${item.to}`;
        })
        .sortBy("length")
        .takeRight(9)
        .reverse()
        .value()
        .map(items => items[0]);

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

    const accountId = accounts.find(account => {
      return account.name === subcategory && account.category === category
    }).accountId;

    // TODO: Remove when we remove cat/subcat from store
    if(!accountId) {
      throw new Error("That accountId does not exist!");
    }

    const item = {
      dateTicks: getTodayTicks(),
      reportingDateTicks: getTodayTicks(),
      currency: "USD",
      location: "New York",
      to,
      amount: parseFloat(amount),
      details: "",
      project: "",
      accountId
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
                  <ButtonStyled
                    name="to"
                    value={s.id}
                    onClick={() =>
                      handleButtonClick(s.to, s.category, s.subcategory)
                    }
                  >
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
