import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import styled from "styled-components";

const InputStyled = styled.input`
  border: 0.0625rem solid ${props => props.theme.accentOne};
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.5rem;
  background-color: #edf2f7;
  :focus {
    background-color: white;
    border-color: darkgray;
  }
`;

const InputContainer = styled.div`
  margin-bottom: .75rem;
  
  @media (min-width: ${props => props.theme.breakpoint}) {
    display: flex;
    max-width: 48rem;
    margin: auto;
    margin-bottom: .75rem;
    width: 50%;
  }
`;

const FormItem = ({
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
    <InputContainer css={tw` `}>
      <div css={tw`md:w-2/3`}>{inputElement()}</div>
    </InputContainer>
  );
};

export default FormItem;
