import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import './App.css';
import PlaylistGenerator from './components/PlaylistGenerator';
import LoginScreen from './components/LoginScreen';
import PlaylistPreviewScreen from './components/PlaylistPreview/';
import SuccessScreen from './components/SuccessScreen/';
import { Container } from './components/basic/Container';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { initialStore } from './store/initialStore';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';

const App: React.FC = () => {
  const history = createBrowserHistory();
  const store = configureStore(initialStore);

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Container>
          <Route exact path="/login" component={LoginScreen} />
          <Route exact path="/generate" component={PlaylistGenerator} />
          <Route exact path="/preview" component={PlaylistPreviewScreen} />
          <Route exact path="/success" component={SuccessScreen} />
          <Route exact path="/" render={redirect} />
        </Container>
      </ConnectedRouter>
    </Provider>
  );
}

const getHashParams = (): { [key: string]: string } => {
  const hashParams: { [key: string]: string } = {};
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
  if (getHashParams().access_token) {
    return redirectToGenerator();
  }
  return redirectToLogin();
}

const redirectToLogin = () => {
  const redirectLink = `/login`;

  return (<Redirect to={redirectLink} />)
}

const redirectToGenerator = () => {
  const { access_token } = getHashParams();
  const redirectLink = `/generate#${access_token}`;

  return (<Redirect to={redirectLink} />)
}


export default App;
