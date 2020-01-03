import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FormItem from "./FormItem";
import { getItem, addItem, updateItem, removeItem } from "../Store";
import styled from "styled-components";
import {
  ISODateStringToTicks,
  ticksToISODateString,
  getTodayTicks
} from "../../Utils/dateUtils";

const DEFAULT_CURRENCY = "default_currency";
const DEFAULT_LOCATION = "default_location";
const DEFAULT_PROJECT = "default_project";

const StyledButton = styled.button`
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

const AddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
`;

const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  max-width: 48rem;
  padding: 2rem 0;
  margin: auto;
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoint}) {
    margin-top: 0.5rem;
  }
`;

const StyledDropDown = styled.select`
  display: block;
  appearance: none;
  width: 100%;
  background-color: #edf2f7;
  border: 0.0625rem solid ${props => props.theme.accentOne};
  border-radius: 0.5rem;
  padding: 0.75rem;
  line-height: 1.25;
  :focus {
    background-color: ${props => props.theme.textInverse};
  }
`;

const SvgContainer = styled.div`
  pointer-events: none;
  position: absolute;
  display: flex;
  top: 0;
  bottom: 0;
  right: 0;
  align-items: center;
  padding: 0rem 0.5rem;
`;

const DropdownArrow = () => (
  <SvgContainer>
    <svg
      style={{ fill: "currentColor", height: "1rem", width: "1rem" }}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
    >
      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
    </svg>
  </SvgContainer>
);

const AddEditBudgetItem = ({
  id,
  returnAction,
  categories,
  accounts
}) => {
  const [form, setValues] = useState({
    dateTicks: getTodayTicks(),
    reportingDateTicks: getTodayTicks(),
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
    returnAction();
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // If the custom reporting date box was unchecked, make it equal the date
    const formItems = { ...form };
    if (!form.customReportingDate) {
      formItems.reportingDateTicks = formItems.dateTicks;
    }

    // Map cat/subcat to accounts
    const accountId = accounts.find(account => {
      return (
        account.name === formItems.subcategory &&
        account.category === formItems.category
      );
    }).accountId;

    // TODO: Remove when we remove cat/subcat from store
    if (!accountId) {
      throw new Error("That accountId does not exist!");
    }

    formItems.accountId = accountId;

    if (id) {
      await updateItem(id, formItems);
      toast.success("Item updated! 💸");
    } else {
      await addItem(formItems);
      toast.success("Item added! 🦄");
    }

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
      val = ISODateStringToTicks(val);
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
        const customReportingDate = item.reportingDateTicks !== item.dateTicks;
        
        // If the optional fields are missing add them to prevent attempting to bind
        // to undefined
        if (!item.details) item.details = "";
        if (!item.project) item.project = "";
        
        setValues({ ...item, customReportingDate });
      }
    };

    if (id) {
      getItemAsync(id);
    }
    return () => (isSubscribed = false);
  }, [id, accounts]);

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
      <div style={{ position: "relative" }}>
        <StyledDropDown
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
        </StyledDropDown>
        <DropdownArrow />
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
      <div style={{ position: "relative" }}>
        <StyledDropDown
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
        </StyledDropDown>
        <DropdownArrow />
      </div>
    );
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {/* TODO: These dates are always UTC, should be local */}
      <FormItem
        name="dateTicks"
        label="Date"
        value={ticksToISODateString(form.dateTicks)}
        type="Date"
        onChange={onChange}
      />
      <div style={{ width: "100%" }}>
        <FormItem
          name="reportingDateTicks"
          label="Reporting Date"
          value={ticksToISODateString(form.reportingDateTicks)}
          type="Date"
          onChange={onChange}
          isEnabled={form.customReportingDate}
          onToggle={() =>
            setValues(old => {
              return { ...old, customReportingDate: !old.customReportingDate };
            })
          }
        />
      </div>
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
      <FormItem name="category" label="Category" inputItem={categorySelect()} />
      <FormItem
        name="subcategory"
        label="Sub-category"
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

      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "80%",
            margin: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <div style={{ width: "40%" }} className="hide-on-mobile" />
          <AddButtonContainer>
            {!id ? (
              <StyledButton type="submit">Add Item</StyledButton>
            ) : (
              <>
                <StyledButton
                  style={{ marginRight: ".5rem" }}
                  onClick={handleDelete}
                  type="button"
                >
                  Delete
                </StyledButton>
                <StyledButton style={{ marginLeft: ".5rem" }} type="submit">
                  Edit Item
                </StyledButton>
              </>
            )}
          </AddButtonContainer>
        </div>
      </div>
    </FormContainer>
  );
};

export default AddEditBudgetItem;
