/**
 * A Popup menu component.
 *
 * @module agate/PopupMenu
 * @exports PopupMenu
 * @exports PopupMenuBase
 * @exports PopupMenuDecorator
 */

import kind from '@enact/core/kind';
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import $L from '../internal/$L';
import Skinnable from '../Skinnable';
import Heading from '../Heading';
import LabeledIconButton from '../LabeledIconButton';
import Scroller from '../Scroller';

import PopupState from '../Popup/PopupState';

import componentCss from './PopupMenu.module.less';
import SpotlightContainerDecorator from "../../enact/packages/spotlight/SpotlightContainerDecorator";

const TransitionContainer = SpotlightContainerDecorator(
	{enterTo: 'default-element', preserveId: true},
	Transition
);

/**
 * The base popup menu component.
 *
 * @class PopupMenuBase
 * @memberof agate/PopupMenu
 * @ui
 * @public
 */
const PopupMenuBase = kind({
	name: 'PopupMenu',
	propTypes: /** @lends agate/PopupMenu.PopupMenuBase.prototype */ {
		/**
		 * When true, popup displays a close button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		closeButton: PropTypes.bool,

		/**
		 * The label for the close button.
		 *
		 * @type {String}
		 * @public
		 */
		closeButtonLabel: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `popupMenu` - The root class name
		 * * `body` - Applied to the body content container
		 * * `popupTransitionContainer` - Applied to the PopupMenu's outermost container. Sizing can be
		 *                                applied here for percentage-of-screen values.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Disables transition animation.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Called when the popupMenu is closed.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Called after the popupMenu's "hide" transition finishes.
		 *
		 * @type {Function}
		 * @public
		 */
		onHide: PropTypes.func,

		/**
		 * Called after the popup's "show" transition finishes.
		 *
		 * @type {Function}
		 * @public
		 */
		onShow: PropTypes.func,

		/**
		 * Controls the visibility of the PopupMenu.
		 *
		 * By default, the PopupMenu and its contents are not rendered until `open`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * The layout orientation of the component.
		 *
		 * @type {('horizontal')}
		 * @default 'horizontal'
		 * @private
		 */
		orientation: PropTypes.oneOf(['horizontal']),

		/**
		 * The container id for {@link spotlight/Spotlight}.
		 *
		 * @type {String}
		 * @default null
		 * @public
		 */
		spotlightId: PropTypes.string,

		/**
		 * The primary text of the popupMenu.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string
	},

	defaultProps: {
		closeButton: false,
		closeButtonLabel: $L('Cancel'),
		noAnimation: false,
		open: false,
		orientation: 'horizontal'
	},

	styles: {
		css: componentCss,
		className: 'popupMenu',
		publicClassNames: true
	},

	computed: {
		className: ({orientation, styler}) => styler.append(orientation)
	},

	render: ({children, closeButton, closeButtonLabel, css, noAnimation, onClose, onHide, onShow, open, orientation, spotlightId, title, ...rest}) => {
		return (
			<TransitionContainer
				className={css.popupTransitionContainer}
				css={css}
				direction="down"
				duration="short"
				noAnimation={noAnimation}
				onHide={onHide}
				onShow={onShow}
				spotlightId={spotlightId}
				type="fade"
				visible={open}
			>
				<Layout orientation="vertical" align="center center" role="alert" {...rest}>
					<Cell className={css.popupMenuTitle} shrink>
						<Heading css={css} size="title">{title}</Heading>
					</Cell>
					<Cell shrink className={css.body} align="stretch">
						<Scroller direction={orientation} horizontalScrollbar="hidden" verticalScrollbar="hidden">
							{children}
							{closeButton ? <LabeledIconButton
								backgroundOpacity="lightOpaque"
								className={css.closeButton}
								css={css}
								icon="cancel"
								inline
								onClick={onClose}
								size="huge"
							>{closeButtonLabel}</LabeledIconButton> : null}
						</Scroller>
					</Cell>
				</Layout>
			</TransitionContainer>
		);
	}
});

/**
 * Applies Agate specific behaviors to [PopupMenuBase]{@link agate/PopupMenu.PopupMenuBase}.
 *
 * @hoc
 * @memberof agate/PopupMenu
 * @mixes ui/Slottable.Slottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const PopupMenuDecorator = compose(
	Slottable({slots: ['title']}),
	Skinnable({prop: 'skin'}),
	PopupState
);

/**
 * A stateful component that renders a popup menu.
 *
 * Usage:
 * ```
 * <PopupMenu open title="Title">
 *   Hello!
 * </PopupMenu>
 * ```
 *
 * @class PopupMenu
 * @memberof agate/PopupMenu
 * @extends agate/PopupMenu.PopupMenuBase
 * @mixes agate/PopupMenu.PopupMenuDecorator
 * @ui
 * @public
 */
const PopupMenu = PopupMenuDecorator(PopupMenuBase);

export default PopupMenu;
export {
	PopupMenu,
	PopupMenuBase,
	PopupMenuDecorator
};
