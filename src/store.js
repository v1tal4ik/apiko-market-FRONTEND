import { createStore, compose } from 'redux';
import rootReducer from './modules';

const createAppStore = () => {
  const store = createStore(
    rootReducer,
    compose(
      window.devToolsExtension
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : noop => noop,
    ),
  );

  return store;
};

export default createAppStore;
