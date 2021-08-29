import React, { FC } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store';
import { signout } from '../../store/actions/authActions';

const Header: FC = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { authenticated } = useSelector((state: RootState) => state.auth)

  const logoutHandler = () => {
    dispatch(signout())
  }

  return (
    <header>
      {!authenticated ? (
        <div>
          <button onClick={() => history.push('/signup')}>Sign up</button>
          <button onClick={() => history.push('/signin')}>Sign in</button>
        </div>
      ) : (
        <button onClick={logoutHandler}>Sign out</button>
      )}
    </header>
  );
}

export default Header;
