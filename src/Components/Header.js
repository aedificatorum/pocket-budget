import { useContext } from "react";
import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Link } from "react-router-dom";
import { AuthStateContext } from "./AuthStateProvider";
import { signOut } from "./Auth";

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
      <nav css={tw`p-4 pt-6 bg-orange-200 sticky top-0`}>
        <ul css={tw`flex`}>
          <li css={tw`mr-6`}>
            <Link to="/" css={tw`text-grey-700`}>
              1-Click
            </Link>
          </li>
          <li css={tw`mr-6`}>
            <Link to="/fullform" css={tw`text-grey-700`}>
              Add
            </Link>
          </li>
          <li css={tw`md:mr-6 hidden md:inline`}>
            <Link to="/data" css={tw`text-grey-700`}>
              Export Data ({dataToExport.length})
            </Link>
          </li>
          <li css={tw`mr-6`}>
            <Link to="/summary" css={tw`text-grey-700`}>
              Summary
            </Link>
          </li>
          <li css={tw`mr-6`}>
            <Link to="/admin" css={tw`text-grey-700`}>
              Admin
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
