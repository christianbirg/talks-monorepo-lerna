// @flow
import * as React from 'react'

import { compose } from '@utils/compose'
import { withRouter, redirectTo, type RouterParams } from '@adapters/react-router.js'
import { login } from '@services/AuthService.js'

type Props = {
  ...RouterParams
}

type State = {
  email: string
}

class Login extends React.PureComponent <Props, State> {
  constructor (props) {
    super(props)
    this.state = {
      email: ''
    }

    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  render () {
    return (
      <React.Fragment>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <input type='text' name='email' placeholder='Email' value={this.state.value} onChange={this.handleEmailChange} />
          <button type='submit'>Submit</button>
        </form>
      </React.Fragment>
    )
  }

  handleSubmit (event) {
    login(this.state)
    redirectTo(this.props, '/')
    event.preventDefault()
  }

  handleEmailChange (event) {
    this.setState({ email: event.target.value })
  }
}

export default compose(withRouter)(Login)
