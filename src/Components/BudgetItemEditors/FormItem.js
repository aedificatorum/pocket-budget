import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "@emotion/styled";

const InputStyled = styled.input`
  ${tw`bg-gray-200 border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-orange-500`};
`;

const FormItem = ({
  label,
  value,
  name,
  type = "text",
  step,
  onChange,
  checked,
  inputItem,
  autoComplete
}) => {
  const id = "form-" + name;

  const inputElement = () => {
    if (inputItem) {
      return inputItem;
    }
    return type === "checkbox" ? (
      <InputStyled
        id={id}
        type={type}
        name={name}
        onChange={onChange}
        checked={checked}
      />
    ) : (
      <InputStyled
        css={tw`appearance-none`}
        id={id}
        type={type}
        step={step}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={name}
        autoComplete={autoComplete}
      />
    );
  };

  return (
    <div css={tw`md:flex md:items-center md:mt-2 mb-6 md:mb-2 md:w-1/2`}>
      <div css={tw`md:w-1/5`}>
        <label
          css={tw`block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4`}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      <div css={tw`md:w-2/3`}>{inputElement()}</div>
    </div>
  );
};

export default FormItem;
