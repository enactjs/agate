/**
 * Agate styled checkbox component.
 *
 * @example
 * <Checkbox onToggle={console.log} />
 *
 * @module agate/Checkbox
 * @exports Checkbox
 * @exports CheckboxBase
 * @private
 */

import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';

import Icon from '../Icon/Icon';
import ToggleIcon from '../internal/ToggleIcon/ToggleIcon';

import css from './Checkbox.module.less';

// Imports added from sandstone
import Spottable from '@enact/spotlight/Spottable';
import Touchable from '@enact/ui/Touchable';
import Toggleable from '@enact/ui/Toggleable';
import compose from 'ramda/src/compose';
import Skinnable from '../Skinnable';

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
		children: PropTypes.string,

		// Additional prop-types
		css: PropTypes.object,
		disabled: PropTypes.bool,
		indeterminate: PropTypes.bool,
		indeterminateIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
		selected: PropTypes.bool,
		standalone: PropTypes.bool
	},

	defaultProps: {
		children: 'check',

		// Additional defaultProps
		indeterminate: false,
		indeterminateIcon: 'minus',
		selected: false
	},

	// Additional styles block
	styles: {
		css: css,
		className: 'checkbox',
		publicClassNames: true
	},

	// Additional computed block
	computed: {
		className: ({indeterminate, selected, styler}) => styler.append({selected, indeterminate}),
		children: ({indeterminate, indeterminateIcon, children}) => (indeterminate ? indeterminateIcon : children)
	},

	// Render function from Sandstone
	render: ({children, css, disabled, selected, ...rest}) => {
		delete rest.indeterminate;
		delete rest.indeterminateIcon;
		delete rest.standalone;

		return (
			<div
				{...rest}
				aria-checked={selected}
				aria-disabled={disabled}
				disabled={disabled}
				role="checkbox"
			>
				<Icon
					size="small"
					className={css.icon}
				>
					{children}
				</Icon>
			</div>
		)
	}

	// render: ({children, ...rest}) => {
	// 	return (
	// 		<ToggleIcon
	// 			{...rest}
	// 			css={css}
	// 			iconComponent={Icon}
	// 		>
	// 			{children}
	// 		</ToggleIcon>
	// 	);
	// }
});

// Compose like sandstone
const CheckboxDecorator = compose(
	Toggleable({toggleProp: 'onClick'}),
	Touchable,
	Spottable,
	Skinnable
);

// Assign variable like sandstone
const Checkbox = CheckboxDecorator(CheckboxBase);

// Sandstone-like exports
export default Checkbox;
export {
	Checkbox,
	CheckboxBase,
	CheckboxDecorator
};

// export default CheckboxBase;
// export {
// 	CheckboxBase as Checkbox,
// 	CheckboxBase
// };
