import styled from "styled-components";

export const SelectYourViewStyle = styled.div`
  select {
    display: flex;
    justifypadding: 0.6rem 1.4rem 0.5rem 0.8rem;
    background-color: #ffffff;
    margin: auto;

    @media (max-width: ${props => props.theme.breakpoint}) {
      padding: 0.5rem;
      max-width: 75%;
    }
  }
`;

export const FilterContainer = styled.div`
  font-color: dimgray;
  background-color: gainsboro;
  border-radius: 0.5rem;
  // border: 0.0625rem solid #aaaaaa;
  padding: 0.5rem;
`;
