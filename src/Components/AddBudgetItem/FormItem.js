import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";

const FormItem = ({ label, value, name, type = "text", onChange, checked }) => {
  const id = "form-" + name;

  const inputElement = type === "checkbox" ? (
    <input
      css={tw`bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
      id={id}
      type={type}
      name={name}
      onChange={onChange}
      checked={checked}
    />
  ) : (
    <input
      css={tw`bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500`}
      id={id}
      type={type}
      value={value}
      name={name}
      onChange={onChange}
    />
  );

  return (
    <div css={tw`md:flex md:items-center mb-6 md:w-1/2`}>
      <div css={tw`md:w-1/5`}>
        <label
          css={tw`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4`}
          htmlFor={id}>
          {label}
        </label>
      </div>
      <div css={tw`md:w-2/3`}>
        {inputElement}
      </div>
    </div>
  )
};

export default FormItem;