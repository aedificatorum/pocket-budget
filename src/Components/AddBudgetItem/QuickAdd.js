import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";
import { withRouter } from "react-router-dom";

const InputStyled = styled.input`
${tw`bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`};
`;

const quickAdd = ({ id, getItem, saveItem, returnAction, categories }) => {
  return (
    <div>
      <div css={tw`flex -mx-2`}>
        <button
          css={tw`w-1/2 px-2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white m-4 py-2 px-4 rounded`}
          type="submit">
          Yesterday
        </button>
        <button
          css={tw`w-1/2 px-2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white m-4 py-2 px-4 rounded`}
          type="submit">
          Today
        </button>
      </div>
      <div css={tw`flex -mx-2`}>
      <button
        css={tw`w-1/2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white m-4 py-2 px-4 rounded`}
        type="submit">
          Restaurant
      </button>
      <button
        css={tw`w-1/2 shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white m-4 py-2 px-4 rounded`}
        type="submit">
        Coffee
      </button>
      </div>
      <div css={tw`flex -mx-2`}>
      <button
        css={tw`w-1/2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white m-4 py-2 px-4 rounded`}
        type="submit">
        Grocery
      </button>
      <button
        css={tw`w-1/2 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white m-4 py-2 px-4 rounded`}
        type="submit">
        ???
      </button>
      </div>
    </div>
  )
};

export default withRouter(quickAdd);