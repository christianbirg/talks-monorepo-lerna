// @flow
import bro from 'brototype'

import { RouteConfig as SharedRouteConfig } from '@shared/routes/routes.js'

export { withRouter } from 'react-router'

export type RouterProps = {
  match: {
    params: Object,
  },
  location: {
    state?: {
      referrer: string,
    },
  },
  history: any,
}

export const getRouteParams = (param: string | Array<string>, props: RouterProps): string => {
  return bro(props).doYouEven('match.params') ? bro(props.match.params).iCanHaz(param) : ''
}

export const redirectTo = (props: RouterProps, route: string = '', state: Object = {}) => {
  let redirectTo = ''

  if (route) {
    redirectTo = route
  } else {
    redirectTo = bro(props).doYouEven('location.state.referrer')
      ? props.location.state.referrer
      : SharedRouteConfig.welcomePage.link()
  }

  const location = {
    pathname: redirectTo,
    state: state
  }

  props.history.push(location)
}
