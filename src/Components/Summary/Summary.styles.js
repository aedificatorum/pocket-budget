import styled from "styled-components";

export const StyledTable = styled.div`
margin: 0 1rem 3rem 1rem;

/* Header */
& > div:first-child {
  display: flex;
  justify-content: space-around;
  padding: 1rem 0 1rem 0;
  border-bottom: solid darkgrey 0.125rem;
  margin-bottom: 1rem;
  font-weight: bold;

  @media (min-width: ${props => props.theme.breakpoint}) {
    div {
      width: 11%;
    }
    div:nth-child(-n + 4) {
      width: 6%;
    }
    /* admin buttons */
    div:nth-last-child(-n + 2) {
      width: 5%;
    }
  }
  @media (max-width: ${props => props.theme.breakpoint}) {
    div {
      width: 30%;
    }
  }
}
/* Rows */
& > div:not(:first-child):nth-child(even) {
  background-color: ${props => props.theme.accentTwo};
}

& > div:not(:first-child) > div {
  display: flex;

  @media (max-width: ${props => props.theme.breakpoint}) {
    padding-left: 1rem;

    & > div:last-child {
      display: flex;
      justify-content: flex-end;
    }
  }

  div {
    display: flex;
    align-items: center;
  }

  @media (min-width: ${props => props.theme.breakpoint}) {
    div {
      padding: 0.25rem;
      width: 11%;
    }
    div:nth-child(-n + 4) {
      width: 6%;
    }
    /* admin buttons */
    div:nth-last-child(-n + 2) {
      width: 5%;
    }
  }
  @media (max-width: ${props => props.theme.breakpoint}) {
    div {
      width: 30%;
      padding: 0.8rem 0 0.8rem 0;
    }
  }
}
`;

export const StyledButton = styled.button`
padding: 0.25rem 0.5rem;
margin: 0.25rem;
border-radius: 0.5rem;
:hover {
  color: ${props => props.theme.accentOne};
}
`;