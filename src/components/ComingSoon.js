import React from 'react';

import { Image } from 'antd';
import ComingSoonSVG from '../assets/img/comingsoon.svg';

const ComingSoon = (props) => {
	return (
		<div className={'comingsoonContainer'}>
			<div className={'comingsoon'}>
				<Image src={ComingSoonSVG} preview={false} />
				<br />
				We are in active development of this feature and you should be able to
				use this soon.
				<br />
				Thank you for your patience.
			</div>
		</div>
	);
};

export default ComingSoon;
