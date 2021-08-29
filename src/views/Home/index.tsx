import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";

const Home: FC = () => {
    const { user, needVerification, success } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (success) {
            dispatch(setSuccess(''))
        }
    },[success, dispatch])

    return (
        <div>
            {needVerification && <p>Please verifiy your email address.</p>}
            <p>Welcome {user?.firstName}</p>
        </div>
    )
}

export default Home