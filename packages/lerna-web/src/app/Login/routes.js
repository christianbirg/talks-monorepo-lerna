import * as React from 'react'
import { Route } from 'react-router'

import Login from './pages/Login.js'

export const RouteConfig = {
  login: {
    path: '/login',
    link: () => `/login`
  }
}

export const routes = [
  <Route
    key='login'
    exact
    path={RouteConfig.login.path}
    component={Login}
  />
]
