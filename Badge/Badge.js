import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Skinnable from '../Skinnable';

import css from './Badge.module.less';

const BadgeBase = kind({
	name: 'Badge',

	propTypes: {
		bgColor: PropTypes.string,
		color: PropTypes.string
	},

	styles: {
		css,
		className: 'badge'
	},

	computed: {
		style: ({bgColor, color, style}) => ({
			...style,
			'--agate-badge-bg-color': bgColor,
			'--agate-badge-color': color
		})
	},

	render: (props) => {
		delete props.bgColor;
		delete props.color;

		return (
			<div {...props} />
		);
	}
});

const BadgeDecorator = Skinnable;

const Badge = BadgeDecorator(BadgeBase);

export default Badge;
export {
	Badge,
	BadgeBase,
	BadgeDecorator
};
