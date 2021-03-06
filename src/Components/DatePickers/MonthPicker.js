import React from "react";
import styled from "styled-components";

const MonthPickerContainer = styled.div`
  display: flex;
  font-size: 1.5rem;
  padding: 0.5rem;
  justify-content: center;
  button {
    margin: 0rem 1rem;
  }
`;

const MonthPicker = ({ yearMonth, updateMonth }) => {
  const firstOfMonth = new Date(yearMonth.year, yearMonth.month, 1);
  const lastMonth = new Date(firstOfMonth);
  const nextMonth = new Date(firstOfMonth);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  return (
    <MonthPickerContainer>
      <button onClick={() => updateMonth(lastMonth.getFullYear(), lastMonth.getMonth())}>
        <span role="img" aria-label="precedent">
          «
        </span>
      </button>
      <div>
        {firstOfMonth.toString().slice(4, 7)} {firstOfMonth.toString().slice(11, 16)}
      </div>
      <button onClick={() => updateMonth(nextMonth.getFullYear(), nextMonth.getMonth())}>
        <span role="img" aria-label="next">
          »
        </span>
      </button>
    </MonthPickerContainer>
  );
};

export default MonthPicker;
