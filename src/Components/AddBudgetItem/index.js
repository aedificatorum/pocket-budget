import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormItem from "./FormItem";

const AddBudgetItem = ({ id, getItem, saveItem, returnAction, categories, deleteItem }) => {
  // TODO: Adding an item should reset the form (maybe?)
  const dateToString = (date) => date ? date.toISOString().substr(0, 10) : undefined;

  const [form, setValues] = useState({
    date: new Date(),
    reportingDate: new Date(),
    currency: "USD",
    location: "New York",
    category: "Food",
    subcategory: "Groceries",
    to: "",
    amount: "",
    details: "",
    project: "",
    customReportingDate: false
  });

  const handleDelete = async () => {
    await deleteItem(id);
    returnAction();
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // If the custom reporting date box was unchecked, make it equal the date
    const formItems = { ...form };
    if (!form.customReportingDate) {
      formItems.reportingDate = formItems.date;
    }

    saveItem(id, formItems);
    
    if(returnAction) {
      returnAction();
    }
  }

  const onChange = (e) => {
    let val = e.target.value;

    if (e.target.type === 'date') {
      val = new Date(val);
    } else if (e.target.type === 'number' && val) {
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
    // If the form is initializing do nothing
    if(!categories.length) {
      return null;
    }

    return (
    <div css={tw`relative`}>
      <select 
        css={tw`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
        id="form-category"
        onChange={(e) => setValues({ ...form, category: e.target.value })}
        value={form.category}>
        {categories ? categories.map(c => {
          return (<option key={c.name} value={c.name}>{c.name}</option>);
        }) : null}
      </select>
      <div css={tw`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`}>
        <svg css={tw`fill-current h-4 w-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
    );
  }

  const subcategorySelect = () => {
    // If the form is initializing do nothing
    if(!categories.length) {
      return null;
    }

    const category = categories.find(c => c.name === form.category);
    if(!category) {
      throw new Error('Category on the record does not exist in the database');
    }

    // Are we re-rendering because category changed?  If so might need to change subcategory
    if (!category.subcategories.find(subcategory => subcategory === form.subcategory)) {
      setValues({ ...form, subcategory: category.subcategories[0] });
    }

    return (
      <div css={tw`relative`}>
      <select 
        css={tw`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
        id="form-subcategory"
        onChange={(e) => setValues({ ...form, subcategory: e.target.value })}
        value={form.subcategory}>
        {category.subcategories.map(subcategory => {
          return (<option key={subcategory} value={subcategory}>{subcategory}</option>);
        })}
      </select>
      <div css={tw`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`}>
        <svg css={tw`fill-current h-4 w-4`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </div>
    )
  }

  return (
    <div css={tw`flex flex-wrap p-6`}>

      <form
        onSubmit={handleSubmit}
        css={tw`w-full md:flex md:flex-wrap`}
      >
        {/* TODO: These dates are always UTC, should be local */}
        <FormItem name="date" label="Date" value={dateToString(form.date)} type="Date" onChange={onChange} />
        <FormItem name="customReportingDate" label="Reporting Date?" type="checkbox" checked={form.customReportingDate} onChange={onChange} />
        {form.customReportingDate ? (
          <FormItem name="reportingDate" label="Reporting Date" value={dateToString(form.reportingDate)} type="Date" onChange={onChange} />
        ) : null}
        <FormItem name="currency" label="Currency" value={form.currency} onChange={onChange} />
        <FormItem name="location" label="Location" value={form.location} onChange={onChange} />
        <FormItem name="category" label="Category" inputItem={categorySelect()} />
        <FormItem name="subcategory" label="Subcategory" inputItem={subcategorySelect()} />
        <FormItem name="to" label="To" value={form.to} onChange={onChange}/>
        <FormItem name="amount" label="Amount" value={form.amount} type="Number" onChange={onChange} />
        <FormItem name="details" label="Details" value={form.details} onChange={onChange}/>
        <FormItem name="project" label="Project" value={form.project} onChange={onChange}/>

        <div css={tw`flex`}>
            <button
              css={tw`shadow bg-orange-400 hover:bg-orange-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 p-2 rounded`}
              type="submit">
              {id ? "Update Item" : "Add Item"}
            </button>
            {id? (<button
              onClick={handleDelete}
              css={tw`shadow bg-orange-400 hover:bg-orange-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
              type="button"
              >
                Delete
            </button>) : ""}
          </div>
      </form>
    </div>
  )
};

export default withRouter(AddBudgetItem);
