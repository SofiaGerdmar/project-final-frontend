
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import styled from 'styled-components/macro';

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
const StyledP = styled.p`
width: 600px;
text-align: justify;
line-height: 2.2rem;
`
export const LocationSubpage = () => {
  const { location } = useParams();
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
    <section>
      {siteData.map((site) => (
        <StyledDiv key={site._id}>
          <StyledPolaroid>
            <StyledContainerTop />
            <StyledImg src={site.img} alt={site.name} />
            <StyledContainerBottom />
            <StyledH4>{site.name}.</StyledH4>

          </StyledPolaroid>
          <StyledP>{site.description}</StyledP>
        </StyledDiv>
      ))}
    </section>
  );
};