import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
import _ from "lodash";
import FormItem from "./FormItem";
import { getItem, addItem, updateItem, removeItem } from "../Store";
import { ISODateStringToTicks, ticksToISODateString, getTodayTicks } from "../../Utils/dateUtils";
import {
  StyledDropDown,
  FormContainer,
  AddButtonContainer,
  StyledButton,
  SecondaryStyledButton,
} from "./AddEditBudgetItem.styles";
import DropdownArrow from "./DropdownArrow";
import { useSetNavMenuItems } from "../Provider/NavMenuItemsContext";
import { localStorageKeys } from "../Admin";

const Test = styled.div`
  display: flex;
`;

const FilterButton = styled.div`
  margin-right: 0.25rem;
  margin-top: 0.25rem;
  padding: 0.25rem;
  color: white;
  height: 40px;
  width: 40px;
  position: absolute;
  right: 0;
  top: 0;
`;

const getCategoriesFromAccounts = (accounts) => {
  const grouped = _.groupBy(accounts, "category");
  const categories = _.flatMap(grouped, (item) => {
    return {
      name: item[0].category,
      subcategories: item.map((i) => i.name),
      isIncome: item[0].isIncome ? true : false,
    };
  });
  return _.sortBy(categories, "name");
};

const DEFAULT_CURRENCY = "default_currency";
const DEFAULT_LOCATION = "default_location";
const DEFAULT_PROJECT = "default_project";

const AddEditBudgetItem = ({ id, returnAction, accounts, initialAccountId, initialTo }) => {
  const categories = getCategoriesFromAccounts(accounts);
  const setMenuItems = useSetNavMenuItems();
  // TODO: Default account id from storage?
  const accountDetails = {
    category: accounts[0].category,
    name: accounts[0].subcategory,
  };
  if (initialAccountId) {
    const account = accounts.find((a) => a.accountId === initialAccountId);
    accountDetails.category = account.category;
    accountDetails.subcategory = account.name;
  }

  const [form, setValues] = useState({
    dateTicks: getTodayTicks(),
    reportingDateTicks: getTodayTicks(),
    currency: "USD",
    location: "New York",
    ...accountDetails,
    to: initialTo || "",
    amount: "",
    details: "",
    project: "",
    customReportingDate: false,
  });

  const handleDelete = async () => {
    if (window.confirm("Are you sure?")) {
      await removeItem(id);
      returnAction();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If the custom reporting date box was unchecked, make it equal the date
    const formItems = { ...form };
    if (!form.customReportingDate) {
      formItems.reportingDateTicks = formItems.dateTicks;
    }

    // Map cat/subcat to accounts
    const accountId = accounts.find((account) => {
      return account.name === formItems.subcategory && account.category === formItems.category;
    }).accountId;

    // TODO: Remove when we remove cat/subcat from store
    if (!accountId) {
      throw new Error("That accountId does not exist!");
    }

    formItems.details = formItems.details.trim();

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

  const onChange = (e) => {
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
      [e.target.name]: val,
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
      setValues((f) => {
        return {
          ...f,
          currency: localStorage.getItem(DEFAULT_CURRENCY) || f.currency,
          location: localStorage.getItem(DEFAULT_LOCATION) || f.location,
          project: localStorage.getItem(DEFAULT_PROJECT) || f.project,
        };
      });
    }
  }, [id, initialAccountId, accounts]);

  useEffect(() => {
    setMenuItems([
      <FilterButton
        onClick={() => {
          localStorageKeys.forEach((k) => {
            localStorage.removeItem(k);
          });
        }}
      >
        <svg
          fill="none"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </FilterButton>,
    ]);

    return () => {
      setMenuItems([]);
    };
  }, [setMenuItems]);

  const categorySelect = () => {
    // If the form is initializing do nothing
    if (!categories.length) {
      return null;
    }

    return (
      <div style={{ position: "relative" }}>
        <StyledDropDown
          id="form-category"
          onChange={(e) => setValues({ ...form, category: e.target.value })}
          value={form.category}
        >
          {categories
            ? categories.map((c) => {
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

    const category = categories.find((c) => c.name === form.category);
    if (!category) {
      throw new Error("Category on the record does not exist in the database");
    }

    // Are we re-rendering because category changed?  If so might need to change subcategory
    if (!category.subcategories.find((subcategory) => subcategory === form.subcategory)) {
      setValues({ ...form, subcategory: category.subcategories[0] });
    }

    return (
      <div style={{ position: "relative" }}>
        <StyledDropDown
          id="form-subcategory"
          onChange={(e) => setValues({ ...form, subcategory: e.target.value })}
          value={form.subcategory}
        >
          {category.subcategories.map((subcategory) => {
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
            setValues((old) => {
              return { ...old, customReportingDate: !old.customReportingDate };
            })
          }
        />
      </div>
      <FormItem name="currency" value={form.currency} label="Currency" onChange={onChange} />
      <FormItem name="location" value={form.location} label="Location" onChange={onChange} />
      <FormItem name="category" label="Category" inputItem={categorySelect()} />
      <FormItem name="subcategory" label="Sub-category" inputItem={subcategorySelect()} />
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
      <Test>
        <FormItem name="details" value={form.details} label="Description" onChange={onChange} />
        <FormItem name="project" value={form.project} label="Project" onChange={onChange} />
      </Test>

      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "80%",
            margin: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <div style={{ width: "40%" }} className="hide-on-mobile" />
          <AddButtonContainer>
            {!id ? (
              <StyledButton type="submit">Add Item</StyledButton>
            ) : (
              <>
                <SecondaryStyledButton style={{ marginRight: ".5rem" }} onClick={handleDelete}>
                  Delete
                </SecondaryStyledButton>
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
