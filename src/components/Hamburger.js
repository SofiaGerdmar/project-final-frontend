/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components/macro';

const StyledHamburgerDiv = styled.div`
display: flex;
flex-direction: column;
align-items: flex-end;
margin-top: 40px;

@media (min-width: 668px) {
  display: none;
}
`
const StyledHamburgerMenuIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 30px;
  cursor: pointer;
`
const StyledMenuIconBar = styled.span`
    width: 100%;
    height: 2px;
    background-color: #000;
    transition: transform 0.3s, opacity 0.3s;

  .top-line {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(45deg) translateY(6px)' : 'none')};
  }

  .middle-line {
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
  }

  .bottom-line {
    transform: ${({ isOpen }) => (isOpen ? 'rotate(-45deg) translateY(-6px)' : 'none')};
  }
`;

const StyledMenuLinks = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px 30px 10px 30px;
  background-color: rgba(255, 250, 240, 1);;
  border: 1px solid rgba(30, 52, 56, 0.3);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: ${(props) => (props.isOpen ? 'flex' : 'none')};
  flex-direction: ${(props) => (props.isOpen ? 'column' : 'none')};
  border-radius: 5px;
  z-index: 5;
  margin-top: 10px;
  margin-right: 10px;
`;

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin-bottom: 10px;
`;

const StyledNavLink = styled(Link)`
color: #1e3438;
  text-decoration: none;
  font-weight: 400;
  padding-bottom: 5px;
  display: inline-block;
  position: relative;
  font-family: 'Poppins', sans-serif;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    height: 1px;
    background-color: #5a9daf;
    transform-origin: left;
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }
`
export const HamburgerMenuIcon = ({ isOpen, onClick, links }) => {
  return (
    <StyledHamburgerDiv>
      <StyledHamburgerMenuIcon isOpen={isOpen} onClick={onClick}>
        <StyledMenuIconBar />
        <StyledMenuIconBar />
        <StyledMenuIconBar />
        <MenuList>
          <MenuItem>
            <StyledMenuLinks isOpen={isOpen}>
              {links.map((link, index) => (
                <StyledNavLink to={link.url} key={index._id} onClick={onClick}>
                  {link.text}
                </StyledNavLink>
              ))}
            </StyledMenuLinks>
          </MenuItem>
        </MenuList>
      </StyledHamburgerMenuIcon>
    </StyledHamburgerDiv>
  );
};
