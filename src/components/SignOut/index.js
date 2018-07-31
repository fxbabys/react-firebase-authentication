import React from 'react'

import { auth } from '../../firebase'

const SignOutButton = () =>
    <button
        type="button"
        onClick={auth.doSignOut}
        className = "button is-danger is-link"
    >
        Sign Out
    </button>

export default SignOutButton