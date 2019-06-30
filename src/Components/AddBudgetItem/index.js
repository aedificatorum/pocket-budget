import React from "react";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
/** @jsx jsx */
import { css, jsx } from "@emotion/core"

const AddBudgetItem = ({ addNewItem }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addNewItem();
  }

  return (
    <form
      onSubmit={handleSubmit}
      css={tw`w-full max-w-sm`}>
      <div css={tw`md:flex md:items-center mb-6`}>
        <div css={tw`md:w-1/3`}>
          <label css={tw`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4`} htmlFor="inline-full-name">
            Full Name
        </label>
        </div>
        <div css={tw`md:w-2/3`}>
          <input css={tw`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`} id="inline-full-name" type="text" value="Jane Doe" />
        </div>
      </div>
      <button>Add Item</button>
    </form>
  )
};

export default AddBudgetItem;
