import * as actions from './actions';

export const showLoader = (showLoader) => {
	return { type: actions.SHOW_LOADER, showLoader };
};

export const loginUser = (user) => {
	return { type: actions.LOGIN_USER, user };
};

export const logoutUser = () => {
	return { type: actions.LOGOUT_USER };
};
