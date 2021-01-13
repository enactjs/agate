/**
 * Modal component that appears at the bottom of the screen and takes up the full screen width.
 *
 * @example
 * <Popup open>Hello!</Popup>
 *
 * @module agate/Popup
 * @exports Popup
 * @exports PopupBase
 * @exports PopupDecorator
 */

import kind from '@enact/core/kind';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Button from '../Button';
import Heading from '../Heading';
import Skinnable from '../Skinnable';

import PopupState from './PopupState';

import componentCss from './Popup.module.less';


const TransitionContainer = SpotlightContainerDecorator(
	{enterTo: 'default-element', preserveId: true},
	Transition
);

const transitionDirection = {
	bottom: 'down',
	center: 'down',
	fullscreen: 'down',
	left: 'left',
	right: 'right',
	top: 'up'
};

/**
 * The base popup component.
 *
 * @class PopupBase
 * @memberof agate/Popup
 * @ui
 * @public
 */
const PopupBase = kind({
	name: 'Popup',
	propTypes: /** @lends agate/Popup.PopupBase.prototype */ {
		/**
		 * Buttons to be included within the Popup component.
		 *
		 * Typically, these buttons would be used to close or take action on the dialog.
		 *
		 * @type {Element|Element[]}
		 * @public
		 */
		buttons: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.element)
		]),

		/**
		 * Centers the contents.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		centered: PropTypes.bool,

		/**
		 * When true, popup displays a close button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		closeButton: PropTypes.bool,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `popup` - The root class name
		 * * `body` - Applied to the body content container
		 * * `popupTransitionContainer` - Applied to the Popup's outermost container. Sizing can be
		 *                                applied here for percentage-of-screen values.
		 * * `top` - Applied when the `position` is 'top'
		 * * `right` - Applied when the `position` is 'right'
		 * * `bottom` - Applied when the `position` is 'bottom'
		 * * `left` - Applied when the `position` is 'left'
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Controls how long the transition should take.
		 * Supported preset durations are: `'short'` (250ms), `'medium'` (500ms), and `'long'` (1s).
		 * `'medium'` (500ms) is default when no others are specified.
		 *
		 * @type {String}
		 * @default 'short'
		 * @public
		 */
		duration: PropTypes.string,

		/**
		 * Disables transition animation.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Called when the popup is closed.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Called after the popup's "hide" transition finishes.
		 *
		 * @type {Function}
		 * @public
		 */
		onHide: PropTypes.func,

		/**
		 * Controls the visibility of the Popup.
		 *
		 * By default, the Popup and its contents are not rendered until `open`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Sets the position of the popup on the screen.
		 *
		 * @type {('bottom'|'center'|'fullscreen'|'left'|'right'|'top')}
		 * @default 'center'
		 * @public
		 */
		position: PropTypes.oneOf(['bottom', 'center', 'fullscreen', 'left', 'right', 'top']),

		/**
		 * The current skin.
		 *
		 * @type {String}
		 * @private
		 */
		skin: PropTypes.string,

		/**
		 * The primary text of the popup.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string,

		/**
		 * The type of transition to affect the content.
		 *
		 * Supported types are: `'slide'` and `'fade'`.
		 *
		 * @type {String}
		 * @default 'fade'
		 * @public
		 */
		type: PropTypes.oneOf(['fade', 'slide'])
	},
	defaultProps: {
		centered: false,
		closeButton: false,
		duration: 'short',
		noAnimation: false,
		open: false,
		position: 'center'
	},
	styles: {
		css: componentCss,
		className: 'popup',
		publicClassNames: ['popup', 'body', 'popupTransitionContainer', 'top', 'right', 'bottom', 'left']
	},
	computed: {
		className: ({centered, closeButton, position, styler, title}) => styler.append(position, {withCloseButton: closeButton, withTitle: title, centered}),
		transitionType: ({position, type}) => {
			const setTransitionType = position === 'center' ? 'fade' : 'slide';

			return type ? type : setTransitionType;
		},
		direction: ({position}) => transitionDirection[position]
	},
	render: ({buttons, children, closeButton, css, direction, duration, noAnimation, onClose, onHide, open, skin, title, transitionType, ...rest}) => {
		const wideLayout = (skin === 'carbon');
		delete rest.centered;

		return (
			<TransitionContainer
				noAnimation={noAnimation}
				visible={open}
				direction={direction}
				duration={duration}
				type={transitionType}
				className={css.popupTransitionContainer}
				onHide={onHide}
				css={css}
			>
				<div
					role="alert"
					{...rest}
				>
					{closeButton ? <Button
						icon="closex"
						onTap={onClose}
						className={componentCss.closeButton}
						size="small"
					/> : null}
					{title ? <Heading className={css.title}>{title}</Heading> : null}
					<Layout orientation={wideLayout ? 'horizontal' : 'vertical'} className={css.body}>
						<Cell shrink={!wideLayout} className={css.content}>
							{children}
						</Cell>
						{buttons ? <Cell shrink className={css.buttons}>
							{buttons}
						</Cell> : null}
					</Layout>
				</div>
			</TransitionContainer>
		);
	}
});

/**
 * Applies Agate specific behaviors to [PopupBase]{@link agate/Popup.PopupBase}.
 *
 * @hoc
 * @memberof agate/Popup
 * @mixes ui/Slottable.Slottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const PopupDecorator = compose(
	Slottable({slots: ['closeButton', 'title', 'buttons']}),
	Skinnable({prop: 'skin'}),
	PopupState
);

/**
 * A stateful component that renders a popup in a
 * [FloatingLayer]{@link ui/FloatingLayer.FloatingLayer}.
 *
 * @class Popup
 * @memberof agate/Popup
 * @extends agate/Popup.PopupBase
 * @mixes agate/Popup.PopupDecorator
 * @ui
 * @public
 */
const Popup = PopupDecorator(PopupBase);

export default Popup;
export {
	Popup,
	PopupBase,
	PopupDecorator
};
