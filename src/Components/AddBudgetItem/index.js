import { useState } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core"
import FormItem from "./FormItem";

const AddBudgetItem = ({ addNewItem }) => {
  // TODO: Adding an item should reset the form (maybe>)
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
    addNewItem(form);
  }

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div css={tw``}>
      <form
        onSubmit={handleSubmit}
        css={tw`w-full max-w-sm`}>
        {/* TODO: These dates are always UTC, should local */}
        <FormItem name="date" label="Date" value={form.date} type="Date" onChange={onChange} />
        <FormItem name="reportingdate" label="Reporting Date" value={form.reportingdate} type="Date" onChange={onChange} />
        <FormItem name="currency" label="Currency" value={form.currency} onChange={onChange} />
        <FormItem name="location" label="Location" value={form.location} onChange={onChange} />
        <FormItem name="category" label="Category" value={form.category} onChange={onChange} />
        <FormItem name="subcategory" label="Subcategory" value={form.subcategory} onChange={onChange} />
        <FormItem name="to" label="To" value={form.to} onChange={onChange} />
        <FormItem name="amount" label="Amount" value={form.amount} type="Number" onChange={onChange} />
        <FormItem name="details" label="Details" value={form.details} onChange={onChange} />
        <FormItem name="project" label="Project" value={form.project} onChange={onChange} />

        <div css={tw`md:flex md:items-center`}>
          <div css={tw`md:w-1/3`}></div>
          <div css={tw`md:w-2/3`}>
            <button
              css={tw`shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
              type="submit">
              Add Item
          </button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default AddBudgetItem;
