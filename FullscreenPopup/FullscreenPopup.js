/**
 * A Fullscreen Popup.
 *
 * @module agate/FullscreenPopup
 * @exports FullscreenPopup
 * @exports FullscreenPopupBase
 * @exports FullscreenPopupDecorator
 */

import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Transition from '@enact/ui/Transition';

import PopupState from '../Popup/PopupState';
import Skinnable from '../Skinnable';

import componentCss from './FullscreenPopup.module.less';

/**
 * TBD.
 *
 * @class FullscreenPopupBase
 * @memberof agate/FullscreenPopup
 * @ui
 * @public
 */
const FullscreenPopupBase = kind({
	name: 'FullscreenPopup',
	propTypes: /** @lends agate/FullscreenPopup.FullscreenPopupBase.prototype */ {
		css: PropTypes.object,
		direction: PropTypes.string,
		duration: PropTypes.string,
		noAnimation: PropTypes.bool,
		onHide: PropTypes.func,
		open: PropTypes.bool,
		type: PropTypes.string
	},

	defaultProps: {
		direction: 'down',
		duration: 'short',
		noAnimation: false,
		open: false,
		type: 'slide'
	},

	styles: {
		css: componentCss,
		className: 'fullscreenPopup'
	},

	computed: {
		className: ({styler}) => styler.append('enact-fit')
	},

	render: ({children, className, css, direction, duration, noAnimation, onHide, open, type, ...rest}) => {

		return (
			<Transition
				className={className}
				css={css}
				direction={direction}
				duration={duration}
				noAnimation={noAnimation}
				onHide={onHide}
				type={type}
				visible={open}
			>
				<div
					{...rest}
				>
					{children}
				</div>
			</Transition>
		);
	}
});

/**
 * Applies Agate specific behaviors to [FullscreenPopupBase]{@link agate/FullscreenPopup.FullscreenPopupBase}.
 *
 * @hoc
 * @memberof agate/FullscreenPopup
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const FullscreenPopupDecorator = compose(
	Skinnable({prop: 'skin'}),
	PopupState
);

/**
 * TBD.
 *
 * @class FullscreenPopup
 * @memberof agate/FullscreenPopup
 * @extends agate/FullscreenPopup.FullscreenPopupBase
 * @mixes agate/FullscreenPopup.FullscreenPopupDecorator
 * @ui
 * @public
 */
const FullscreenPopup = FullscreenPopupDecorator(FullscreenPopupBase);

export default FullscreenPopup;
export {
	FullscreenPopup,
	FullscreenPopupBase,
	FullscreenPopupDecorator
};
