import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { withRouter } from "react-router-dom";

const quickAdd = ({ id, getItem, saveItem, returnAction, categories }) => {
  return (
    <div>
      <div css={tw`block`}>
        <button
          css={tw`md:w-1/4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold m-4 py-2 px-4 rounded`}
          type="submit">
          Yesterday
        </button>
        <button
          css={tw`md:w-1/4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold m-4 py-2 px-4 rounded`}
          type="submit">
          Today
        </button>
      </div>
      <button
        css={tw`md:w-1/4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold m-4 py-2 px-4 rounded`}
        type="submit">
        Restaurant
      </button>
      <button
        css={tw`md:w-1/4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold m-4 py-2 px-4 rounded`}
        type="submit">
        Grocery
      </button>
      <button
        css={tw`md:w-1/4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold m-4 py-2 px-4 rounded`}
        type="submit">
        Coffee
      </button>
      
    </div>
  )
};

export default withRouter(quickAdd);