import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useState } from "react";

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
    // TODO: If the form is not valid, don't submit it
    // This includes being able to parse the number

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
  };

  const radio = (id, name, label, value, binding) => {
    return (
      <React.Fragment>
      <input
            type="radio"
            name={name}
            value={value}
            id={id}
            checked={binding === value}
            onChange={handleChange}
          />
          <label htmlFor={id}>{label}</label>
        </React.Fragment>
    )
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div css={tw`flex -mx-2`}>
          {radio("yesterday", "date", "Yesterday", "-1", form.date)}
          {radio("today", "date", "Today", "0", form.date)}
        </div>
        <div css={tw`flex -mx-2`}>
          {radio("restaurant", "subcategory", "Restaurant", "subcategory", form.subcategory)}
          {radio("coffee", "subcategory", "Coffee", "subcategory", form.subcategory)}
          {radio("groceries", "subcategory", "Groceries", "subcategory", form.subcategory)}
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