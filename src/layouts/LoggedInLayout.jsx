import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { useLocation } from 'react-router-dom';

function RootLayout() {

  const location = useLocation();
  const { username } = location.state || { username: 'Guest' };
  return (
    <RootContainer>
      <Header>
        <Nav>
          <Title>BIG MUSCLES GET BIG HERE
            <br />
           <WelcomeMessage>Welcome, {username}!</WelcomeMessage>

          </Title>
          
          <NavLinks>
            <StyledNavLink to="loggedInHome">Home</StyledNavLink>
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

export default RootLayout;

// Styled Components

const RootContainer = styled.div`
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-image: url("/src/assets/image.png");
  background-size: center;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #e0dcdc;
  min-height: 100vh;
`;

const Header = styled.header`
  background-color: rgba(
    70,
    89,
    96,
    0.8
  ); /* Semi-transparent header background */
  color: white;
  padding: 20px;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  transition: color 0.3s ease;

  &.active {
    color: #4c5c63; /* Active link color */
  }

  &:hover {
    color: #4c5c63;
  }
`;

const Main = styled.main`
  padding: 20px;
  border-radius: 8px;
  max-width: 1200px;
  margin: auto;
`;
const WelcomeMessage = styled.div`
  grid-area: header;
  font-size: 24px;
  text-align: left; /* Align text to the left */
  padding: 5px;
`;
