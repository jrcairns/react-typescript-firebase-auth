import React, { FC, useState, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { signin, setError } from '../../store/actions/authActions'
import { RootState } from '../../store'

const SignIn: FC = () => {
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
        e.preventDefault();
        if(error) {
          dispatch(setError(''));
        }
        setLoading(true);
        dispatch(signin({ email, password }, () => setLoading(false)))
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                {error && <p>{error}</p>}
                <input type="email" name="email" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="Email address" />
                <input type="password" name="password" value={password} onChange={e => setPassword(e.currentTarget.value)} placeholder="Password" />
                <p><Link to="/forgot-password">Forgot password</Link></p>
                <button disabled={loading}>{loading ? "Loading..." : "Sign In"}</button>
            </form>
        </div>
    )
}

export default SignIn