import styled from "styled-components";

export const Container = styled.div`
  max-width: 24rem;
  padding: 1.5rem;
  margin: auto;

  @media (max-width: ${props => props.theme.breakpoint}) {
    width: 90%;
  }
`;

export const CategoryList = styled.li`
  margin-bottom: 1rem;
`;

export const CategoryButton = styled.button`
  font-weight: 600;
  padding: 0.5rem;
  width: 100%;
  border-radius: 0.5rem;
  background-color: ${props => props.theme.accentTwo};
`;

export const AccountList = styled.ul`
  margin-left: 1.5rem;
  margin-top: 1rem;
  margin-right: 1.5rem;
  background-color: lightgrey;
  border-radius: 0.5rem;

  li {
    display: flex;
    justify-content: space-between;
  }

  a {
    padding: 0.5rem;
  }

  & > li > button {
    flex-grow: 1;
    text-align: left;
    padding-left: 1rem;
  }
`;

export const ToList = styled.ul`
  margin-left: 2rem;
`;
