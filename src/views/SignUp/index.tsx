import React, { FC, useState, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { signup, setError } from '../../store/actions/authActions'
import { RootState } from '../../store'

const SignUp: FC = () => {
    const [firstName, setFirstName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { error } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setError(''))
            }
        }
    }, [error, dispatch])

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        dispatch(signup({ email, password, firstName }, () => setLoading(false)))
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                {error && <p>{error}</p>}
                <input type="text" name="firstName" value={firstName} onChange={e => setFirstName(e.currentTarget.value)} placeholder="First name" />
                <input type="email" name="email" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="Email address" />
                <input type="password" name="password" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder="Password" />
                <button disabled={loading}>{loading ? "Loading..." : "Sign Up"}</button>
            </form>
        </div>
    )
}

export default SignUp