/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from 'utils/urls';

export const Destinations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
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
          const locationNames = data.body.map((location, index) => ({
            name: location.location,
            key: `${location.location}_${index}`
          }));
          setLocations(locationNames);
        }
      });
  }, []);

  return (
    <>
      {locations.map((location) => (
        <Link to={`/${location.name}`} key={location.key}>{location.name}</Link>
      ))}
    </>
  )
}