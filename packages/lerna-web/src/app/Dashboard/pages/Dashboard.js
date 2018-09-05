// @flow
import React from 'react'

import { compose } from '@utils/compose'
import { withRouter } from '@adapters/react-router.js'

type Props = {}

type State = {}

class Dashboard extends React.PureComponent<Props, State> {
  render () {
    return (
      <h1>Dashboard</h1>
    )
  }
}

export default compose(withRouter)(Dashboard)
