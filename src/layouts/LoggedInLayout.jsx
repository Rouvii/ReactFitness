import { NavLink, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useContext } from "react";
import { UserContext } from "../components/UserContext";

function LoggedInLayout() {
  const { username, setUsername } = useContext(UserContext);
  const location = useLocation();
  const locationState = location.state || { username: "" };

  useEffect(() => {
    if (locationState.username) {
      setUsername(locationState.username);
    }
  }, [locationState.username, setUsername]);

  return (
    <RootContainer>
      <Header>
        <Nav>
          <Title>
            BIG MUSCLES GET BIG HERE
            <br />
            <WelcomeMessage>Welcome, {username}!</WelcomeMessage>
          </Title>
          <NavLinks>
            <StyledNavLink to="/loggedInHome">Home</StyledNavLink>
            <StyledNavLink to="/">User</StyledNavLink>
            <StyledNavLink to="startsession">Start Your Session</StyledNavLink>
            <StyledNavLink to="sessions">Sessions</StyledNavLink>
            <StyledNavLink to="exercises">Exercises</StyledNavLink>
          </NavLinks>
        </Nav>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </RootContainer>
  );
}

export default LoggedInLayout;

const RootContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-image: url('/src/assets/image.png'); 
  background-size: center; 
  background-repeat: no-repeat; 
  background-position: center; 
  background-color: #e0dcdc;
  min-height: 100vh; 
`;

const Header = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
`;

const WelcomeMessage = styled.span`
  font-size: 1.2em;
  color: #61dafb;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 10px;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;

  &.active {
    font-weight: bold;
  }
`;

const Main = styled.main`
  flex: 1;
  padding: 20px;
`;