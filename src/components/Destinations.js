/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import styled from 'styled-components/macro';

const StyledSection = styled.section`
display: flex;
flex-direction: column;
column-count: 3;
column-gap: 20px;
height: 800px;
flex-wrap: wrap;
width: 80vw;
margin-top: 160px;
font-weight: 400;
line-height: 3.5rem;
`
const StyledUl = styled.ul`
list-style-type: disc;
color: #5a9daf;
`
const StyledLink = styled(Link)`
text-decoration: none;
color: #1e3438;
display: inline-block;
position: relative;

&::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 7px;
    width: 0;
    height: 1px;
    background-color: #5a9daf;
    transition: width 0.3s ease;
}

&:hover::after {
  width: 100%;
}
`
export const Destinations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchedLocations = new Set();
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(API_URL('sites'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.body) {
          const uniqueLocations = [];
          data.body.forEach((location) => {
            if (!fetchedLocations.has(location.location)) {
              fetchedLocations.add(location.location);
              uniqueLocations.push({
                name: location.location,
                key: `${location.location}_${uniqueLocations.length}`
              });
            }
          });
          setLocations(uniqueLocations);
        }
      })
  }, []);

  return (
    <StyledSection>
      {locations.map((location) => (
        <StyledUl>
          <li>
            <StyledLink to={`/${location.name}`} key={location.key}>{location.name}</StyledLink>
          </li>
        </StyledUl>
      ))}
    </StyledSection>
  )
}