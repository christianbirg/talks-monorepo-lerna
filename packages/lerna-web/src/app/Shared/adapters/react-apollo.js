// @flow
import * as React from 'react'
import {
  Query as ApolloQuery,
  Mutation as ApolloMutation,
  type Query as ApolloQueryType,
  type Mutation as ApolloMutationType,
  type ApolloError,
  type MutationFunction
} from 'react-apollo'
// import { type DocumentNode } from 'graphql'

import { Loader } from '@utils/states'
import { notifyOnError } from '@adapters/reactToastify'

// @SEE: https://www.apollographql.com/docs/react/essentials/queries.html#props
type QueryProps<T, V> = {
  ...ApolloQueryType<T, V>,
  children: ({
    loading: boolean,
    data: any,
    networkStatus: any,
    refetch: () => Promise<mixed>,
    error: ApolloError | typeof undefined,
  }) => React.Node,
  query: () => DocumentNode,
}

// @SEE: https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-networkStatus
export const APOLLO_NETWORK_STATUS = {
  LOADING: 1,
  SET_VARIABLES: 2,
  FETCH_MORE: 3,
  REFETCH: 4,
  // 5 is unused
  POLL: 6,
  READY: 7,
  ERROR: 8
}

// @SEE: https://www.apollographql.com/docs/react/essentials/queries.html
export const Query = ({ children, ...queryProps }: QueryProps<any, any>) => {
  return (
    <ApolloQuery {...queryProps} notifyOnNetworkStatusChange errorPolicy='all'>
      {({ loading, error, data, networkStatus, refetch }) => {
        if (error) {
          handleQueryError(error, queryProps)
        }

        if (!error && (loading || networkStatus > APOLLO_NETWORK_STATUS.READY)) {
          return <Loader />
        }

        // @IMPORTANT: react-apollo's "data" isn't a normal object, so we make that, otherwise you can't do "data.hasOwnProperty"
        data = { ...data }

        return children({ loading, data, networkStatus, refetch, error })
      }}
    </ApolloQuery>
  )
}

const handleQueryError = (error, queryProps) => {
  const queryName =
    queryProps.query.definitions[0].name.kind === 'Name'
      ? queryProps.query.definitions[0].name.value
      : null

  if (!queryName) {
    notifyOnError({ message: error.message })
  } else {
    notifyOnError({ message: `[${queryName}]: ${error.message}` })
  }
}

// @SEE: https://www.apollographql.com/docs/react/essentials/mutations.html#props
type MutationProps<T, V> = {
  ...ApolloMutationType<T, V>,
  children: (
    MutationFunction<T, V>,
    { data: any, loading: boolean, called: boolean, error: ApolloError | typeof undefined }
  ) => React.Node,
  mutation: DocumentNode,
}

// @SEE: https://www.apollographql.com/docs/react/essentials/mutations.html
export const Mutation = ({ children, ...mutationProps }: MutationProps<any, any>) => {
  return (
    <ApolloMutation {...mutationProps} errorPolicy='all'>
      {(mutateFn, { data, loading, called, error }) => {
        if (error) {
          notifyOnError({ message: error.message })
        }

        return children(mutateFn, { data, loading, called, error })
      }}
    </ApolloMutation>
  )
}
