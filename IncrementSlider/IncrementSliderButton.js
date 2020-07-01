import kind from '@enact/core/kind';
import Button from '../Button';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import React from 'react';
import PropTypes from 'prop-types';

import componentCss from './IncrementSliderButton.module.less';
import Skinnable from "../Skinnable";

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
		const buttonSize = (skin === 'silicon' ? 'small' : 'large');
		delete rest.orientation;
		delete rest.role;
		return (
			<Button
				{...rest}
				css={css}
				onTap={onTap}
				onHold={onTap}
				onHoldPulse={onTap}
				size={buttonSize}
			/>
		);
	}
});

const IncrementSliderButtonDecorator = Skinnable({prop: 'skin'}, IncrementSliderButtonBase);
const OnlyUpdate = onlyUpdateForKeys(['children', 'disabled', 'icon', 'spotlightDisabled', 'size', 'aria-label']);
const IncrementSliderButton = OnlyUpdate(IncrementSliderButtonDecorator);

export default IncrementSliderButton;
export {
	IncrementSliderButton,
	IncrementSliderButtonBase
};
