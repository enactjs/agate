import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import Button from '../Button';

import componentCss from './IncrementSliderButton.module.less';

/**
 * A [Button]{@link agate/Button.Button} customized for
 * [IncrementSlider]{@link agate/IncrementSlider.IncrementSlider}. It is optimized to only
 * update when `disabled` is changed to minimize unnecessary render cycles.
 *
 * @class IncrementSliderButton
 * @memberof agate/IncrementSlider
 * @extends agate/Button
 * @ui
 * @private
 */

const IncrementSliderButtonBase = kind({
	name: 'IncrementSliderButton',

	propTypes: /** @lends agate/IncrementSlider.IncrementSliderButton.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Event handler for 'tap' pointer events
		 *
		 * @type {Function}
		 * @public
		 */
		onTap: PropTypes.func,

		/**
		 * The layout orientation of the component.
		 *
		 * @type {('horizontal'|'vertical')}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * The ARIA role for the list.
		 *
		 * @type {String}
		 * @default 'list'
		 * @public
		 */
		role: PropTypes.string,

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
		orientation: 'horizontal',
		role: 'list',
		size: 'large'
	},

	styles: {
		css: componentCss,
		className: 'incrementSliderButton'
	},

	computed: {
		className: ({orientation, role, styler}) => styler.append(orientation, role)
	},

	render: ({css, onTap, size, ...rest}) => {
		delete rest.orientation;
		delete rest.role;
		return (
			<Button
				{...rest}
				css={css}
				onTap={onTap}
				onHold={onTap}
				onHoldStart={onTap}
				size={size}
			/>
		);
	}
});

const OnlyUpdate = onlyUpdateForKeys(['aria-label', 'children', 'disabled', 'icon', 'size', 'spotlightDisabled']);
const IncrementSliderButton = OnlyUpdate(IncrementSliderButtonBase);

export default IncrementSliderButton;
export {
	IncrementSliderButton,
	IncrementSliderButtonBase
};
