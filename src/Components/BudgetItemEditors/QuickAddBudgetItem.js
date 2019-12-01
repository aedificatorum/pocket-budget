import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useState } from "react";

const InputStyled = styled.input`
  ${tw`bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500`};
`;

const QuickAddBudgetItem = ({ saveItem, categories }) => {
  const [form, setForm] = useState({
    // 0 today, -1 yesterday
    date: "0",
    subcategory: undefined,
    to: "",
    amount: ""
  });

  const getDateFromDays = days => {
    switch (days) {
      case "0":
        return new Date();
      case "-1":
        return new Date(Date.now() - 24 * 60 * 60 * 1000);
      default:
        throw new Error("Unknown date range encountered - expected 0 or -1");
    }
  };

  const getCategory = subcategory => {
    const findCategory = categories.find(cat => {
      return cat.subcategories.find(subc => subc === form.subcategory);
    });
    let category = findCategory.name;
    return category;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formIsValid = () => {
    return (
      form.to &&
      form.to.length > 0 &&
      form.amount &&
      form.amount.length > 0 &&
      !isNaN(parseInt(form.amount)) &&
      form.subcategory &&
      form.subcategory.length > 0
    );
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formIsValid()) {
      return;
    }

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
          css={tw`m-1 border`}
        />
        <label htmlFor={id}>{label}</label>
      </React.Fragment>
    );
  };

  const submitButtonDisabled = !formIsValid();

  return (
    <div css={tw`lg:max-w-lg lg:mx-auto flex flex-wrap p-6`}>
      <form onSubmit={handleSubmit} css={tw`w-full md:flex md:flex-wrap`}>
        <div css={tw`flex py-2`}>
          <div css={tw`w-1/2 text-center`}>
            {radio("yesterday", "date", "Yesterday", "-1", form.date)}
          </div>
          <div css={tw`w-1/2 text-center`}>
            {radio("today", "date", "Today", "0", form.date)}
          </div>
        </div>
        <div css={tw`flex py-2`}>
          <div css={tw`w-1/3 text-center`}>
            {radio(
              "restaurant",
              "subcategory",
              "Restaurant",
              "Restaurant",
              form.subcategory
            )}
          </div>
          <div css={tw`w-1/3 text-center`}>
            {radio(
              "coffee",
              "subcategory",
              "Coffee",
              "Eating Out",
              form.subcategory
            )}
          </div>
          <div css={tw`w-1/3 text-center mb-4`}>
            {radio(
              "groceries",
              "subcategory",
              "Groceries",
              "Groceries Online",
              form.subcategory
            )}
          </div>
        </div>
        <div css={tw`mb-6`}>
          <InputStyled
            placeholder="To"
            name="to"
            value={form.to}
            onChange={handleChange}
          />
        </div>
        <div css={tw`mb-6`}>
          <InputStyled
            placeholder="Amount"
            name="amount"
            value={form.amount}
            type="number"
            step="0.01"
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
        <button
          css={tw`w-full shadow bg-green-500 hover:bg-green-300 focus:shadow-outline focus:outline-none text-white py-2 px-4 rounded`}
          type="submit"
          disabled={submitButtonDisabled}
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default QuickAddBudgetItem;
