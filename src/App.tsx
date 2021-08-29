import React, { FC, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter, Switch } from 'react-router-dom';

import Header from './components/layouts/Header';
import SignUp from './views/SignUp';
import SignIn from './views/SignIn';
import ForgotPassword from './views/ForgotPassword';
import Home from './views/Home';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';
import firebase from './firebase/config'
import { getUserById, setLoading, setNeedVerification } from './store/actions/authActions';
import { RootState } from './store';

const App: FC = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state: RootState) => state.auth)

  // Check if user exists
  useEffect(() => {
    dispatch(setLoading(true))
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true))
        await dispatch(getUserById(user.uid))
        if (!user.emailVerified) {
          dispatch(setNeedVerification())
        }
      }
      dispatch(setLoading(false))
    })

    return () => {
      unsubscribe()
    }
  }, [dispatch])

  if (loading) {
    return <p>Loading</p>
  }

  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <PrivateRoute path="/" component={Home} exact />
        <PublicRoute path="/signup" component={SignUp} exact />
        <PublicRoute path="/signin" component={SignIn} exact />
        <PublicRoute path="/forgot-password" component={ForgotPassword} exact />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
