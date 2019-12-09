import React from "react"
import styled from "styled-components";
import { signIn } from "./Auth";
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
  font-family: 'Julius Sans One', sans-serif;

  @media (max-width: ${ props => props.theme.breakpoint }) {
    font-size: 2rem;
    padding: 1.5rem;
    font-weight: 400;
  }
`

const LoginButton = styled.button`
  display: flex;
  background-color: ${ props => props.theme.accentOne };
  color: ${ props => props.theme.textInverse };
  font-size: 1.5rem;
  align-items: center;
  border-radius: 9999px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  font-weight: 600;
  padding: 1.25rem 2.5rem;
`;

const LoginButtonContainer = styled.div`
  display: flex;
  margin: auto;
`

const StyledLogo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
`

const Login = () => {
  return (
    <StyledLoginPage>
      <Header>Pocket Budget</Header>
      <StyledLogo>
        <Logo width={350} height={350} />
      </StyledLogo>
      <LoginButtonContainer>
        <LoginButton onClick={signIn}>
          Login
        </LoginButton>
      </LoginButtonContainer>
    </StyledLoginPage>
  );
};

export default Login;
