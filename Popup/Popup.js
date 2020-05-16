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

import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';

import Skinnable from '../Skinnable';
import Heading from '../Heading';
import Button from '../Button';

import PopupState from './PopupState';

import componentCss from './Popup.module.less';

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
		open: PropTypes.bool,
		skin: PropTypes.string,
		title: PropTypes.string
	},
	defaultProps: {
		centered: false,
		closeButton: false,
		noAnimation: false,
		open: false
	},
	styles: {
		css: componentCss,
		className: 'popup'
	},
	computed: {
		className: ({closeButton, title, styler, centered}) => styler.append({withCloseButton: closeButton, withTitle: title, centered})
	},
	render: ({buttons, children, closeButton, css, noAnimation, onClose, onHide, open, skin, title, ...rest}) => {
		const wideLayout = (skin === 'carbon');

		return (
			<Transition
				noAnimation={noAnimation}
				visible={open}
				direction="down"
				duration="short"
				type="fade"
				className={css.popupTransitionContainer}
				onHide={onHide}
				css={css}
			>
				<div
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
			</Transition>
		);
	}
});

/**
 * Applies Agate specific behaviors to [PopupBase]{@link agate/Popup.PopupBase}.
 *
 * @hoc
 * @memberof agate/Popup
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
