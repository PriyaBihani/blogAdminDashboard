const loggingReduxMiddleware = (store) => (next) => (action) => {
	if (process.env.REACT_APP_USE_ENV === 'development')
		console.info('Dispatching Action: ', action.type, action);
	next(action);
};

export default loggingReduxMiddleware;
