import React from "react";

const AddBudgetItem = ({addNewItem}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewItem();
  }

  return (
    <form onSubmit={handleSubmit}>
      <button>Add Item</button>
    </form>
  )
};

export default AddBudgetItem;
