/**
 * Agate styled labeled Heading components and behaviors
 *
 * @example
 * <Heading
 *   size="large"
 *   spacing="small"
 * >
 *   A Content Section Heading
 * </Heading>
 *
 * @module agate/Heading
 * @exports Heading
 * @exports HeadingBase
 * @exports HeadingDecorator
 */

import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {HeadingBase as UiHeadingBase} from '@enact/ui/Heading';

import Skinnable from '../Skinnable';

import componentCss from './Heading.module.less';

/**
 * A labeled Heading component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [Heading]{@link agate/Heading.Heading}.
 *
 * @class HeadingBase
 * @memberof agate/Heading
 * @ui
 * @public
 */
const HeadingBase = kind({
	name: 'Heading',

	propTypes: /** @lends agate/Heading.HeadingBase.prototype */ {
		/**
		 * Set a custom color to be used by the Heading when `size` is "title".
		 * Defaults to the current accent color if none is specified.
		 *
		 * @type {String}
		 * @public
		 */
		color: PropTypes.string,

		css: PropTypes.object,

		/**
		 * Adds a horizontal-rule (line) under the component
		 *
		 * @type {Boolean}
		 * @public
		 */
		showLine: PropTypes.bool,

		/**
		 * The size of the spacing around the Heading.
		 *
		 * Allowed values include:
		 * * `'auto'` - Value is based on the `size` prop for automatic usage.
		 * * `'title'` - Specifically assign the `'title'` spacing.
		 * * `'large'` - Specifically assign the `'large'` spacing.
		 * * `'medium'` - Specifically assign the `'medium'` spacing.
		 * * `'small'` - Specifically assign the `'small'` spacing.
		 * * `'none'` - No spacing at all. Neighboring elements will directly touch the Heading.
		 *
		 * @type {('auto'|'title'|'large'|'medium'|'small'|'none')}
		 * @default 'auto'
		 * @public
		 */
		spacing: PropTypes.oneOf(['auto', 'title', 'large', 'medium', 'small', 'none'])
	},

	defaultProps: {
		spacing: 'auto'
	},

	styles: {
		css: componentCss,
		className: 'heading'
	},

	computed: {
		className: ({showLine, styler}) => styler.append({showLine}),
		style: ({color, style}) => ({
			...style,
			'--agate-heading-accent': color
		})
	},

	render: ({css, ...rest}) => {
		delete rest.color;
		delete rest.showLine;
		return UiHeadingBase.inline({css, ...rest});
	}
});

/**
 * Applies Agate specific behaviors to [HeadingBase]{@link agate/Heading.HeadingBase}.
 *
 * @hoc
 * @memberof agate/Heading
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const HeadingDecorator = compose(
	Pure,
	Skinnable
);

/**
 * A labeled Heading component, ready to use in Agate applications.
 *
 * `Heading` may be used as a header to group related components.
 *
 * Usage:
 * ```
 * <Heading
 *   spacing="medium"
 * >
 *   Related Settings
 * </Heading>
 * <CheckboxItem>A Setting</CheckboxItem>
 * <CheckboxItem>A Second Setting</CheckboxItem>
 * ```
 *
 * @class Heading
 * @memberof agate/Heading
 * @extends agate/Heading.HeadingBase
 * @mixes agate/Heading.HeadingDecorator
 * @ui
 * @public
 */
const Heading = HeadingDecorator(HeadingBase);

export default Heading;
export {
	Heading,
	HeadingBase,
	HeadingDecorator
};
