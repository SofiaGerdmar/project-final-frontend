
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import styled from 'styled-components/macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { SpinnerImg } from 'components/SpinnerImg';

library.add(faAngleRight, faAngleLeft)

const StyledDiv = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-top: 160px;

@media (min-width: 1025px) {
  margin-top: 200px;
}

@media (max-width: 667px) {
  margin-top: 50px;
}
`
const StyledH1 = styled.h1`
font-size: 1.5rem;
margin-bottom: 20px;
`
const StyledImg = styled.img`
width: 92%;
`
const StyledContainerTop = styled.div`
padding: 10px;

@media (min-width: 1025px) {
  padding: 20px;
}
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

@media (min-width: 1025px) {
  width: 60%;
}

@media (max-width: 667px) {
  width: 100%;
}
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

@media (min-width: 1025px) {
  width: 60%;
}

@media (min-width: 668px) and (max-width: 1023px) {
  width: 70%;
  hyphens: auto;
}

@media (max-width: 667px) {
  width: 90%;
  hyphens: auto;
}
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
  const [currentLocation, setCurrentLocation] = useState('');
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

        const response1 = await fetch(API_URL(`sites/${location}`), options);
        const data1 = await response1.json();

        if (data1 && data1.success) {
          setSiteData(data1.body)
          setCurrentLocation(data1.body.length > 0 ? data1.body[0].location : '');
        } else {
          throw new Error(data1.body.message);
        }

        const response2 = await fetch(API_URL('sites'), options);
        const data2 = await response2.json();

        if (data2 && data2.body) {
          setLocations(data2.body);
          setCurrentLocationIndex(data2.body.findIndex((loc) => loc.location === location));
        }
      } catch (error) {
        setFetchError(error.message)
      } finally {
        setLoading(false)
      }
    };

    fetchData();
  }, [location]);

  const handlePreviousLocation = () => {
    const previousLocationIndex = (currentLocationIndex - 1 + locations.length) % locations.length;

    if (previousLocationIndex >= 0 && previousLocationIndex < locations.length) {
      const previousLocation = locations[previousLocationIndex]; // Get the previous location object
      navigate(`/${previousLocation.location}`);
    }
  };

  const getPreviousLocationName = () => {
    const previousLocationIndex = (currentLocationIndex - 1 + locations.length) % locations.length;
    if (previousLocationIndex >= 0 && previousLocationIndex < locations.length) {
      return locations[previousLocationIndex].location; // Use location for display
    }
    return '';
  };

  const handleNextLocation = () => {
    const nextLocationIndex = (currentLocationIndex + 1) % locations.length;

    if (nextLocationIndex >= 0 && nextLocationIndex < locations.length) {
      const nextLocation = locations[nextLocationIndex]; // Get the next location object
      navigate(`/${nextLocation.location}`);
    }
  };

  const getNextLocationName = () => {
    const nextLocationIndex = (currentLocationIndex + 1) % locations.length;
    if (nextLocationIndex >= 0 && nextLocationIndex < locations.length) {
      return locations[nextLocationIndex].location; // Use location for display
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

  let content;
  if (loading) {
    content = <SpinnerImg />
  } else if (fetchError) {
    content = <p>Error: {fetchError}</p>;
  } else {
    content = (
      <section>
        {siteData.map((site) => (
          <StyledDiv key={site._id}>
            <StyledH1>{currentLocation}</StyledH1>
            <StyledPolaroid>
              <StyledContainerTop />
              <StyledImg src={site.img} alt={site.name} />
              <StyledContainerBottom />
              <StyledH4>{site.name}.</StyledH4>
              <StyledByline>{getBylineForLocation(location)}</StyledByline>
            </StyledPolaroid>
            <StyledP>{site.description}</StyledP>
          </StyledDiv>
        ))}
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
  }

  return <section>{content}</section>
};