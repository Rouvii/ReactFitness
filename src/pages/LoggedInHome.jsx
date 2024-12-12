import React from 'react';

import styled from "styled-components";

export default function LoggedInHome() {


  return (
    <HomeContainer>
     
      <TopImage></TopImage>
      <LowerPart></LowerPart>
    </HomeContainer>
  );
}

// Styled Components

const HomeContainer = styled.div`
  display: grid;
  grid-template-rows: 80px auto 1fr auto 50px;
  grid-template-columns: 1fr 4fr 1fr;
  height: 100vh;
  grid-template-areas:
    "header header header"
    "left-aside banner right-aside"
    "left-aside main right-aside"
    "left-aside low-content right-aside"
    "footer footer footer";
  grid-gap: 10px;
  padding: 10px;
`;



const TopImage = styled.div`
  grid-area: banner;
`;

const LowerPart = styled.div`
  grid-area: main;
`;