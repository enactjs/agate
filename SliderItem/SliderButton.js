import kind from '@enact/core/kind';
import IconButton from '../IconButton/IconButton';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import React from 'react';
import PropTypes from 'prop-types';

/**
 * An [IconButton]{@link agate/IconButton.IconButton} customized for
 * [SliderItem]{@link agate/SliderItem.SliderItem}. It is optimized to only
 * update when `disabled` is changed to minimize unnecessary render cycles.
 *
 * @class SliderButton
 * @memberof agate/SliderItem
 * @ui
 * @private
 */

const SliderButtonBase = kind({
	name: 'SliderButton',

	propTypes: /** @lends agate/SliderItem.SliderButton.prototype */ {
		onTap: PropTypes.func
	},

	render: ({onTap, ...rest}) => {
		return (
			<IconButton
				{...rest}
				backgroundOpacity="transparent"
				onTap={onTap}
				onHold={onTap}
				onHoldPulse={onTap}
				size="small"
			/>
		);
	}
});

const OnlyUpdate = onlyUpdateForKeys(['children', 'disabled', 'spotlightDisabled', 'aria-label']);
const SliderButton = OnlyUpdate(SliderButtonBase);

export default SliderButton;
export {
	SliderButton,
	SliderButtonBase
};
