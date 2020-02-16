import styled from "styled-components";

export const SelectYourViewStyle = styled.div`
  display: flex;
  justify-content: center;

  select {
    padding: 0.6rem 1.4rem 0.5rem 0.8rem;
    background-color: #ffffff;
    border: 0.0625rem solid #aaaaaa;
    border-radius: 0.5rem;

    @media (max-width: ${props => props.theme.breakpoint}) {
      max-width: 7.5rem;
      padding: 0.3rem 0.7rem 0.25rem 0.4rem;
    }
  }
`;
