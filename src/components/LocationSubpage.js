
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { API_URL } from 'utils/urls';

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
        <div key={site._id}>
          <img src={site.img} alt={site.name} />
          <h2>{site.name}</h2>
          <p>{site.description}</p>
        </div>
      ))}
    </section>
  );
};