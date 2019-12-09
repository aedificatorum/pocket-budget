import React from "react";
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
  margin-bottom: 0.75rem;

  @media (min-width: ${props => props.theme.breakpoint}) {
    display: flex;
    max-width: 48rem;
    margin: auto;
    margin-bottom: 0.75rem;
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
    <InputContainer>
      <div style={{ width: "100%", padding: "0 1rem" }}>{inputElement()}</div>
    </InputContainer>
  );
};

export default FormItem;
