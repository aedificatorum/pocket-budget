import { useContext } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { AuthStateContext } from "./AuthStateProvider";
import { signOut } from "./Auth";
import Nav from "./Nav";

const Header = ({ dataToExport }) => {
  const [authState] = useContext(AuthStateContext);

  return (
    <header>
      <div css={tw`flex flex-row object-center p-2 bg-orange-400`}>
        <img
          css={tw`flex rounded-full w-16 h-16 object-center shadow-md`}
          src={authState.userPhoto}
          alt="User Avatar"
        />
        <div css={tw`flex p-2 text-white text-lg w-4/6 items-center`}>
          <span css={tw`hidden md:inline-block mr-1`}>Welcome </span>{" "}
          {authState.userName}
        </div>
        <button css={tw`flex w-1/6`} onClick={signOut}>
          <img
            src="https://img.icons8.com/ios-glyphs/30/000000/logout-rounded-down.png"
            alt="logout-icon"
          />
        </button>
      </div>
      <Nav exportItemCount={dataToExport.length} />
    </header>
  );
};

export default Header;
