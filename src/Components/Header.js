import { useContext } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { AuthStateContext } from "./AuthStateProvider";
import { signOut } from "./Auth";
import Nav from "./Nav";
import styled from 'styled-components'

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem;
  background-color: #f6ad55;
  color: white;

  div:first-child {
    font-weight: 600;
    flex-grow: 1;
    font-size: 2rem;
    margin-left: 1rem;
  }

  div:last-child {
    font-size: 1.25rem;
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
          {authState.userName}
        </div>
        {/* <button css={tw`flex w-1/6`} onClick={signOut}>
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/logout-rounded-down.png"
            alt="logout-icon"
          />
        </button> */}
      </HeaderContainer>
      <Nav exportItemCount={dataToExport.length} />
    </header>
  );
};

export default Header;
