import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormItem from "./FormItem";

const AddBudgetItem = ({ addNewItem, id, getItem, updateItem, history, categories }) => {
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
    project: "",
    customReportingDate: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // If the custom reporting date box was unchecked, make it equal the date
    const formItems = { ...form };
    if (!form.customReportingDate) {
      formItems.reportingDate = formItems.date;
    }

    if (id) {
      updateItem(id, formItems);
      history.push("/summary");
    } else {
      addNewItem(formItems);
    }
  }

  const onChange = (e) => {
    let val = e.target.value;

    if (e.target.type === 'date') {
      val = new Date(val);
    } else if (e.target.type === 'number') {
      val = parseFloat(val);
    } else if (e.target.type === 'checkbox') {
      val = e.target.checked;
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
      if (isSubscribed) {
        const customReportingDate = item.reportingDate.getTime() !== item.date.getTime();
        setValues({ ...item, customReportingDate });
      }
    }

    if (id) {
      getItemAsync(id);
    }
    return () => isSubscribed = false;
  }, [id, getItem]);

  const categorySelect = () => {
    return (
      <select onChange={(e) => setValues({ ...form, category: e.target.value })} value={form.category}>
        {categories.map(c => {
          return (<option key={c.name} value={c.name}>{c.name}</option>);
        })}
      </select>
    );
  }

  const subcategorySelect = () => {
    const category = categories.find(c => c.name === form.category);

    // Are we re-rendering because category changed?  If so might need to change subcategory
    if (!category.subcategories.find(subcategory => subcategory === form.subcategory)) {
      setValues({ ...form, subcategory: category.subcategories[0] });
    }

    return (
      <select onChange={(e) => setValues({ ...form, subcategory: e.target.value })} value={form.subcategory}>
        {category.subcategories.map(subcategory => {
          return (<option key={subcategory} value={subcategory}>{subcategory}</option>);
        })}
      </select>
    )
  }

  return (
    <div css={tw`flex flex-wrap`}>

      <form
        onSubmit={handleSubmit}
        css={tw`w-full md:flex md:flex-wrap`}
      >
        {/* TODO: These dates are always UTC, should be local */}
        <FormItem name="date" label="Date" value={dateToString(form.date)} type="Date" onChange={onChange} css={tw`w-1/3`} />
        <FormItem name="customReportingDate" label="Reporting Date?" type="checkbox" checked={form.customReportingDate} onChange={onChange} css={tw`w-1/3`} />
        {form.customReportingDate ? (
          <FormItem name="reportingDate" label="Reporting Date" value={dateToString(form.reportingDate)} type="Date" onChange={onChange} css={tw`w-1/3`} />
        ) : null}
        <FormItem name="currency" label="Currency" value={form.currency} onChange={onChange} css={tw`w-1/3`} />
        <FormItem name="location" label="Location" value={form.location} onChange={onChange} css={tw`w-1/3`} />


        <div css={tw`md:flex md:items-center mb-6 md:w-1/2`}>
          <div css={tw`md:w-1/5`}>
            <label
              css={tw`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4`}
              htmlFor={id}>
              Category
            </label>
          </div>
          <div css={tw`md:w-2/3`}>
            {categorySelect()}
          </div>
        </div>
        <div css={tw`md:flex md:items-center mb-6 md:w-1/2`}>
          <div css={tw`md:w-1/5`}>
            <label
              css={tw`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4`}
              htmlFor={id}>
              Subcategory
          </label>
          </div>
          <div css={tw`md:w-2/3`}>
            {subcategorySelect()}
          </div>
        </div>

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
