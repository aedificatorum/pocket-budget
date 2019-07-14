import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormItem from "./FormItem";

const AddBudgetItem = ({ addNewItem, id, getItem, updateItem, history }) => {
  // TODO: Adding an item should reset the form (maybe?)
  const dateToString = (date) => date ? date.toISOString().substr(0, 10) : undefined;

  const [form, setValues] = useState({
    date: new Date(),
    reportingDate: new Date(),
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
      history.push("/summary");
    } else {
      addNewItem(form);
    }
  }

  const onChange = (e) => {
    let val = e.target.value;

    if(e.target.type === 'date') {
      val = new Date(val);
    } else if (e.target.type === 'number') {
      val = parseFloat(val);
    }

    setValues({
      ...form,
      [e.target.name]: val
    });
  }

  useEffect(() => {
    // https://juliangaramendy.dev/use-promise-subscription/
    // This is called twice when the page loads - I *think* because of auth
    // So would be good to make this component memoize and not re-render just because
    // the auth context has changed.
    // Maybe not wrap the whole app in the auth provider? Maybe not that helpful!
    let isSubscribed = true;

    const getItemAsync = async () => {
      const item = await getItem(id);
      if(isSubscribed) {
        setValues({...item});
      }
    }

    if(id) {
      getItemAsync(id);
    }
    return () => isSubscribed = false;
  },[id, getItem]);


  return (
    <div css={tw`flex flex-wrap`}>
        
      <form
        onSubmit={handleSubmit}
        css={tw`w-full md:flex md:flex-wrap`}
        >
        {/* TODO: These dates are always UTC, should be local */}
        <FormItem name="date" label="Date" value={dateToString(form.date)} type="Date" onChange={onChange} css={tw`w-1/3`} />
        <FormItem name="reportingDate" label="Reporting Date" value={dateToString(form.reportingDate)} type="Date" onChange={onChange} css={tw`w-1/3`} />
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

export default withRouter(AddBudgetItem);
