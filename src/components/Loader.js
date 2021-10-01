import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Loader = (props) => {
	return (
		<div className={'loader-container'}>
			<div className={'loader'}>
				<LoadingOutlined style={{ fontSize: '7em' }} />
				<div className={'loader-text'}>
					{props.text ? props.text : 'Loading'}
				</div>
			</div>
		</div>
	);
};

export default Loader;
