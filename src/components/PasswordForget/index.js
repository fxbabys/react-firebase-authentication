import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { auth } from '../../firebase'

const PasswordForgetPage = () =>
    <div className="sign-page">
        <h1>PasswordForget</h1>
        <PasswordForgetForm />
    </div>

const byProKey = (propertyName, value) => () => ({
    [propertyName]: value
})

const INITIAL_STATE = {
    email: '',
    error: null
}

class PasswordForgetForm extends Component {
    constructor (props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }
    onSubmit = event => {
        const { email } = this.state

        auth.doPasswordReset(email)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
            })
            .catch(error => {
                this.setState(byProKey('error', error))
            })

        event.preventDefault()
    }

    render () {
        const {
            email,
            error
        } = this.state

        const isInvalid = email === ''

        return (
            <form onSubmit={this.onSubmit} className="sign-form">
                <input
                    type="text"
                    value={this.state.email}
                    onChange={event => this.setState(byProKey('email', event.target.value))}
                    placeholder="Email Address"
                    className="input is-primary"
                />
                <button disabled={isInvalid} type="submit" className="button is-link">
                    Reset My Password
                </button>

                { error && <p style={{color: 'red'}}>{error.message}</p> }
            </form>
        )
    }
}

const PasswordForgetLink = () =>
    <p>
        <Link to="/pw-forget">Forgot Password?</Link>
    </p>

export default PasswordForgetPage

export {
    PasswordForgetForm,
    PasswordForgetLink
}