/**
 * Agate styled checkbox component.
 *
 * @example
 * <Checkbox onToggle={console.log} />
 *
 * @module agate/Checkbox
 * @exports Checkbox
 * @exports CheckboxBase
 */

import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Toggleable from '@enact/ui/Toggleable';
import PropTypes from 'prop-types';
import React from 'react';
import compose from 'ramda/src/compose';

import Icon from '../Icon/Icon';
import Skinnable from '../Skinnable';
import ToggleIconBase from '../internal/ToggleIcon/ToggleIcon';

import css from './Checkbox.module.less';

const ToggleIconDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Spottable,
	Skinnable
);

const ToggleIcon = ToggleIconDecorator(ToggleIconBase);

/**
 * A checkbox component, ready to use in Agate applications.
 *
 * `Checkbox` may be used independently to represent a toggleable state but is more commonly used as
 * part of [CheckboxItem]{@link agate/CheckboxItem}.
 *
 * Usage:
 * ```
 * <Checkbox selected />
 * ```
 *
 * @class Checkbox
 * @memberof agate/Checkbox
 * @extends agate/internal/ToggleIcon.ToggleIcon
 * @ui
 * @private
 */
const CheckboxBase = kind({
	name: 'Checkbox',

	propTypes: /** @lends agate/Checkbox.Checkbox.prototype */ {
		/**
		 * The icon displayed when `selected`.
		 *
		 * @see {@link agate/Icon.Icon.children}
		 * @type {String|Object}
		 * @default	'check'
		 * @public
		 */
		children: PropTypes.string
	},

	defaultProps: {
		children: 'check'
	},

	render: ({children, ...rest}) => {
		return (
			<ToggleIcon
				{...rest}
				css={css}
				iconComponent={Icon}
			>
				{children}
			</ToggleIcon>
		);
	}
});

export default CheckboxBase;
export {
	CheckboxBase as Checkbox,
	CheckboxBase
};
