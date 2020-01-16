import styled from "styled-components";

export const StyledButton = styled.button`
  background-color: ${props => props.theme.accentOne};
  color: ${props => props.theme.textInverse};
  padding: 0.5rem;
  border-radius: 0.5rem;
  margin: auto;
  justify-content: center;
  width: 100%;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  :hover {
    background-color: ${props => props.theme.accentTwo};
    color: ${props => props.theme.textNormal};
  }
`;

export const AddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  padding-right: 1rem;
  padding-left: 1rem;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-wrap: wrap;
  max-width: 48rem;
  padding: 2rem 0;
  margin: auto;
  margin-bottom: 1rem;

  @media (max-width: ${props => props.theme.breakpoint}) {
    margin-top: 0.5rem;
  }
`;

export const StyledDropDown = styled.select`
  display: block;
  appearance: none;
  width: 100%;
  background-color: #edf2f7;
  border: 0.0625rem solid ${props => props.theme.accentOne};
  border-radius: 0.5rem;
  padding: 0.75rem;
  line-height: 1.25;
  :focus {
    background-color: ${props => props.theme.textInverse};
  }
`;
