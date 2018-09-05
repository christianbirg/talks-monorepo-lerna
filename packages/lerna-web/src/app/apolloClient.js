// @flow
import config from 'config'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink, Observable } from 'apollo-link'

import { getItem } from '@adapters/local-storage'

const cache = new InMemoryCache({
  addTypename: false
})

const httpLink = new HttpLink({
  uri: `${config.serverUrl}/graphql`
})

const request = (operation) => {
  const AUTHORIZATION_TOKEN = getItem('Authorization')
  if (AUTHORIZATION_TOKEN) {
    operation.setContext({
      headers: {
        Authorization: AUTHORIZATION_TOKEN
      }
    })
  }
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer)
          })
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    })
)

const errorLink = onError(({ response, operation, graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )
    // sendToLoggingService(graphQLErrors)
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
    if (`${networkError}` === 'TypeError: Failed to fetch') {
      // HTTP 403, probably autohorization expired
      console.info('logout')
    }
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    requestLink,
    httpLink
  ]),
  cache
})

window.__APOLLO_CLIENT__ = client

export { client }
