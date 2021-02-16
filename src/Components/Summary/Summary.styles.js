import styled from "styled-components";

export const StyledTable = styled.div`
  margin: 0 1rem 3rem 1rem;

  /* Header */
  & > div:first-child {
    display: flex;
    padding: 1rem 0 1rem 0;
    font-weight: 600;
    font-variant: small-caps;

    @media (min-width: ${(props) => props.theme.breakpoint}) {
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
    @media (max-width: ${(props) => props.theme.breakpoint}) {
      div:first-child {
        width: 22%;
      }
      div:nth-child(2) {
        width: 55%;
      }
      div:nth-child(3) {
        width: 18%;
      }
      button {
        width: 5%;
      }
    }
  }
  /* Rows */
  & > div:not(:first-child):nth-child(even) {
    // background-color: ${(props) => props.theme.accentTwo};
  }

  & > div:not(:first-child) > div {
    display: flex;
    color: hsl(0, 0%, 29%);

    @media (max-width: ${(props) => props.theme.breakpoint}) {
      & > div:last-child {
        display: flex;
        justify-content: flex-end;
      }
    }

    div {
      display: flex;
      align-items: center;
    }

    @media (min-width: ${(props) => props.theme.breakpoint}) {
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
    @media (max-width: ${(props) => props.theme.breakpoint}) {
      div {
        padding: 0.8rem 0 0.8rem 0;
      }
      div:first-child {
        width: 22%;
      }
      div:nth-child(2) {
        width: 55%;
      }
      div:nth-child(3) {
        width: 18%;
      }
      button {
        width: 5%;
      }
    }
  }
`;

export const StyledButton = styled.button`
  padding: 0.25rem 0.5rem;
  margin: 0.25rem;
  border-radius: 0.5rem;
  :hover {
    color: ${(props) => props.theme.accentOne};
  }
`;

export const StyledTableMobile = styled.div`
  margin: 0 0rem 3rem 1rem;

  .dateTitle {
    font-weight: bold;
    padding: 0.8rem 0 0.8rem 0;
  }

  .rowData {
    line-height: 1.5;
    margin: 0 0 0rem 0.5rem;

    display: flex;

    /* To */
    div:first-child {
      width: 60%;
    }

    /* Amount */
    div:nth-child(2) {
      text-align: right;
      width: 25%;
    }

    /* Button */
    div:last-child {
      width: 15%;
      justify-content: center;
      display: flex;
    }
  }
`;
