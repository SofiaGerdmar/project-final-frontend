/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import styled from 'styled-components/macro';
import { SpinnerImg } from 'components/SpinnerImg';

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

@media (min-width: 1025px) {
  height: 1000px;
  font-size: 1.2rem;
  margin-top: 200px;
  flex-wrap: wrap;
  align-content: space-around;
}

@media (max-width: 667px) {
  column-count: 1;
  height: auto;
  margin-top: 20px;
}
`
const StyledUl = styled.ul`
list-style-type: disc;
color: #5a9daf;

@media (max-width: 667px) {

}
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
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedLocations = new Set();
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const response = await fetch(API_URL('sites'), options);
        const data = await response.json();

        if (data && data.body) {
          const uniqueLocations = [];
          data.body.forEach((location) => {
            if (!fetchedLocations.has(location.location)) {
              fetchedLocations.add(location.location);
              uniqueLocations.push({
                name: location.location
              });
            }
          });
          setLocations(uniqueLocations);
        } else {
          throw new Error(data.body.message);
        }
      } catch (error) {
        setFetchError(error.message)
      } finally {
        setLoading(false)
      }
    };
    fetchData();
  }, []);

  let content;
  if (loading) {
    content = <SpinnerImg />
  } else if (fetchError) {
    content = <p>Error: {fetchError}</p>;
  } else {
    content = (
      <>
        {locations.map((location) => (
          <div key={location.name}>
            <StyledUl>
              <li>
                <StyledLink to={`/${location.name}`}>{location.name}</StyledLink>
              </li>
            </StyledUl>
          </div>
        ))}
      </>
    );
  }

  return <StyledSection>{content}</StyledSection>
};