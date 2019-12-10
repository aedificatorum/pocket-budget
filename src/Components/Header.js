import React, { useContext } from "react";
import styled from "styled-components";
import { AuthStateContext } from "./AuthStateProvider";
import { signOut } from "./Auth";
import Nav from "./Nav";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  background-color: ${ props => props.theme.accentOne };
  color: ${ props => props.theme.textInverse };
  font-family: 'Julius Sans One', sans-serif;

  div:first-child {
    font-weight: 600;
    flex-grow: 1;
    font-size: 1.5rem;

    @media (min-width: ${ props => props.theme.breakpoint }) {
      & {
        font-size: 2rem;
      }
    }
  }

  div:last-child {
    @media (min-width: ${ props => props.theme.breakpoint }) {
      & {
        font-size: 1.5rem;
      }
    }
  }

  div {
    display: flex;
    align-items: center;
  }
`;

const Header = ({ dataToExport }) => {
  const [authState] = useContext(AuthStateContext);

  return (
    <header>
      <HeaderContainer>
        <div>Pocket Budget</div>
        <div>
          <button onClick={signOut}>{authState.userName}</button>
        </div>
      </HeaderContainer>
      <Nav exportItemCount={dataToExport.length} />
    </header>
  );
};

export default Header;
