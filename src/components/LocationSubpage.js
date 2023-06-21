
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { SpinnerImg } from './SpinnerImg';

library.add(faAngleRight, faAngleLeft)

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 160px;
`
const StyledImg = styled.img`
width: 92%;
`
const StyledContainerTop = styled.div`
padding: 10px;
`
const StyledContainerBottom = styled.div`
padding: 10px 0 0 0;
`
const StyledPolaroid = styled.div`
width: 70%;
background-color: white;
box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
margin-bottom: 35px;
display: flex;
flex-direction: column;
align-items: center;
`
const StyledH4 = styled.h4`
font-style: italic;
margin-bottom: 20px;
width: 91%;
line-height: 1.5rem;
`
const StyledByline = styled.p`
font-size: 0.8rem;
font-style: italic;
text-align: right;
position: relative;
bottom: 10px;
`
const StyledP = styled.p`
width: 600px;
text-align: justify;
line-height: 2.2rem;
margin-bottom: 40px;
word-spacing: -1px;
`
const StyledButtonDiv = styled.div`
display: flex;
justify-content: space-between;
margin-bottom: 40px;
`
const StyledArrowButtonRight = styled.button`
  background: none;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #1e3438;
`
const ArrowIcon = styled(FontAwesomeIcon)`
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
  font-size: 2rem;
  color: #1e3438;

  &:hover {
    color: #5a9daf;
  }
`
const StyledArrowButtonLeft = styled.button`
  background: none;
  border: none;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #1e3438;
`

export const LocationSubpage = () => {
  const navigate = useNavigate();
  const { location } = useParams();
  const [siteData, setSiteData] = useState([]);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
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

    fetch(API_URL('sites'), options)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.body) {
          setLocations(data.body);
          setCurrentLocationIndex(data.body.findIndex((loc) => loc.location === location));
          setIsLoading(false);
        }
      });
  }, [location]);

  if (!siteData) {
    return <SpinnerImg />;
  }

  const handlePreviousLocation = () => {
    const previousLocationIndex = (currentLocationIndex - 1 + locations.length) % locations.length;

    if (previousLocationIndex >= 0 && previousLocationIndex < locations.length) {
      const previousLocation = locations[previousLocationIndex].location;
      const encodedPreviousLocation = encodeURIComponent(previousLocation);
      navigate(`/${encodedPreviousLocation}`);
    }
  };
  const getPreviousLocationName = () => {
    const previousLocationIndex = (currentLocationIndex - 1 + locations.length) % locations.length;
    if (previousLocationIndex >= 0 && previousLocationIndex < locations.length) {
      return locations[previousLocationIndex].location;
    }
    return '';
  };

  const handleNextLocation = () => {
    const nextLocationIndex = (currentLocationIndex + 1) % locations.length;

    if (nextLocationIndex >= 0 && nextLocationIndex < locations.length) {
      const nextLocation = locations[nextLocationIndex].location;
      const encodedNextLocation = encodeURIComponent(nextLocation);
      navigate(`/${encodedNextLocation}`);
    }
  };
  const getNextLocationName = () => {
    const nextLocationIndex = (currentLocationIndex + 1) % locations.length;
    if (nextLocationIndex >= 0 && nextLocationIndex < locations.length) {
      return locations[nextLocationIndex].location;
    }
    return '';
  };

  const locationBylines = {
    Milano: 'Image by Lars Gerdmar',
    'Piazza Armerina': 'Image by Holger Uwe Schmitt, Creative Commons 4.0',
    Genoa: 'Image by Michel Ravassard, Creative Commons 3.0',
    Tuscany: 'Image by Sailko, Creative Commons 3.0',
    Barumini: 'Image by Olaf Tausch, Creative Commons 3.0',
    Ivrea: 'Image by Laurom, Creative Commons 3.0',
    'Northern Italy': 'Image by Steffen Schmitz, Creative Commons 4.0'
  };

  const getBylineForLocation = (loc) => {
    return locationBylines[loc] || '';
  };

  return (
    <section>
      {isLoading ? (
        <SpinnerImg />
      ) : (
        siteData.map((site) => (
          <StyledDiv key={site._id}>
            <StyledPolaroid>
              <StyledContainerTop />
              <StyledImg src={site.img} alt={site.name} />
              <StyledContainerBottom />
              <StyledH4>{site.name}.</StyledH4>
              <StyledByline>{getBylineForLocation(location)}</StyledByline>
            </StyledPolaroid>
            <StyledP>{site.description}</StyledP>
          </StyledDiv>
        ))
      )}
      <StyledButtonDiv>
        <StyledArrowButtonLeft onClick={handlePreviousLocation}>
          <ArrowIcon icon={faAngleLeft} /> {getPreviousLocationName()}
        </StyledArrowButtonLeft>
        <StyledArrowButtonRight onClick={handleNextLocation}>
          {getNextLocationName()} <ArrowIcon icon={faAngleRight} />
        </StyledArrowButtonRight>
      </StyledButtonDiv>
    </section>
  );
};