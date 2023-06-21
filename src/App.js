import { Destinations } from 'components/Destinations';
import { Header } from 'components/Header';
import { LocationSubpage } from 'components/LocationSubpage';
import { NotFound } from 'components/NotFound';
import { StartPage } from 'components/StartPage';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<StartPage />} exact />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/:location" element={<LocationSubpage />} />
      </Routes>
    </BrowserRouter>
  )
}
