import React from 'react'

import { auth } from '../../firebase'

const byPropkey = (propertyName, value) => () => ({
    [propertyName]: value
})

const INITIAL_STATE = {
    passwordOne: '',
    passwordTwo: '',
    error: null
}

class PasswordChangeForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = { ...INITIAL_STATE }
    }

    onSubmit = event => {
        const { passwordOne } = this.state

        auth.doPasswordUpdate(passwordOne)
            .then(() => {
                this.setState({ ...INITIAL_STATE })
            })
            .catch(error => {
                this.setState(byPropkey('error', error))
            })

        event.preventDefault()
    }

    render () {
        const {
            passwordOne,
            passwordTwo,
            error
        } = this.state

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === ''

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    type="password"
                    value={passwordOne}
                    onChange={event => this.setState(byPropkey('passwordOne', event.target.value))}
                    placeholder="New Password"
                />
                <input
                    type="password"
                    value={passwordTwo}
                    onChange={event => this.setState(byPropkey('passwordTwo', event.target.value))}
                />
                <button disabled={isInvalid} type="submit">
                    Reset My Password
                </button>

                { error && <p>{error.message}</p> }
            </form>
        )
    }
}

export default PasswordChangeForm