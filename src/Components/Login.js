import tw from "tailwind.macro";
/** @jsx jsx */
import { jsx } from "@emotion/core";
import { signIn } from "./Auth";
import styled from "styled-components";
import { isProperty } from "@babel/types";
import Logo from "./Logo"

const StyledLoginPage = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${ props => props.theme.accentTwo };
  height: 100vh;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${ props => props.theme.accentOne };
  color: ${ props => props.theme.textInverse };
  font-size: 2.25rem;
  padding: 2rem;
  font-weight: 600;
`

const LoginButton = styled.button`
  display: flex;
  background-color: ${ props => props.theme.accentOne };
  color: ${ props => props.theme.textInverse };
  font-size: 2rem;
  align-items: center;
  border-radius: 9999px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  font-weight: 600;
  padding: 1.25rem 2.5rem;
`;

const Login = () => {
  return (
    <StyledLoginPage>
      <Header>
        Pocket <br css={tw`md:hidden`} />
        Budget
      </Header>
      <div css={tw`flex-1 m-auto flex flex-row items-center`}>
        <Logo width={400} height={400} />
        {/* <img
          src="undraw-saving.svg"
          alt="Budget Login Logo"
          css={tw`rounded-full shadow-2xl h-32 w-32 md:h-64 md:w-64`}
        /> */}
      </div>
      <div css={tw`flex mx-auto p-12`}>
        <LoginButton
          onClick={signIn}
        >
          Login
        </LoginButton>
      </div>
    </StyledLoginPage>
  );
};

export default Login;
