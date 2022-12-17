import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addItem, getItemsForReportingPeriod } from "../Store";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { getTodayTicks, getStartOfCurrentMonthTicks } from "../../Utils/dateUtils";
import { groupBy, sortBy } from "Utils/utils";

const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -0.5rem;
  margin-left: -0.5rem;
`;

const ButtonStyled = styled.button`
  background-color: ${(props) => props.theme.accentOne};
  color: ${(props) => props.theme.textInverse};
  padding: 0.5rem;
  border-radius: 0.5rem;
  width: 100%;
  height: 64px;
  :hover {
    background-color: ${(props) => props.theme.accentTwo};
    color: ${(props) => props.theme.textNormal};
  }
`;

const ButtonRow = styled.div`
  width: 33%;
  padding: 0.5rem;
`;

const InputStyled = styled.input`
  border: 0.125rem solid ${(props) => props.theme.accentOne};
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

  @media (max-width: ${(props) => props.theme.breakpoint}) {
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

const OneClick = ({ accounts }) => {
  const [amount, setAmount] = useState("");
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const getRecentAsync = async () => {
      const fromDate = getStartOfCurrentMonthTicks(-2);
      const toDate = getTodayTicks(1);

      const list = await getItemsForReportingPeriod(fromDate, toDate);

      const groupedList = groupBy(list, (item) => {
        return `${item.category}|${item.subcategory}|${item.to}`;
      });
      
      const sortedList = sortBy(Object.entries(groupedList), item => item[1].length).reverse();
      // [GroupBy, array of items] = groupedList[0]
      const topItems = sortedList.slice(0, 12).map(items => items[1][0]);

      setRecent(topItems);
    };

    getRecentAsync();
  }, []);

  const formIsValid = () => {
    return amount.length > 0;
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleButtonClick = async (to, category, subcategory) => {
    if (!formIsValid()) {
      return;
    }

    const accountId = accounts.find((account) => {
      return account.name === subcategory && account.category === category;
    }).accountId;

    const item = {
      dateTicks: getTodayTicks(),
      reportingDateTicks: getTodayTicks(),
      currency: "GBP", // TODO: Centralize defaults / allow them to be customised / infer from recent transaction
      location: "York",
      to,
      amount: parseFloat(amount),
      details: "",
      project: "",
      accountId,
    };

    await submitItem(item);
  };

  const submitItem = async (item) => {
    const id = await addItem(item);
    toast.success(<Link to={`/edit/${id}`}>Item added! 🦄</Link>);
  };

  return (
    <OneClickContainer>
      <form
        onSubmit={(e) => {
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
            {recent.map((s, i) => {
              return (
                <ButtonRow key={i}>
                  <ButtonStyled
                    name="to"
                    style={{
                      backgroundColor: "#eadee0",
                      color: "#252627",
                      fontSize: "0.75rem",
                    }}
                    value={s.to}
                    onClick={() => handleButtonClick(s.to, s.category, s.subcategory)}
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
