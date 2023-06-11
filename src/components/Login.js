import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/urls';
import { user } from 'reducers/user';
import styled from 'styled-components/macro';

const StyledSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;

`
const StyledDiv1 = styled.div`
display: flex;
flex-direction: row;
align-items: center;

`
const Styledh1 = styled.h1`

`
const Styledh2 = styled.h2`

`
const StyledLabel = styled.label`

`
const StyledForm = styled.form`
display: flex;
flex-direction: column;
`
const StyledInput = styled.input`
font-family: "Montserrat", sans-serif;
`
const StyledBtn = styled.button`
font-family: "Montserrat", sans-serif;
outline: none;
cursor: pointer;
`

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  useEffect(() => {
    if (accessToken) {
      navigate('/')
    }
  }, [accessToken, navigate]);

  const onFormSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    }
    fetch(API_URL(mode), options)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setAccessToken(data.response.accessToken))
          dispatch(user.actions.setUsername(data.response.username))
          dispatch(user.actions.setUserId(data.response.id))
          dispatch(user.actions.setError(null))
        } else {
          dispatch(user.actions.setAccessToken(null))
          dispatch(user.actions.setUsername(null))
          dispatch(user.actions.setUserId(null))
          dispatch(user.actions.setError(data.response))
          if (data.response === 'Credentials do not match') {
            alert('No account found. Please sign up.')
          }
        }
      })
  }
  return (
    <StyledSection>
      <Styledh1>Save your favorite places</Styledh1>
      <Styledh2>Create an account or log in to save your wishlist</Styledh2>
      <Styledh2>Do you already have an account?</Styledh2>
      <StyledDiv1>
        {/* Change to link */}
        <label className="container" htmlFor="login">Sign in
          <input
            type="radio"
            id="login"
            checked={mode === 'login'}
            onChange={() => setMode('login')} />
          <span className="checkmark" />
        </label>
        {/* Change to button */}
        <label className="container" htmlFor="register">Sign up
          <input
            type="radio"
            id="register"
            checked={mode === 'register'}
            onChange={() => setMode('register')} />
          <span className="checkmark" />
        </label>
      </StyledDiv1>
      <StyledForm onSubmit={onFormSubmit}>
        <StyledLabel htmlFor="username">Username:</StyledLabel>
        <StyledInput
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <StyledLabel htmlFor="password">Password:</StyledLabel>
        <StyledInput
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <StyledBtn type="submit">Submit</StyledBtn>
      </StyledForm>
    </StyledSection>
  )
}