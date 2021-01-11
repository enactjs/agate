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

import {on, off} from '@enact/core/dispatcher';
import {is} from '@enact/core/keymap';
import kind from '@enact/core/kind';
import Spotlight, {getDirection} from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import warning from 'warning';

import Button from '../Button';
import Heading from '../Heading';
import Skinnable from '../Skinnable';

import PopupState from './PopupState';

import componentCss from './Popup.module.less';

const isDown = is('down');
const isLeft = is('left');
const isRight = is('right');
const isUp = is('up');
const TransitionContainer = SpotlightContainerDecorator(
	{enterTo: 'default-element', preserveId: true},
	Transition
);

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

		closeButton: PropTypes.bool,
		css: PropTypes.object,
		noAnimation: PropTypes.bool,
		onClose: PropTypes.func,
		onHide: PropTypes.func,

		/**
		 * Called after the popup's "show" transition finishes.
		 *
		 * @type {Function}
		 * @public
		 */
		onShow: PropTypes.func,
		open: PropTypes.bool,

		/**
		 * Sets the position of the popup on the screen.
		 *
		 * @type {('center'|'top')}
		 * @default 'center'
		 * @public
		 */
		position: PropTypes.oneOf(['center', 'top']),

		skin: PropTypes.string,
		title: PropTypes.string
	},
	defaultProps: {
		centered: false,
		closeButton: false,
		noAnimation: false,
		open: false,
		position: 'center'
	},
	styles: {
		css: componentCss,
		className: 'popup'
	},
	computed: {
		className: ({centered, closeButton, position, styler, title}) => styler.append({top: position === 'top', withCloseButton: closeButton, withTitle: title, centered}),
		transitionType : ({position}) => position === 'center' ? 'fade' : 'slide',
		direction : ({position}) => position === 'center' ? 'down' : 'up'
	},
	render: ({buttons, children, closeButton, css, direction, noAnimation, onClose, onHide, open, skin, title, transitionType, ...rest}) => {
		const wideLayout = (skin === 'carbon');
		delete rest.centered;

		return (
			<TransitionContainer
				noAnimation={noAnimation}
				visible={open}
				direction={direction}
				duration="short"
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
