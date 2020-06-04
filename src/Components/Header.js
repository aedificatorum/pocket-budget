import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nav from "./Nav";

const HeaderContainer = styled.div`
  padding: 0.5rem;
  background-color: ${props => props.theme.accentOne};
  color: ${props => props.theme.textInverse};
  font-family: "Julius Sans One", sans-serif;
  font-weight: 600;
  font-size: 1.25rem;
  display: flex;
  justify-content: space-between;

  @media (min-width: ${props => props.theme.breakpoint}) {
    font-size: 2rem;
  }
`;

const FilterButton = styled.div`
  padding: 0.25rem;
  height: 40px;
  width: 40px;
`;

const Header = () => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  return (
    <>
      <HeaderContainer>
        <Link to="/">Pocket Budget</Link>
        <FilterButton
          onClick={() => {
            if (isFilterExpanded) {
              setIsFilterExpanded(false);
            } else {
              setIsFilterExpanded(true);
            }
          }}
        >
          <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>
          </svg>
        </FilterButton>
      </HeaderContainer>
      <Nav />
    </>
  );
};

export default Header;
