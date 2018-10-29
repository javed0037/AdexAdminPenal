import React, { Component } from 'react';
import { HashRouter, Route, Switch,Redirect } from 'react-router-dom';
import './App.scss';
import { Login, Page404, Page500, editProfile } from './views/Pages';


// Containers

import { isLoggedIn,sessionClear } from './utils/AuthService';

import { DefaultLayout } from './containers';
// Pages



// import { renderRoutes } from 'react-router-config';

class App extends Component {
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          isLoggedIn() ? (
      <Component {...props} />
          ) : (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: props.location }
        }}
      />
          )
        }
      />
    );
    return (
      <HashRouter>
        <Switch>
          
          <Route exact path="/login" name="Login Page" component={Login} />
          {/* <Route exact path="/editProfile" name="Register Page" component={editProfile} /> */}
          <Route exact path="/404" name="Page 404" component={Page404} />
          <Route exact path="/500" name="Page 500" component={Page500} />
          <Route path="/" name="Home" component={DefaultLayout} />
         
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
