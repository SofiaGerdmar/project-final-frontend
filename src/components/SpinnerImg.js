import React from 'react';
import styled, { keyframes } from 'styled-components/macro';

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const Spinner = styled.div`
  display: inline-block;
  width: 100px;
  background-image: url(../discover.png);
  background-size: cover;
  animation: ${rotateAnimation} 1s linear infinite;
`

export const SpinnerImg = () => {
  return (
    <Spinner />
  )
}