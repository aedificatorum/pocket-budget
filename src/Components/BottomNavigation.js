import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { signOut } from "./Auth";

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

const ButtonStyle = styled.div`
  display: flex;
  align-items: center;

  border: 0.0625rem solid white;
  border-radius: 0.25rem;
  padding: 0.25rem;
`;

const SvgStyle = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  fill: currentColor;
`;

const FloatingMenu = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row-reverse;

  & > div:first-child {
    background-color: #ffffff;
    height: 100%;
    width: 70%;
    box-shadow: 0px 0 15px rgba(0, 0, 0, 1);
    padding: 1.5rem;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
  }
  & > div:nth-child(2) {
    background-color: #ffffff;
    opacity: 0.8;
    width: 30%;
  }
`;

const TextStyle = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;

  a {
    display: inline-block;
    font-weight: 400;
    font-size: 1.125rem;
    font-family: "arial";
    padding: 0.5rem;
  }
`;

export const BottomNavigation = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Quick Add", path: "/quickadd" },
    { name: "Add", path: "/fullform" },
    { name: "Overview", path: "/overview" },
    { name: "Summary", path: "/summary" },
    { name: "Admin", path: "/admin" },
  ];

  return (
    <BottomNavigationContainer>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/quickadd">Quick Add</StyledLink>
      <StyledLink to="/overview">Overview</StyledLink>
      <ButtonStyle onClick={() => setIsExpanded(true)}>
        <SvgStyle viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </SvgStyle>
      </ButtonStyle>
      {isExpanded && (
        <FloatingMenu>
          <TextStyle>
            {links.map(link => {
              return (
                <Link key={link.name} onClick={() => setIsExpanded(false)} to={link.path}>
                  {link.name}
                </Link>
              );
            })}
            <a href="/" onClick={signOut}>
              Log Out
            </a>
          </TextStyle>

          <div onClick={() => setIsExpanded(false)}></div>
        </FloatingMenu>
      )}
    </BottomNavigationContainer>
  );
};
