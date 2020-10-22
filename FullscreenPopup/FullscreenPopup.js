/**
 * A Fullscreen Popup.
 *
 * @module agate/FullscreenPopup
 * @exports FullscreenPopup
 * @exports FullscreenPopupBase
 * @exports FullscreenPopupDecorator
 */

import kind from '@enact/core/kind';
import Transition from '@enact/ui/Transition';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import PopupState from '../Popup/PopupState';
import Skinnable from '../Skinnable';

import componentCss from './FullscreenPopup.module.less';

/**
 * Full screen popup component.
 *
 * @class FullscreenPopupBase
 * @memberof agate/FullscreenPopup
 * @exports ui/Transition/Transition
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
 * Full screen popup component, ready to use in Agate applications.
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
