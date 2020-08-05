import React from 'react';
import kind from '@enact/core/kind';

import css from './Times.module.less';
import Skinnable from '../Skinnable';

/**
 * Agate-styled formatted time component.
 *
 * @class Times
 * @memberof agate/MediaPlayer
 * @ui
 * @public
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
				<time>04:00</time>
				<time>03:00</time>
			</div>
		);
	}
});

const Times = Skinnable(TimesBase);

export default Times;
export {Times, TimesBase};
