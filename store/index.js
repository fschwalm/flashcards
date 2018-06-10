import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import decksReducer from './reducers/decks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const middlewares = [thunk];
  return createStore(decksReducer, composeEnhancers(applyMiddleware(...middlewares)));
};

export default configureStore;
