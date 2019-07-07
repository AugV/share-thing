import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as ROUTES from '../Constants/Routes';

function LoginScreen() {
  return (
    <div className="container">
      <h1>Home Page</h1>
      <p>
      {ROUTES.SIGN_IN};
      </p>
    </div>
  )
}

export default LoginScreen;