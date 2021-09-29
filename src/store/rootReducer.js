import * as actions from './actions';

const initialState = {
	showLoader: false,
	isAuthenticated: false,
	user: null,
};

const rootReducer = (state = initialState, action = { type: '' }) => {
	switch (action.type) {
		case actions.SHOW_LOADER:
			return { ...state, showLoader: action.showLoader };

		case actions.LOGIN_USER:
			return {
				...state,
				isAuthenticated: true,
				user: action.user,
			};
		case actions.LOGOUT_USER:
			if (state.isAuthenticated) return initialState;
			else return state;
	}
};

export default rootReducer;
