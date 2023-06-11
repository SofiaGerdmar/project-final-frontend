/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import { API_URL } from 'utils/urls';
// import { Destinations } from './Destinations';
// import styled from 'styled-components/macro';
// import { LocationSubpage } from './LocationSubpage';

// const StyledDropdownMenu = styled.ul`
// display: none;
// `
// const StyledDropdown = styled.li`
// &.open .dropdown-menu {
//     display: block;
//   }
// `
export const Header = () => {
  const { location } = useParams;
  const [siteData, setSiteData] = useState([]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(API_URL(`sites/${location}`), options)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data && data.body) {
          setSiteData(data.body)
        }
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  }, [location]);

  if (!siteData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <nav>
        <Link to="/">
          <img src="" alt="" />
        </Link>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/destinations">Destinations</NavLink>
        <a href="mailto:sofia.gerdmar@gmail.com" target="_blank" rel="noreferrer">Contact</a>
        <NavLink to="/information">Useful information</NavLink>
        <Link to="/login">Sign in/Sign up</Link>
      </nav>
      {/* {location && <LocationSubpage location={location} />} */}
    </>
  );
};