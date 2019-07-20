import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { useState } from "react";

const InputStyled = styled.input`
  ${tw`bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`};
`;

const QuickAdd = ({ saveItem, categories }) => {
  const [form, setForm] = useState({
    // 0 today, -1 yesterday
    date: "0",
    subcategory: undefined,
    to: "",
    amount: ""
  });

  const getDateFromDays = (days) => {
    // TODO: this
    return new Date();
  }

  const getCategory = (subcategory) => {
    // TODO: this
    return "Food";
  }

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const item = {
      date: getDateFromDays(form.date),
      reportingDate: getDateFromDays(form.date),
      currency: "USD",
      location: "New York",
      category: getCategory(form.subcategory),
      subcategory: form.subcategory,
      to: form.to,
      amount: parseFloat(form.amount),
      details: "",
      project: ""
    };
    saveItem(undefined, item);
    console.log(form, item);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div css={tw`flex -mx-2`}>
          <input
            type="radio"
            name="date"
            value="-1"
            id="yesterday"
            checked={form.date === "-1"}
            onChange={handleChange}
          />
          <label htmlFor="yesterday">Yesterday</label>
          <input
            type="radio"
            name="date"
            value="0"
            id="today"
            checked={form.date === "0"}
            onChange={handleChange}
          />
          <label htmlFor="today">Today</label>
        </div>
        <div css={tw`flex -mx-2`}>
          <input
            type="radio"
            name="subcategory"
            value="restaurant"
            id="restaurant"
            checked={form.subcategory === "restaurant"}
            onChange={handleChange}
          />
          <label htmlFor="restaurant">Restaurant</label>
          <input
            type="radio"
            name="subcategory"
            value="coffee"
            id="coffee"
            checked={form.subcategory === "coffee"}
            onChange={handleChange}
          />
          <label htmlFor="coffee">Coffee</label>
          <input
            type="radio"
            name="subcategory"
            value="groceries"
            id="groceries"
            checked={form.subcategory === "groceries"}
            onChange={handleChange}
          />
          <label htmlFor="groceries">Groceries</label>
        </div>
        <div css={tw`flex -mx-2`}>
          <InputStyled
            placeholder="To"
            name="to"
            value={form.to}
            onChange={handleChange}
          />
        </div>
        <div css={tw`flex -mx-2 p-4`}>
          <InputStyled
            placeholder="Amount"
            name="amount"
            value={form.amount}
            onChange={handleChange}
          />
        </div>
        <button
          css={tw`w-1/2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white m-4 py-2 px-4 rounded`}
          type="submit"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default QuickAdd;
