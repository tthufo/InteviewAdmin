import { createStore, combineReducers } from 'redux';
import reducers from '../reducers';

let enhanceStore = {};

if (process.env.NODE_ENV === 'development') {
  enhanceStore = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
}

export default function configureStore() {
  return createStore(
    combineReducers({
      ...reducers,
    }),
    enhanceStore,
  );
}
