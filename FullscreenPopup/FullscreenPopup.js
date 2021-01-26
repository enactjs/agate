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
 * Usage:
 * ```
 * <FullscreenPopup open>
 *   Hello Fullscreen Popup
 * </FullscreenPopup>
 * ```
 *
 * @class FullscreenPopupBase
 * @memberof agate/FullscreenPopup
 * @extends ui/Transition.Transition
 * @ui
 * @public
 */
const FullscreenPopupBase = kind({
	name: 'FullscreenPopup',
	propTypes: /** @lends agate/FullscreenPopup.FullscreenPopupBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The animation direction of the popup.
		 *
		 * @type {String}
		 * @default 'down'
		 * @public
		 */
		direction: PropTypes.string,

		/**
		 * The transition duration of the popup.
		 *
		 * @type {Number|String}
		 * @default 'short'
		 * @public
		 */
		duration: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

		/**
		 * Disable popup transitions.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Called after the transition to hide the popup has finished.
		 *
		 * @type {Function}
		 * @public
		 */
		onHide: PropTypes.func,

		/**
		 * Displays the popup.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Type of popup.
		 *
		 * * Supported types are: `'slide'`, `'clip'`, and `'fade'`.
		 *
		 * @type {('slide'|'clip'|'fade')}
		 * @default 'slide'
		 * @public
		 */
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
