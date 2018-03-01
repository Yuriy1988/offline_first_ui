import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

function configureStore(initialState = {}) {
  const enhancers = [
    applyMiddleware(thunk),
  ];

  if (process.browser && process.env.NODE_ENV !== 'production'
    && window.__REDUX_DEVTOOLS_EXTENSION__) {
    const devTools = window.__REDUX_DEVTOOLS_EXTENSION__();
    enhancers.push(devTools);
  }

  return createStore(rootReducer, initialState, compose(...enhancers));
}

export default configureStore;
