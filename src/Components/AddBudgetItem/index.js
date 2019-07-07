import { useState, useEffect } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormItem from "./FormItem";

const AddBudgetItem = ({ addNewItem, id, getItem, updateItem }) => {
  // TODO: Adding an item should reset the form (maybe?)
  const todayAsDefault = new Date().toISOString().substr(0, 10);

  const [form, setValues] = useState({
    date: todayAsDefault,
    reportingdate: todayAsDefault,
    currency: "USD",
    location: "New York",
    category: "Food",
    subcategory: "Cafe",
    to: "Starbucks",
    amount: 9.99,
    details: "",
    project: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(id) {
      updateItem(id, form);
    } else {
      addNewItem(form);
    }
  }

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  useEffect(() => {
    if(id) {
      const item = getItem(id);
      setValues({...item});
    }
  },[id, getItem]);

  return (
    <div css={tw`flex flex-wrap`}>
        
      <form
        onSubmit={handleSubmit}
        css={tw`w-full md:flex md:flex-wrap`}
        >
        {/* TODO: These dates are always UTC, should be local */}
        <FormItem name="date" label="Date" value={form.date} type="Date" onChange={onChange} css={tw`w-1/3`} />
        <FormItem name="reportingdate" label="Reporting Date" value={form.reportingdate} type="Date" onChange={onChange} css={tw`w-1/3`} />
        <FormItem name="currency" label="Currency" value={form.currency} onChange={onChange} css={tw`w-1/3`} />
        <FormItem name="location" label="Location" value={form.location} onChange={onChange} css={tw`w-1/3`} />
        <FormItem name="category" label="Category" value={form.category} onChange={onChange} css={tw`w-1/3`} />
        <FormItem name="subcategory" label="Subcategory" value={form.subcategory} onChange={onChange}  css={tw`w-1/3`} />
        <FormItem name="to" label="To" value={form.to} onChange={onChange} css={tw`w-1/3`} />
        <FormItem name="amount" label="Amount" value={form.amount} type="Number" onChange={onChange} css={tw`w-1/3`} />
        <FormItem name="details" label="Details" value={form.details} onChange={onChange} css={tw`w-1/3`} />
        <FormItem name="project" label="Project" value={form.project} onChange={onChange} css={tw`w-1/3`} />

        <div css={tw`md:flex md:items-center md:w-full`}>
          <div css={tw`sm:w-1/3 `}></div>
          <div css={tw`sm:w-2/3`}>
            <button
              css={tw`md:w-1/2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
              type="submit">
              {id ? "Update Item" : "Add Item"}
          </button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default AddBudgetItem;
