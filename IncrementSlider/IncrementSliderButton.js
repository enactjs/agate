import kind from '@enact/core/kind';
import Button from '../Button';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * An [Button]{@link moonstone/Button.Button} customized for
 * [IncrementSlider]{@link moonstone/IncrementSlider.IncrementSlider}. It is optimized to only
 * update when `disabled` is changed to minimize unnecessary render cycles.
 *
 * @class IncrementSliderButton
 * @memberof moonstone/IncrementSlider
 * @ui
 * @private
 */

const IncrementSliderButtonBase = kind({
	name: 'IncrementSliderButton',

	propTypes: /** @lends moonstone/IncrementSlider.IncrementSliderButton.prototype */ {
		onTap: PropTypes.func
	},

	render: ({onTap, ...rest}) => {
		return (
			<Button
				{...rest}
				backgroundOpacity="transparent"
				onTap={onTap}
				onHold={onTap}
				onHoldPulse={onTap}
				small
			/>
		);
	}
});

const OnlyUpdate = onlyUpdateForKeys(['children', 'disabled', 'spotlightDisabled', 'aria-label']);
const IncrementSliderButton = OnlyUpdate(IncrementSliderButtonBase);

export default IncrementSliderButton;
export {
	IncrementSliderButton,
	IncrementSliderButtonBase
};
