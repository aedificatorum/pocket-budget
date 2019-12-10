import React from "react";
import styled from "styled-components";

const localStorageKeys = [
  "default_currency",
  "default_location",
  "default_project"
];

const admin = ({ categories }) => {
  const removeDefaults = () => {
    localStorageKeys.forEach(k => {
      localStorage.removeItem(k);
    });
  };

  const AdminContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 2rem 10rem;
    justify-content: space-around;
    font-size: 1.125rem;
  `;

  const StyledButton = styled.button`
    background-color: ${props => props.theme.accentOne};
    color: ${props => props.theme.textInverse};
    padding: 1rem;
    margin-top: 3rem;
    border-radius: .5rem;
    :hover {
    background-color: ${props => props.theme.accentTwo};
    color: ${props => props.theme.textNormal};
    }
  `;

  return (
    <AdminContainer>
      <section>
        <h2 style={{ fontSize: "1.5rem" }}>Categories</h2>
        {categories.map((category, i) => {
          return (
            <ul key={i}>
              <li>{category.name}</li>
            </ul>
          );
        })}
      </section>
      <section>
        <h2 style={{ fontSize: "1.5rem" }}>Defaults (Local Storage)</h2>
        {localStorageKeys.map(k => {
          return (
            <div key={k}>
              {k}:{localStorage.getItem(k)}
            </div>
          );
        })}
        <StyledButton onClick={removeDefaults}>Remove Defaults</StyledButton>
      </section>
    </AdminContainer>
  );
};

export default admin;
