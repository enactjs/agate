import kind from '@enact/core/kind';
import Button from '../Button';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import React from 'react';
import PropTypes from 'prop-types';

import componentCss from './IncrementSliderButton.module.less';

/**
 * A [Button]{@link agate/Button.Button} customized for
 * [IncrementSlider]{@link agate/IncrementSlider.IncrementSlider}. It is optimized to only
 * update when `disabled` is changed to minimize unnecessary render cycles.
 *
 * @class IncrementSliderButton
 * @memberof agate/IncrementSlider
 * @ui
 * @private
 */

const IncrementSliderButtonBase = kind({
	name: 'IncrementSliderButton',

	propTypes: /** @lends agate/IncrementSlider.IncrementSliderButton.prototype */ {
		css: PropTypes.object,
		onTap: PropTypes.func,
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),
		role: PropTypes.string,

		/**
		 * The current skin for this component.
		 *
		 * @type {String}
		 * @public
		 */
		skin: PropTypes.string,
	},

	styles: {
		css: componentCss,
		className: 'incrementSliderButton'
	},

	computed: {
		className: ({orientation, role, styler}) => styler.append(orientation, role)
	},

	render: ({css, onTap, skin, ...rest}) => {
		delete rest.orientation;
		delete rest.role;
		return (
			<Button
				{...rest}
				css={css}
				onTap={onTap}
				onHold={onTap}
				onHoldPulse={onTap}
			/>
		);
	}
});

const OnlyUpdate = onlyUpdateForKeys(['children', 'disabled', 'icon', 'spotlightDisabled', 'aria-label']);
const IncrementSliderButton = OnlyUpdate(IncrementSliderButtonBase);

export default IncrementSliderButton;
export {
	IncrementSliderButton,
	IncrementSliderButtonBase
};
