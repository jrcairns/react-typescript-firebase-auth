import React, { FC, useState, FormEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { sendPasswordResetEmail, setError, setSuccess } from '../../store/actions/authActions'
import { RootState } from '../../store'

const ForgotPassword: FC = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { error, success } = useSelector((state: RootState) => state.auth)

    useEffect(() => {
        return () => {
            if (error) {
                dispatch(setError(''))
            }
            if (success) {
                dispatch(setSuccess(''))
            }
        }
    }, [error, dispatch, success])

    const submitHandler = async (e: FormEvent) => {
        e.preventDefault()
        setLoading(true)
        await dispatch(sendPasswordResetEmail(email, "Email sent"))
        setLoading(false)
    }
    return (
        <div>
            <form onSubmit={submitHandler}>
                {error && <p>{error}</p>}
                {success && <p>{success}</p>}
                <input type="email" name="email" value={email} onChange={e => setEmail(e.currentTarget.value)} placeholder="Email address" />
                <button disabled={loading}>{loading ? "Loading..." : "Send password reset email"}</button>
            </form>
        </div>
    )
}

export default ForgotPassword