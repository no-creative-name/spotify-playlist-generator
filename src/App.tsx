import React from 'react';
import { BrowserRouter, Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import './App.css';
import PlaylistGenerator from './components/PlaylistGenerator';
import LoginScreen from './components/LoginScreen';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/generate" component={PlaylistGenerator} />
      <Route exact path="/" render={redirectToGenerator} />
    </BrowserRouter>
  );
}

const getHashParams = (): {[key: string]: string} => {
  const hashParams: {[key: string]: string} = {};
  let e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    e = r.exec(q)
  while (e) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
    e = r.exec(q);
  }
  return hashParams;
}

const redirectToLogin = () => {
  const redirectLink = `/login`;
  
  return (<Redirect to={redirectLink} />)
}

const redirectToGenerator = () => {
  const {access_token} = getHashParams();
  const redirectLink = `/generate#${access_token}`;
  
  return (<Redirect to={redirectLink} />)
}

export default App;
