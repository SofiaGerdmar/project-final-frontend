/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable max-len */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import styled from 'styled-components/macro';
import { SpinnerImg } from 'components/SpinnerImg';

const StyledSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;

@media (max-width: 667px) {
  max-width: 100vw;
}

@media (min-width: 668px) and (max-width: 1023px) {
  max-width: 100vw;
}
`
const StyledSVG = styled.svg`
display: flex;
flex-direction: column;
align-items: center;
width: 1000px;
z-index: -1;
position: absolute;
top: 40px;

@media (max-width: 667px) {
  display: none;
}

@media (min-width: 668px) and (max-width: 1023px) {
  width: 90vw;
}
`
const StyledInput = styled.input`
background-color: rgba(250, 250, 250, 0.9);
color: black;
font-family: 'Poppins', sans-serif;
font-size: 1rem;
border: none;
border-radius: 1.3rem;
padding: 10px 5px 10px 20px;
width: 300px;
outline: #1e3438;
z-index: 1;
margin-top: 250px;

@media (max-width: 667px) {
  margin-top: 100px;
}
`
const StyledH1 = styled.h1`
font-size: 2.5rem;
font-weight: 700;
margin: 290px 0 40px 0;
z-index: 1;

@media (max-width: 667px) {
  width: 300px;
  line-height: 2.5rem;
  text-align: center;
  margin: 40px 0 40px 0;
}
`
const StyledH2 = styled.h2`
font-size: 1.2rem;
font-weight: 300;
font-style: italic;
text-align: center;
line-height: 2rem;
width: 620px;

@media (max-width: 667px) {
  width: 300px;
}
`
export const StartPage = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        };

        const response = await fetch(API_URL('sites'), options);
        const data = await response.json();

        if (data && data.success) {
          const locationNames = data.body.map((location, index) => ({
            name: location.location,
            key: `${location.location}_${index}`
          }));
          setLocations(locationNames);
        } else {
          throw new Error(data.body.message);
        }
      } catch (error) {
        setFetchError(error.message)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleLocationSelect = (event) => {
    setSelectedLocation(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (selectedLocation) {
      navigate(`/${encodeURIComponent(selectedLocation)}`);
    }
  };

  let content;
  if (loading) {
    content = <SpinnerImg />
  } else if (fetchError) {
    content = <p>Error: {fetchError}</p>;
  } else {
    content = (
      <>
        <StyledH1>Discover the gems of Italy</StyledH1>
        <StyledH2>
          Italy has a long and rich history. Thus it might not come as a surprise that it is the country with the largest number of UNESCO sites in the world. Get inspired by natural areas, archaeological sites, tourist destinations and man-made masterpieces. Welcome to discover Italy!
        </StyledH2>
        <StyledSVG version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="100%" id="blobSvg" style={{ opacity: 0.5 }}><image x="0" y="0" width="100%" height="100%" clipPath="url(#shape)" href="/rialto-bridge.jpg" preserveAspectRatio="none" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" />
              <stop offset="100%" />
            </linearGradient>
          </defs>
          <clipPath id="shape">
            <path id="blob" fill="url(#gradient)">
              <animate attributeName="d" dur="25000ms" repeatCount="indefinite" values="M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;M453.78747,319.98894Q416.97789,389.97789,353.96683,436.87838Q290.95577,483.77887,223.95577,447.43366Q156.95577,411.08845,105.64373,365.97789Q54.33169,320.86732,62.67444,252.61056Q71.01719,184.3538,113.01965,135.21007Q155.02211,86.06634,220.52211,66.46683Q286.02211,46.86732,335.5,91.94472Q384.97789,137.02211,437.78747,193.51106Q490.59704,250,453.78747,319.98894Z;M411.39826,313.90633Q402.59677,377.81265,342.92059,407.63957Q283.24442,437.46649,215.13648,432.5428Q147.02853,427.61911,82.23325,380.9572Q17.43796,334.29529,20.45223,250.83809Q23.46649,167.38089,82.5856,115.05707Q141.70471,62.73325,212.19045,63.73015Q282.67618,64.72705,352.67308,84.79839Q422.66998,104.86972,421.43486,177.43486Q420.19974,250,411.39826,313.90633Z;M440.5,320.5Q418,391,355.5,442.5Q293,494,226,450.5Q159,407,99,367Q39,327,31.5,247.5Q24,168,89,125.5Q154,83,219.5,68Q285,53,335.5,94.5Q386,136,424.5,193Q463,250,440.5,320.5Z;" />
            </path>
          </clipPath>
        </StyledSVG>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="search">
            <StyledInput type="search" id="search" name="search" placeholder="Choose your destination here" list="locationOptions" onChange={handleLocationSelect} autoComplete="off" />
            <datalist id="locationOptions">
              {locations.map((location) => (
                <option value={location.name} key={location.key}>{location.name}</option>
              ))}
            </datalist>
          </label>
          <button type="submit">Go</button>
        </form>
      </>
    );
  }

  return <StyledSection>{content}</StyledSection>;
};
