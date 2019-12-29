import React from "react";
import styled from "styled-components";

const MonthPickerContainer = styled.div`
  display: flex;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  justify-content: center;
  button {
    margin: 0rem 1rem;
  }
`;

const MonthPicker = ({ month, setMonth }) => {
  const lastMonth = new Date(month);
  const nextMonth = new Date(month);
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  return (
    <MonthPickerContainer>
      <button onClick={() => setMonth(lastMonth)}>
        <span role="img" aria-label="precedent">
          ⏪
        </span>
      </button>
      <div>
        {month.toString().slice(4, 7)} {month.toString().slice(11, 16)}
      </div>
      <button onClick={() => setMonth(nextMonth)}>
        <span role="img" aria-label="next">
          ⏩
        </span>
      </button>
    </MonthPickerContainer>
  );
};

export default MonthPicker;
