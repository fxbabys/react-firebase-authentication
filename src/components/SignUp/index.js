import React, { Component } from 'react'
import {
    Link,
    withRouter
} from 'react-router-dom'
import { auth, db } from '../../firebase'
import * as routes from '../../constants/routes'

const SignUpPage = ({ history }) =>
    <div className="sign-page">
        <h1>SignUp</h1>
        <SignUpForm history={history} />
    </div>

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
}

const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value
})

class SignUpForm extends Component {
    constructor (props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }
    onSubmit = event => {
        const {
            username,
            email,
            passwordOne
        } = this.state

        const { history } = this.props

        auth.doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                db.doCreateUser(authUser.user.uid, username, email)
                .then(() => {
                    this.setState({ ...INITIAL_STATE })
                    history.push(routes.HOME)
                })
                .catch(error => {
                    this.setState(byPropKey('error', error))
                })
            })
            .catch(error => {
                this.setState(byPropKey('error', error))
            })
        event.preventDefault()
    }

    render () {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === ''

        return (
            <form onSubmit={this.onSubmit} className="sign-form">
                <input
                    type="text"
                    value={username}
                    onChange={event => this.setState(byPropKey('username', event.target.value))}
                    placeholder="Full Name"
                    className="input is-primary"
                />
                <input
                    type="text"
                    value={email}
                    onChange={event => this.setState(byPropKey('email', event.target.value))}
                    placeholder="Email Address"
                    className="input is-primary"
                />
                <input
                    type="password"
                    value={passwordOne}
                    onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                    placeholder="Password"
                    className="input is-primary"
                />
                <input
                    type="password"
                    value={passwordTwo}
                    onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                    placeholder="Confirm Password"
                    className="input is-primary"
                />
                <button type="submit" disabled={isInvalid} className="button is-link">
                    Sign Up
                </button>
                { error && <p style={{color: 'red'}}>{error.message}</p> }
            </form>
        )
    }
}

const SignUpLink = () =>
    <p>
        Don't have an account ?
        {' '}
        <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>

export default withRouter(SignUpPage)

export {
    SignUpForm,
    SignUpLink
}