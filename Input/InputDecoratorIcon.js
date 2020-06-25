
import kind from '@enact/core/kind';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

import css from './Input.module.less';

/**
 * The stateless functional base component for {@link agate/Input.InputDecoratorIcon}.
 *
 * @class InputDecoratorIconBase
 * @memberof agate/Input
 * @ui
 * @private
 */
const InputDecoratorIconBase = kind({
	name: 'InputDecoratorIcon',

	propTypes: /** @lends agate/Input.InputDecoratorIconBase.prototype */ {
		/**
		 * The position of the icon. Either `before` or `after`.
		 *
		 * @type {String}
		 * @required
		 */
		position: PropTypes.oneOf(['before', 'after']).isRequired,

		/**
		 * The icon to be displayed.
		 *
		 * @see {@link agate/Icon.Icon#children}
		 * @type {String|Object}
		 */
		children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * The size of the icon.
		 *
		 * @type {('small'|'large')}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.oneOf(['small', 'large']),

		skin: PropTypes.string
	},

	styles: {
		css,
		className: 'icon'
	},

	computed: {
		className: ({position, styler}) => {
			return styler.append('icon' + (position === 'before' ? 'Before' : 'After'));
		},
		size: ({skin}) => (skin === 'silicon' ? 'small' : 'large')
	},

	render: ({children, ...rest}) => {
		delete rest.position;

		return children ? (
			<Icon {...rest}>{children}</Icon>
		) : null;
	}
});

/**
 * An icon displayed either before or after the input field of an {@link agate/Input.Input}.
 *
 * @class InputDecoratorIcon
 * @memberof agate/Input
 * @mixes agate/Skinnable.Skinnable
 * @ui
 * @private
 */

const InputDecoratorIcon = compose(
	onlyUpdateForKeys(['children', 'size']),
	Skinnable({prop: 'skin'})
)(InputDecoratorIconBase);

export default InputDecoratorIcon;
export {
	InputDecoratorIcon,
	InputDecoratorIconBase
};
