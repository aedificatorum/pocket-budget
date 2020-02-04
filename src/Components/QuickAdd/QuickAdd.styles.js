import styled from "styled-components";

export const Container = styled.div`
  max-width: 24rem;
  padding: 1.5rem 0rem 1.5rem 0;
`;

export const CategoryList = styled.li`
  padding: 0 1.5rem 0 1.5rem;
`;

export const CategoryText = styled.div`
  font-weight: 600;
  padding: 0.5rem 0 0.5rem 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 0.5rem;
  font-variant: small-caps;
  font-size: 1.1rem;
`;

export const AccountList = styled.ul`
  /* margin-left: 3.5rem;
  margin-right: 3.6rem; */

  li {
    display: flex;
  }

  a {
    padding: 0.5rem;
  }

  li > :first-child {
    flex-grow: 1;
    text-align: left;
    padding: 0.25rem;
  }
`;

export const ToList = styled.ul`
  margin-left: 1rem;
`;
