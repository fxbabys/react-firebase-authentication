import React from 'react'

import AuthUserContext from '../AuthUserContext'
import { PasswordForgetForm } from '../PasswordForget'
import PasswordChangeForm from '../PasswordChange'
import withAuthorization from '../withAuthorization'

const AccountPage = () =>
    <AuthUserContext.Consumer>
        {
            authUser =>
                <div className="sign-page">
                    <h1>Account: {authUser.email}</h1>
                    <PasswordForgetForm />
                    <h1>Change my password</h1>
                    <PasswordChangeForm />
                </div>
        }
    </AuthUserContext.Consumer>

const authCondition = authUser => !!authUser

export default withAuthorization(authCondition)(AccountPage)