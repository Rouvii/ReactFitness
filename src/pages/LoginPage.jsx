import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Utils
import facade from "../util/apiFacade";

// Components
import LogIn from "../components/loginComp/LogIn";
import LoggedIn from "../components/loginComp/LoggedIn";

function LoginPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };

  const login = (user, pass) => {
    facade.login(user, pass).then(() => {
      setLoggedIn(true);
      navigate("/loggedInHome", {state: {username: user}});
    });
    console.log(user, pass);
  };

  return (
    <Container>
      <Card>
        {!loggedIn ? (
          <LogInContainer>
            <LogIn login={login} />
          </LogInContainer>
        ) : (
          <LoggedInContainer>
            <LoggedIn />
            <Button onClick={logout}>Logout</Button>
          </LoggedInContainer>
        )}
        <Footer>
          Don’t have an account? <StyledNavLink to="/register">Register</StyledNavLink>
        </Footer>
      </Card>
    </Container>
  );
}

export default LoginPage;

// Styled Components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  background: rgba(255, 255, 255, 0.9);
  width: 350px;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  padding: 20px 30px;
  text-align: center;
`;

const LogInContainer = styled.div`
  margin-bottom: 20px;
`;

const LoggedInContainer = styled.div`
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgba(70, 89, 96, 0.8);
  color: white;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #4c5c63;
  }
`;

const Footer = styled.p`
  margin-top: 20px;
  font-size: 14px;
  color: #666;
`;

const StyledNavLink = styled(NavLink)`
  color: #00cfe8;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;
