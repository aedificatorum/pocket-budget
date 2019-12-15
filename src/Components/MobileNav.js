import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const MobileNavStyle = styled.div`
  @media (max-width: ${props => props.theme.breakpoint}) {
    display: block;
  }
  @media (min-width: ${props => props.theme.breakpoint}) {
    display: none;
  }
`;

const ButtonStyle = styled.div`
  display: flex;
  align-items: center;

  border: 0.0625rem solid black;
  border-radius: 0.25rem;
`;

const SvgStyle = styled.svg`
  height: 2rem;
  width: 2rem;
  fill: currentColor;
`;

const TextStyle = styled.div`
  font-weight: 600;
  text-align: right;

  a {
    background-color: red;
    display: block;
    padding: 0.25rem;
  }
`;

const MobileNav = props => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { signOut } = props

  return (
    <MobileNavStyle>
      <div>
        <ButtonStyle onClick={() => setIsExpanded(e => !e)}>
          <SvgStyle viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </SvgStyle>
        </ButtonStyle>
      </div>
      <div
       style={{display: isExpanded ? 'block' : 'none'}}
      >
        <TextStyle>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
          <button onClick={signOut}>Log out</button>
        </TextStyle>
      </div>
    </MobileNavStyle>
  );
};

export default MobileNav;
