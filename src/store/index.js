import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { loadState, saveState } from './persistence';

const persistedState = loadState();
let store = createStore(reducers, persistedState, applyMiddleware(thunk));

// saving state to localStorage on every change
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
