import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core"

const FormItem = ({ label, value, name, type = "text", onChange }) => {
  const id = "form-" + name;

  return (
    <div css={tw`md:flex md:items-center mb-6`}>
      <div css={tw`md:w-1/3`}>
        <label
          css={tw`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4`}
          htmlFor={id}>
          {label}
        </label>
      </div>
      <div css={tw`md:w-2/3`}>
        <input
          css={tw`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
          id={id}
          type={type}
          value={value}
          name={name}
          onChange={onChange}
        />
      </div>
    </div>
  )
};

export default FormItem;