import React from 'react';
import { BrowserRouter, Route, Redirect, Switch, RouteComponentProps } from 'react-router-dom';
import './App.css';
import PlaylistGenerator, { PlaylistPlan } from './components/PlaylistGenerator';
import LoginScreen from './components/LoginScreen';
import PlaylistPreviewScreen from './components/PlaylistPreview/';
import { createBrowserHistory } from 'history';
import { Container } from './components/basic/Container';

const App: React.FC = () => {
  const history = createBrowserHistory();
  return (
    <Container>
      <BrowserRouter>
        <Route exact path="/login" component={LoginScreen} />
        <Route exact path="/generate" component={PlaylistGenerator}/>
        <Route exact path="/preview" component={PlaylistPreviewScreen}/>
        <Route exact path="/" render={redirect} />
      </BrowserRouter>
    </Container>
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

const redirect = () => {
  if(getHashParams().access_token) {
    return redirectToGenerator();
  }
  return redirectToLogin();
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
