import * as React from 'react'
import { Route } from 'react-router'

import Dashboard from './pages/Dashboard.js'

export const RouteConfig = {
  dashboard: {
    path: '/dashboard',
    link: () => `/dashboard`
  }
}

export const routes = [
  <Route
    key='dashboard'
    exact
    path={RouteConfig.dashboard.path}
    component={Dashboard}
  />
]
