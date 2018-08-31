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

import Skinnable from '../Skinnable';

import css from './Divider.less';

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
		spacing: PropTypes.oneOf(['normal', 'small', 'medium', 'large', 'none'])
	},

	defaultProps: {
		spacing: 'normal'
	},

	styles: {
		css,
		className: 'divider'
	},

	computed: {
		className: ({spacing, styler}) => styler.append(spacing)
	},

	render: (props) => {
		delete props.spacing;

		return (
			<h3 {...props} />
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
