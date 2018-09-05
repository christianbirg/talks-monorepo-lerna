// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch } from 'react-router-dom'
import { injectGlobal } from 'styled-components'
import { ApolloProvider } from 'react-apollo'
import axios from 'axios'

import { doesHtmlElementExist } from '@utils/html'
import { getItem } from '@adapters/local-storage'

import { client } from './apolloClient.js'

// routes
import {
  RouteConfig as SharedRouteConfig,
  InitialRoutes,
  FinalRoutes
} from './Shared/routes/routes.js'
import { RouteConfig as LoginRouteConfig, routes as LoginRoutes } from './Login/index.js'
import { RouteConfig as DashboardRouteConfig, routes as DashboardRoutes } from './Dashboard/index.js'

// get the authentication token from local storage if it exists
const AUTHORIZATION_TOKEN = getItem('Authorization')

// Set the Authorization Header globally for all axios requests
axios.defaults.headers.common['Authorization'] = AUTHORIZATION_TOKEN || ''

const rootElement = doesHtmlElementExist(document.getElementById('root'))
  ? document.getElementById('root')
  : null

window.APP_ROUTES = {
  ...SharedRouteConfig,
  ...LoginRouteConfig,
  ...DashboardRouteConfig
}

if (rootElement) {
  ReactDOM.render(
    <div>
      <ApolloProvider client={client}>
        <HashRouter>
          <Switch>
            {[...InitialRoutes]}
            {[...LoginRoutes]}
            {[...DashboardRoutes]}
            {[...FinalRoutes]}
          </Switch>
        </HashRouter>
      </ApolloProvider>
    </div>,
    rootElement
  )
} else {
  throw new Error("no element with id 'root' present on this page")
}

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400');

  body, html, #root {
    height: 100%;
    width: 100%;
    font-size: 12px; /* important for "rem"-unit */
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.5;
  }
`
