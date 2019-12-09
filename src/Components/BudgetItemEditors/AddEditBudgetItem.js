import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import FormItem from "./FormItem";
import { getItem, addItem, updateItem, removeItem } from "../Store";
import styled from "styled-components";

const DEFAULT_CURRENCY = "default_currency";
const DEFAULT_LOCATION = "default_location";
const DEFAULT_PROJECT = "default_project";

const AddButton = styled.button`
  background-color: ${props => props.theme.accentOne};
  color: ${props => props.theme.textInverse};
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: auto;
  justify-content: center;
  width: 100%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  :hover {
    background-color: ${props => props.theme.accentTwo};
    color: ${props => props.theme.textNormal};
  }
`;

const AddItemContainer = styled.div`
  max-width: 48rem;
  padding: 2rem 0;
  margin: auto;
  /* display: flex; */
  /* flex-wrap: wrap; */
  /* width: 100%; */

  @media (max-width: ${props => props.theme.breakpoint}) {
    margin-top: 0.5rem;
  }
`;

const AddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
`;

const EditButtonContainer = styled.div`
  background-color: green;
`;

const AddEditBudgetItem = ({ id, returnAction, categories, updateState }) => {
  // TODO: Adding an item should reset the form (maybe?)
  const dateToString = date =>
    date ? date.toISOString().substr(0, 10) : undefined;

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
    await removeItem(id);
    await updateState();
    returnAction();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // If the custom reporting date box was unchecked, make it equal the date
    const formItems = { ...form };
    if (!form.customReportingDate) {
      formItems.reportingDate = formItems.date;
    }

    if (id) {
      await updateItem(id, formItems);
      toast.success("Item updated! 💸");
    } else {
      await addItem(formItems);
      toast.success("Item added! 🦄");
    }
    await updateState();

    // Assume the save didn't throw - set new defaults!
    localStorage.setItem(DEFAULT_CURRENCY, form.currency);
    localStorage.setItem(DEFAULT_LOCATION, form.location);
    localStorage.setItem(DEFAULT_PROJECT, form.project);

    if (returnAction) {
      returnAction();
    }
  };

  const onChange = e => {
    let val = e.target.value;

    if (e.target.type === "date") {
      val = new Date(val);
    } else if (e.target.type === "number" && val) {
      val = parseFloat(val);
    } else if (e.target.type === "checkbox") {
      val = e.target.checked;
    }

    setValues({
      ...form,
      [e.target.name]: val
    });
  };

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
        const customReportingDate =
          item.reportingDate.getTime() !== item.date.getTime();
        setValues({ ...item, customReportingDate });
      }
    };

    if (id) {
      getItemAsync(id);
    }
    return () => (isSubscribed = false);
  }, [id]);

  // Set default values from local storage
  // Only for new items!
  useEffect(() => {
    if (!id) {
      setValues(f => {
        return {
          ...f,
          currency: localStorage.getItem(DEFAULT_CURRENCY) || f.currency,
          location: localStorage.getItem(DEFAULT_LOCATION) || f.location,
          project: localStorage.getItem(DEFAULT_PROJECT) || f.project
        };
      });
    }
  }, [id]);

  const categorySelect = () => {
    // If the form is initializing do nothing
    if (!categories.length) {
      return null;
    }

    return (
      <div css={tw`relative`}>
        <select
          css={tw`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
          id="form-category"
          onChange={e => setValues({ ...form, category: e.target.value })}
          value={form.category}
        >
          {categories
            ? categories.map(c => {
                return (
                  <option key={c.name} value={c.name}>
                    {c.name}
                  </option>
                );
              })
            : null}
        </select>
        <div
          css={tw`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`}
        >
          <svg
            css={tw`fill-current h-4 w-4`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    );
  };

  const subcategorySelect = () => {
    // If the form is initializing do nothing
    if (!categories.length) {
      return null;
    }

    const category = categories.find(c => c.name === form.category);
    if (!category) {
      throw new Error("Category on the record does not exist in the database");
    }

    // Are we re-rendering because category changed?  If so might need to change subcategory
    if (
      !category.subcategories.find(
        subcategory => subcategory === form.subcategory
      )
    ) {
      setValues({ ...form, subcategory: category.subcategories[0] });
    }

    return (
      <div css={tw`relative`}>
        <select
          css={tw`block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
          id="form-subcategory"
          onChange={e => setValues({ ...form, subcategory: e.target.value })}
          value={form.subcategory}
        >
          {category.subcategories.map(subcategory => {
            return (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            );
          })}
        </select>
        <div
          css={tw`pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700`}
        >
          <svg
            css={tw`fill-current h-4 w-4`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    );
  };

  return (
    <AddItemContainer>
      <form onSubmit={handleSubmit} css={tw`w-full md:flex md:flex-wrap`}>
        {/* TODO: These dates are always UTC, should be local */}
        <FormItem
          name="date"
          label="Date"
          value={dateToString(form.date)}
          type="Date"
          onChange={onChange}
        />
        <FormItem
          name="customReportingDate"
          label="Reporting Date?"
          type="checkbox"
          checked={form.customReportingDate}
          onChange={onChange}
        />
        {form.customReportingDate ? (
          <FormItem
            name="reportingDate"
            label="Reporting Date"
            value={dateToString(form.reportingDate)}
            type="Date"
            onChange={onChange}
          />
        ) : null}
        <FormItem
          name="currency"
          value={form.currency}
          label="Currency"
          onChange={onChange}
        />
        <FormItem
          name="location"
          value={form.location}
          label="Location"
          onChange={onChange}
        />
        <FormItem
          name="category"
          label="Category"
          inputItem={categorySelect()}
        />
        <FormItem
          name="subcategory"
          label="Sub-categgory"
          inputItem={subcategorySelect()}
        />
        <FormItem name="to" value={form.to} label="To" onChange={onChange} />
        <FormItem
          name="amount"
          label="Cost"
          value={form.amount}
          type="Number"
          step="0.01"
          onChange={onChange}
          autoComplete="off"
        />
        <FormItem
          name="details"
          value={form.details}
          label="Description"
          onChange={onChange}
        />
        <FormItem
          name="project"
          value={form.project}
          label="Project"
          onChange={onChange}
        />

        <div css={tw`w-full`}>
          <div css={tw`w-4/5 mx-auto flex flex-row justify-around`}>
            {id ? (
              <EditButtonContainer>
                <AddButton type="submit">Edit Item</AddButton>
              </EditButtonContainer>
            ) : (
              <React.Fragment>
                <div style={{ width: "40%" }} className="hide-on-mobile" />
                <AddButtonContainer>
                  <AddButton type="submit">Add Item</AddButton>
                </AddButtonContainer>
              </React.Fragment>
            )}
            {id && (
              <div css={tw`w-1/2 pl-1`}>
                <button
                  onClick={handleDelete}
                  css={tw`w-full shadow bg-red-500 hover:bg-red-300 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded`}
                  type="button"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </AddItemContainer>
  );
};

export default AddEditBudgetItem;
