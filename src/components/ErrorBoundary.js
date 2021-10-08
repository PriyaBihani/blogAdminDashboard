import React from 'react';

import { Image } from 'antd';
import ErrorSVG from '../assets/img/error.svg';

class AppErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, errorMessage: '' };
	}

	componentDidCatch(error, errorInfo) {
		// Also log the user out so they have a fresh session next time.
		if (this.props.logoutUser && typeof this.props.logoutUser === 'function')
			this.props.logoutUser();

		let errorMessage = error.stack || error.toString();

		this.setState({
			hasError: true,
			errorMessage,
		});
	}
	render() {
		return this.state.hasError && this.state.errorMessage ? (
			<div className={'errorfallbackui'}>
				<Image
					width={'500px'}
					src={ErrorSVG}
					className={'errorfallbackui-image'}
					alt={'An Error Occurred.'}
					preview={false}
				/>
				<br />
				<div className={'errorfallbackui-label'}>
					An unexpected error has occurred. Please use the address bar to go to
					the home page, or reach out to us.
					<br />
					Use the following error message when you reach out to us:
					<br />
					<div
						style={{ whiteSpace: 'pre-wrap' }}
						className={'errorfallbackui-label-message'}>
						{this.state.errorMessage}
					</div>
				</div>
			</div>
		) : (
			this.props.children
		);
	}
}

export default AppErrorBoundary;
