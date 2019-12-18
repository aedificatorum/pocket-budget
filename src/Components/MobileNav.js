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

  border: 0.0625rem solid white;
  border-radius: 0.25rem;
  padding: .25rem;
`;

const SvgStyle = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  fill: currentColor;
`;

const TextStyle = styled.div`
  text-align: right;
  display: flex;
  flex-direction: column;
  
  a {
    display: inline-block;
    font-weight: 400;
    font-size: 1rem;
    font-family: 'arial';
    padding: 0.25rem;
  }
`;

const MobileNav = props => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { signOut } = props

  return (
    <MobileNavStyle>
      <div style={{display:"flex", justifyContent: "flex-end"}}>
        <div style={{ flexGrow: "0"}}>        
        <ButtonStyle onClick={() => setIsExpanded(e => !e)}>
          <SvgStyle viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </SvgStyle>
        </ButtonStyle>
        </div>
      </div>
      <div
       style={{display: isExpanded ? 'block' : 'none'}}
      >
        <TextStyle>
          <Link onClick={() => setIsExpanded(false)} to="/">1-Click</Link>
          <Link onClick={() => setIsExpanded(false)} to="/fullform">Add</Link>
          <Link onClick={() => setIsExpanded(false)} to="/summary">Summary</Link>
          <Link onClick={() => setIsExpanded(false)} to="/admin">Admin</Link>
          <a onClick={signOut}>Log Out</a>
        </TextStyle>
      </div>
    </MobileNavStyle>
  );
};

export default MobileNav;
