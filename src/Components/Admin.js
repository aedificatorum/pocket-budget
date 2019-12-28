import React from "react";
import styled from "styled-components";
import { bulkUpdate } from "../Components/Store/firebaseStore";

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
    h2 {
      font-size: 1.75rem;
    }

    @media (max-width: ${props => props.theme.breakpoint}) {
      margin: 1rem 2rem;
      font-size: 1rem;
      height: 500px;
      flex-direction: column;
      h2 {
        font-size: 1.25rem;
      }
    }
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
    @media (max-width: ${props => props.theme.breakpoint}) {
      margin-top: 2rem;
      padding: .75rem;
    }
  `;

  const BorderStyle = styled.div`
    border: .125rem solid ${props => props.theme.textNormal};
    margin-top: .5rem;
    margin-bottom: .5rem;
  `

  return (
    <AdminContainer>
      <section>
        <h2>Categories</h2>
        <BorderStyle></BorderStyle>
        {categories.map((category, i) => {
          return (
            <ul key={i}>
              <li>{category.name}</li>
            </ul>
          );
        })}
      </section>
      <section>
        <h2>Defaults (Local Storage)</h2>
        <BorderStyle></BorderStyle>
        {localStorageKeys.map(k => {
          return (
            <div key={k}>
              {k}:{localStorage.getItem(k)}
            </div>
          );
        })}
        <StyledButton onClick={removeDefaults}>Remove Defaults</StyledButton>
      </section>
      <section>
        <h2>Bulk updates (danger!)</h2>
        <button onClick={async () => {
          await bulkUpdate();
        }}>Add Ticks Everywhere ⚡</button>
      </section>
    </AdminContainer>
  );
};

export default admin;
