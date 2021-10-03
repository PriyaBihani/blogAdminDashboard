import { store } from '../store/index';
import { showLoader } from '../store/actionCreator';

export default function setLoader(message = 'Loading...', callback = null) {
	store.dispatch(showLoader(message));
	if (callback) {
		callback();
	}
}
