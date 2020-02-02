import styled from "styled-components";

export const Container = styled.div`
  max-width: 24rem;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
`;

export const CategoryList = styled.li`
  /* margin-bottom: .5rem; */
`;

export const CategoryButton = styled.button`
  font-weight: 600;
  padding: 1rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-radius: 0.5rem;
  font-variant: small-caps;
  padding-left: 2rem;
  padding-right: 2rem;
  font-size: 1.1rem;
`;

export const AccountList = styled.ul`
  margin-left: 3.5rem;
  margin-right: 3.6rem;
  border-radius: 0.5rem;

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
