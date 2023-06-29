/* eslint-disable no-undef */
import React from 'react';
import styled from 'styled-components/macro';

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
`
const StyledImg = styled.img`
  width: 200px;
  height: 200px;
  display: block;
  margin: 15px auto;
  position: relative;
  box-sizing: border-box;
  animation: rotation 2s linear infinite;

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`
export const SpinnerImg = () => {
  return (
    <StyledDiv>
      <StyledImg src="../discover.png" alt="Spinner" />
    </StyledDiv>
  )
};
