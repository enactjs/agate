import React from 'react';
import kind from '@enact/core/kind';

import Skinnable from '../Skinnable';

import css from './Times.module.less';

/**
 * Agate-styled formatted time component.
 *
 * @class Times
 * @memberof agate/MediaPlayer
 * @ui
 * @private
 */
const TimesBase = kind({
	name: 'Times',

	styles: {
		css,
		className: 'times'
	},

	render: ({...rest}) => {
		return (
			<div {...rest}>
				<time>2:40</time>
				<time>-1:28</time>
			</div>
		);
	}
});

const Times = Skinnable(TimesBase);

export default Times;
export {Times, TimesBase};
