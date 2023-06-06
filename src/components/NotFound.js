import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const StyledSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`
const StyledBtn = styled.button`
margin: 50px;
font-family: "Montserrat", sans-serif;
outline: none;
cursor: pointer;
`
const StyledP = styled.p`
margin: 40px 30px 0 30px;
`
export const NotFound = () => {
  return (
    <StyledSection>
      <StyledP>Sorry, page not found</StyledP>
      <StyledBtn as={Link} to="/">Go back
      </StyledBtn>
    </StyledSection>
  )
}