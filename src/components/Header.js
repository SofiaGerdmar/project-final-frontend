/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import { HamburgerMenuIcon } from 'components/Hamburger';

const StyledNav = styled.div`
display: flex;
justify-content: flex-end;
align-items: flex-end;
width: 100%;
font-size: 1.1rem;
position: absolute;
height: 100px;
left: 50%;
transform: translateX(-50%);

&::after {
    content: "";
    position: absolute;
    bottom: -20px;
    width: 550px;
    border-bottom: 1px solid rgba(30, 52, 56, 0.3);
}

@media (min-width: 1025px) {
  width: 90%;
  font-size: 1.3rem;
}

@media (max-width: 667px) {
  display: none;
}
`
const StyledNavLink = styled(NavLink)`
color: #5a9daf;
text-decoration: none;
font-weight: 600;
margin-left: 60px;
padding-bottom: 5px;
display: inline-block;
position: relative;

&::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 0;
    height: 1px;
    background-color: #5a9daf;
    color: #5a9daf;
    transition: width 0.3s ease;
}

&:hover::after {
  color: #5a9daf;
  width: 100%;
}
`
const StyledLink = styled.a`
color: #5a9daf;
text-decoration: none;
font-weight: 600;
margin-left: 60px;
padding-bottom: 5px;
display: inline-block;
position: relative;

&::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 0;
    height: 1px;
    background-color: #5a9daf;
    color: #5a9daf;
    transition: width 0.3s ease;
}

&:hover::after {
  color: #5a9daf;
  width: 100%;
}
`

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const headerLinks = [
    { url: '/', text: 'Home' },
    { url: '/destinations', text: 'Destinations' },
    { url: 'mailto:sofia.gerdmar@gmail.com', text: 'Contact', target: '_blank', rel: 'noreferrer' }
  ];

  return (
    <>
      <HamburgerMenuIcon isOpen={isOpen} onClick={handleClick} links={headerLinks} />
      <StyledNav>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/destinations">Destinations</StyledNavLink>
        <StyledLink href="mailto:sofia.gerdmar@gmail.com" target="_blank" rel="noreferrer">Contact</StyledLink>
      </StyledNav>
    </>
  );
};