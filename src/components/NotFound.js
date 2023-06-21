import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const StyledSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 280px;
`
const StyledImg = styled.img`
width: 200px;
`
const StyledBtn = styled.button`
margin: 50px;
font-family: "Poppins", sans-serif;
outline: none;
cursor: pointer;
color: #1e3438;
`
const StyledP = styled.p`
margin: 40px 30px 0 30px;
color: #1e3438;
`
export const NotFound = () => {
  return (
    <StyledSection>
      <StyledImg src="../discover.png" />
      <StyledP>Sorry, page not found</StyledP>
      <StyledBtn as={Link} to="/">Go back
      </StyledBtn>
    </StyledSection>
  )
}