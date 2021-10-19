import React, { useState, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import isOffline from './helpers/isOffline';

import Admin from './layouts/Admin';
import Loader from './components/Loader';
import AppErrorBoundary from './components/ErrorBoundary';
import NoInternetConnection from './components/NoInternetConnection';

import './assets/css/index.css';
import 'antd/dist/antd.css';

const App = () => {
	const state = useSelector((state) => state);

	const [isDeviceOffline, setisDeviceOffline] = useState(false);

	const setupOfflineDetectors = () => {
		if (isOffline()) setisDeviceOffline(true);
		window.addEventListener('offline', () => setisDeviceOffline(true));
		window.addEventListener('online', () => setisDeviceOffline(false));
	};

	useEffect(() => {
		setupOfflineDetectors();
	}, []);

	useEffect(() => {
		const script = document.createElement("script");
		script.setAttribute("src", "https://platform.twitter.com/widgets.js");
		document.body.appendChild(script);
	}, []);

	return (
		<AppErrorBoundary logoutUser={() => console.log('FUnc to logout')}>
			{isDeviceOffline && (
				<NoInternetConnection
					isDeviceOffline={isDeviceOffline}
					toggler={() => setisDeviceOffline(false)}
				/>
			)}
			<Toaster />
			{state.showLoader ? <Loader text={state.showLoader} /> : ''}
			<Switch>
				<Route path='/admin' component={Admin} />
				<Redirect from='/' to='/admin/dashboard' />
			</Switch>
		</AppErrorBoundary>
	);
};

export default App;
