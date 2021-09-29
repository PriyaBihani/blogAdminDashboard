import { createStore, applyMiddleware } from 'redux';

import rootReducer from './rootReducer';
import loggingReduxMiddleware from './reduxLoggingMiddleware';

export const store = createStore(
	rootReducer,
	applyMiddleware(loggingReduxMiddleware)
);
