import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import * as serviceWorker from './serviceWorker';
import './localization/index';
import './assets/base.scss';
import './index.scss';
import Main from './DemoPages/Main';
import configureStore from './config/configureStore';

const history = createBrowserHistory();

const store = configureStore();
const rootElement = document.getElementById('root');

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter history={history}>
        <Component />
      </HashRouter>
    </Provider>,
    rootElement,
  );
};

renderApp(Main);

if (module.hot) {
  module.hot.accept('./DemoPages/Main', () => {
    const NextApp = require('./DemoPages/Main').default; //eslint-disable-line
    renderApp(NextApp);
  });
}
serviceWorker.unregister();
