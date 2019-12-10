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

  @media (max-width: ${props => props.theme.breakpoint}) {
    width: 100%;
  }

  @media (min-width: ${props => props.theme.breakpoint}) {
    display: flex;
    margin: auto;
    margin-bottom: 0.75rem;
    width: 80%;
  }
`;

const LabelStyled = styled.div`
  display: block;
  color: ${props => props.theme.textNormal};
  text-align: right;
  width: 40%;
  padding-right: 1rem;
  align-self: center;
  font-weight: 600;

  @media (max-width: ${ props => props.theme.breakpoint }) {
    display: none;
  }
`

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
        id={id}
        label={label}
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
      <LabelStyled
        htmlFor={id}
      >
        {label}
      </LabelStyled>
      <div style={{ width: "100%", padding: "0 1rem" }}>{inputElement()}</div>
    </InputContainer>
  );
};

export default FormItem;
