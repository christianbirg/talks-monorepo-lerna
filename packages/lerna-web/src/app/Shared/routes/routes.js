import * as React from 'react'
import { Route, Redirect } from 'react-router'

import { isLoggedIn } from '@security/utils/isLoggedIn.js'

export const RouteConfig = {
  init: {
    path: '/',
    link: () => `/`
  },
  welcomePage: {
    path: '/dashboard',
    link: () => `/dashboard`
  },
  loginPage: {
    path: '/login',
    link: () => `/login`
  }
}

export const InitialRoutes = [
  <Route
    key='init'
    exact
    path={RouteConfig.init.link()}
    render={() => {
      return isLoggedIn()
        ? <Redirect to={RouteConfig.welcomePage.link()} />
        : <Redirect exact strict from='/' to={RouteConfig.loginPage.link()} />
    }}
  />
]

const Error404 = () => {
  return <h1>404</h1>
}

export const FinalRoutes = [<Route key='error-404' component={Error404} />]
