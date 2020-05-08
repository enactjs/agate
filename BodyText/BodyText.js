/**
 * Agate styled text block components and behaviors.
 *
 * @example
 * <BodyText centered>Hello Enact!</BodyText>
 *
 * @module agate/BodyText
 * @exports BodyText
 * @exports BodyTextBase
 * @exports BodyTextDecorator
 */

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import UiBodyText from '@enact/ui/BodyText';
import Pure from '@enact/ui/internal/Pure';

import {MarqueeDecorator} from '@enact/ui/Marquee';
import Skinnable from '../Skinnable';

import componentCss from './BodyText.module.less';

// Create a Marquee using BodyText as the base
 const MarqueeBodyText = MarqueeDecorator(UiBodyText);

/**
 * A simple text block component.
 *
 * This component is most often not used directly but may be composed within another component as it
 * is within [BodyText]{@link agate/BodyText.BodyText}.
 *
 * @class BodyTextBase
 * @memberof agate/BodyText
 * @extends ui/BodyText.BodyText
 * @ui
 * @public
 */
const BodyTextBase = kind({
	name: 'BodyText',

	propTypes: /** @lends agate/BodyText.BodyTextBase.prototype */ {
		/**
		 * Centers the contents.
		 *
		 * Applies the `centered` CSS class which can be customized by
		 * [theming]{@link /docs/developer-guide/theming/}.
		 *
		 * @type {Boolean}
		 * @public
		 */
		centered: PropTypes.bool,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `bodyText` - The root class name
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Toggles multi-line (`false`) vs single-line (`true`) behavior. `noWrap` mode
		 * automatically enables {@link ui/Marquee} so long text isn't permanently occluded.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noWrap: PropTypes.bool,

		/**
		 * Sets the text size to one of the preset sizes.
		 * Available sizes: 'large' (default) and 'small'.
		 *
		 * @type {('small'|'large')}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.oneOf(['small', 'large'])

	 },

	defaultProps: {
		noWrap: false,
		size: 'large'
	},

	styles: {
		css: componentCss,
		publicClassNames: 'bodyText'
	},

	computed: {
		 className: ({noWrap, size, styler}) => styler.append(size, {noWrap})
	},

	render: ({centered, css, noWrap, ...rest}) => {
		delete rest.size;

		if (noWrap) {
			return (
				<MarqueeBodyText
					component="div" // Assign a new component to BodyText, since DIV is not allowed inside a P tag (the default for BodyText)
					marqueeOn="render"
					{...rest}
					alignment={centered ? 'center' : null} // Centering Marquee
					centered={centered} // Centering UiBodyText
					css={css}
				/>
			);
		}
		return (
			<UiBodyText
				{...rest}
				centered={centered}
				css={css}
			/>
		);
	}
});

/**
 * Applies Agate specific behaviors to [BodyText]{@link agate/BodyText.BodyTextBase}.
 *
 * @hoc
 * @memberof agate/BodyText
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const BodyTextDecorator = compose(
	Pure,
	Skinnable
);

/**
 * A simple text block component, ready to use in Agate applications.
 *
 * `BodyText` may be used to display a block of text and is sized and spaced appropriately for a
 * Agate application.
 *
 * Usage:
 * ```
 * <BodyText>
 *  I have a Ham radio. There are many like it, but this one is mine.
 * </BodyText>
 * ```
 *
 * @class BodyText
 * @memberof agate/BodyText
 * @extends agate/BodyText.BodyTextBase
 * @mixes agate/BodyText.BodyTextDecorator
 * @ui
 * @public
 */
const BodyText = BodyTextDecorator(BodyTextBase);

export default BodyText;
export {
	BodyText,
	BodyTextBase,
	BodyTextDecorator
};
