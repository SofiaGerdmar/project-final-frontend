# Final project – Discover Italy

A website done in React Router, MongoDB and Mongoose, displaying the 50+ UNESCO World Heritage Sites in Italy. I used a dataset from Kaggle which I modified, mainly using MongoDB Atlas, more details on that under the next header.

## The problem

The first issue I encountered was that the dataset didn't include a location name, beyond Italy. Using MongoDB Atlas, I started by adding the nearest geographical location to the site as a object property. I then filtered the backend so that only sites in Italy would be fetched to the frontend, thus minimizing the data fetched. The next issue was that the dataset lacked images, and I wanted to fetch an image dynamically for each of the 50+ sites. After finding a suitable image on Unplash.com/Wikicommons I uploaded them to Imgur. I then located the image URL of each image and created a new object property in the dataset, adding the URL as a string. It was then possible to fetch the images into a single component that controlled all the site subpages.

During the whole project my biggest struggle was with the frontend fetches, and a lot of time was spent getting the fetches to work. It seemed the data never was in the format that I expected it to be. One issue I didn't have time to solve is the loop of the location array in LocationSubpage.js. The arrows are supposed to take the user through a loop of each of the locations, but for some reason some locations are left out of the loop. Additionally, as a few of the locations have more than one site the logic of redirection doesn't work properly. All locations are accessible through the startpage or the destinations route, though.

There are several things I would do if I had the time. Originally my plan was to have an authentication feature where the user could sign up/log in to save sites to a list of favorites. I had also planned to have a weather widget for every location, together with a currency exchanger and a display of the local time on the startpage. Other features that would suit the page is restaurant recommendations for each location, using an API. Additionally I would have liked to put more time towards making the styling of the website more dynamic and interactive. I also didn't have time to make the page responsive or check its accessibility. For demo purposes I chose to start with desktop size.

I am especially proud of the image blob featured on the startpage and the fact that I was able to expand the dataset to contain images.

## View it live

https://discoveritaly.netlify.app/

## Backend

https://github.com/SofiaGerdmar/project-final-backend

https://project-final-backend.onrender.com
