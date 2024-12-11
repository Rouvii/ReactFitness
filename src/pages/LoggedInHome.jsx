import styled from 'styled-components';

export default function LoggenInHome() {
  return (
    <HomeContainer>
      <TopImage>
        
      </TopImage>
      <LowerPart>
       
      </LowerPart>
    </HomeContainer>
  );
} 

// Styled Components

const HomeContainer = styled.div`
    display: grid;
  grid-template-rows: 80px auto 1fr; auto  50px;
  grid-template-columns: 1fr 4fr 1fr;
  height: 100vh;
  grid-template-areas:
  "header header header"
  "left-aside banner right-aside"
  "left-aside main right-aside"
  "left-aside low-content right-aside";
  "footer footer footer";
  grid-gap: 10px; padding: 10px;
  font-weight: 600; font-size: 20px;
`;

const TopImage = styled.div`
  width: 100%;
  max-width: 1000px;
  margin-bottom: 20px;
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const LowerPart = styled.div`
  display: flex;
  width: 100%;
  max-width: 1000px;
`;





const StyledLink = styled.a`
  text-decoration: none;
  color: #4c5c63;
  font-size: 18px;
  font-weight: bold;
  display: block;
  transition: color 0.3s;

  &:hover {
    color: #4c5c63;
  }
`;

const MainContent = styled.div`
  flex: 2;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-left: 20px;
  font-size: 24px;
  color: #333;
`;
//ye