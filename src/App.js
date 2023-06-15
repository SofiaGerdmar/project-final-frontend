import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { Destinations } from 'components/Destinations';
import { Header } from 'components/Header';
import { LocationSubpage } from 'components/LocationSubpage';
import { Login } from 'components/Login';
import { NotFound } from 'components/NotFound';
import { StartPage } from 'components/StartPage';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { likes } from 'reducers/likes';
import { user } from 'reducers/user';

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer,
    likes: likes.reducer
  });
  const store = configureStore({ reducer })
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/:location" element={<LocationSubpage />} />
          <Route path="/destinations" element={<Destinations />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
