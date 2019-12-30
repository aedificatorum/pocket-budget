import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BottomNavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0.75rem;
  position: fixed;
  bottom: 0;
  background-color: white;
  border-top: 0.0625rem solid lightgrey;
  box-shadow: 0px 0 5px rgba(0, 0, 0, 0.2);

  @media (min-width: ${props => props.theme.breakpoint}) {
    display: none;
  }
`;

const StyledLink = styled(Link)`
  display: flex;
  margin: auto;
  font-weight: 600;
`;

export const BottomNavigation = () => {
  return (
    <BottomNavigationContainer>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/fullform">Add</StyledLink>
      <StyledLink to="/overview">Overview</StyledLink>
    </BottomNavigationContainer>
  );
};
