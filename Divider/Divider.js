/**
 * Agate styled labeled divider components and behaviors
 *
 * @example
 * <Divider
 *   spacing="medium"
 * >
 *   A group of related components
 * </Divider>
 *
 * @module agate/Divider
 * @exports Divider
 * @exports DividerBase
 * @exports DividerDecorator
 */

import kind from '@enact/core/kind';

import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Icon from '../Icon';
import Skinnable from '../Skinnable';

import componentCss from './Divider.less';

/**
 * A labeled divider component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Divider]{@link agate/Divider.Divider}.
 *
 * @class DividerBase
 * @memberof agate/Divider
 * @ui
 * @public
 */
const DividerBase = kind({
	name: 'Divider',

	propTypes: /** @lends agate/Divider.DividerBase.prototype */ {
		/**
		 * The text for the label of the divider.
		 *
		 * A divider with no children (text content) will render simply as a horizontal line, with
		 * even spacing above and below.
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Add an optional icon to the divider. This accepts any value that [Icon]{@agate/Icon}
		 * supports.
		 *
		 * @type {String}
		 */
		icon: PropTypes.string,

		/**
		 * The size of the spacing around the divider.
		 *
		 * Allowed values include:
		 * * `'normal'` (default) - slightly larger than the standard component spacing.
		 * * `'small'` - same size as component spacing.
		 * * `'medium'` - 2x component.
		 * * `'large'` - 3x component.
		 * * `'none'` - no spacing at all. Neighboring elements will directly touch the divider.
		 *
		 * _Note:_ Spacing is separate from margin with regard to `margin-top`. It ensures a
		 * consistent distance from the bottom horizontal line. It's safe to use `margin-top` to add
		 * additional spacing above the divider.
		 *
		 * @type {String}
		 * @default 'normal'
		 * @public
		 */
		spacing: PropTypes.oneOf(['normal', 'small', 'medium', 'large', 'none']),

		/**
		 * Metadata indicating whether this divider is the start of a new "section" on the screen or
		 * just a heading/label of a sub-section.
		 *
		 * @type {Boolean}
		 */
		startSection: PropTypes.bool
	},

	defaultProps: {
		spacing: 'normal'
	},

	styles: {
		css: componentCss,
		className: 'divider',
		publicClassNames: ['divider', 'icon', 'startSection']
	},

	computed: {
		className: ({spacing, startSection, styler}) => styler.append(spacing, {startSection}),
		icon: ({css, icon}) => (icon ? <Icon small className={css.icon}>{icon}</Icon> : null)
	},

	render: ({children, css, icon, ...rest}) => {
		delete rest.spacing;
		delete rest.startSection;

		return (
			<h3 {...rest} css={css}>
				{icon}
				{children}
			</h3>
		);
	}
});

/**
 * Applies Agate specific behaviors to [DividerBase]{@link agate/Divider.DividerBase}.
 *
 * @hoc
 * @memberof agate/Divider
 * @mixes agate/Skinnable.Skinnable
 * @public
 */

const DividerDecorator = compose(
	Skinnable
);

/**
 * A labeled divider component, ready to use in Agate applications.
 *
 * `Divider` may be used as a header to group related components.
 *
 * Usage:
 * ```
 * <Divider
 *   spacing="medium"
 * >
 *   Related Settings
 * </Divider>
 * ```
 *
 * @class Divider
 * @memberof agate/Divider
 * @extends agate/Divider.DividerBase
 * @mixes agate/Divider.DividerDecorator
 * @ui
 * @public
 */
const Divider = DividerDecorator(DividerBase);

export default Divider;
export {
	Divider,
	DividerBase,
	DividerDecorator
};
