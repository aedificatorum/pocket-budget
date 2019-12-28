import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { OverviewCard } from "./OverviewCard";
import { getItemsForReportingPeriod, getCategories } from "../Store";
import { FormattedNumber } from "react-intl";
import MonthPicker from "./MonthPicker";
import _ from "lodash";
import moment from "moment";

const OverviewContainer = styled.div`
  margin: 1rem 1rem 3rem 1rem;
  display: flex;
  flex-direction: column;
  @media (min-width: ${props => props.theme.breakpoint}) {
    max-width: 50rem;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
  }
`;

const TotalDisplayStyle = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.5rem;
  margin: 0rem 2rem;
`;

const today = new Date();
const Overview = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);

  // TODO: This should be a 'period picker', and provide start/end, as well as last month, last 3 months, etc.
  const [month, setMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const getItems = async month => {
    const startOfMonth = moment.utc([month.getFullYear(), month.getMonth(), 1]);
    const endOfMonth = moment.utc(startOfMonth).add(1, "month");

    setItems(
      await getItemsForReportingPeriod(
        startOfMonth.unix() * 1000,
        endOfMonth.unix() * 1000
      )
    );
  };

  const loadCategories = async () => {
    setCategories(await getCategories());
  };

  useEffect(() => {
    getItems(month);
    loadCategories();
  }, [month]);

  const incomeCategories = categories
    .filter(category => category.isIncome)
    .map(category => category.name);
  const expenseItems = items.filter(
    item => !incomeCategories.includes(item.category)
  );
  const incomeItems = items.filter(item =>
    incomeCategories.includes(item.category)
  );

  const currencies = _.groupBy(expenseItems, "currency");
  const currencyOverviews = Object.keys(currencies).map(c => {
    return <OverviewCard key={c} currency={c} items={currencies[c]} />;
  });
  
  const totalIncomeUSD = _.sumBy(incomeItems.filter(item => item.currency === "USD"), "amount") * -1;
  const toalExpenseUSD = _.sumBy(expenseItems.filter(item => item.currency === "USD"), "amount");

  return (
    <OverviewContainer>
      <section>
        <MonthPicker month={month} setMonth={setMonth} />
      </section>
      <TotalDisplayStyle>
        <div style={{ color: "#FF4136" }}>
          <FormattedNumber
            value={toalExpenseUSD}
            style="currency"
            currency="usd"
          />
        </div>
        <div style={{ color: "#2ECC40" }}>
          <FormattedNumber
            value={totalIncomeUSD}
            style="currency"
            currency="usd"
          />
        </div>
      </TotalDisplayStyle>
      {currencyOverviews}
    </OverviewContainer>
  );
};

export default Overview;
