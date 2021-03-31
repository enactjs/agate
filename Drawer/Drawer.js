/**
 * An Agate-themed drawer component.
 *
 * @module agate/Drawer
 * @exports Drawer
 * @exports DrawerBase
 * @exports DrawerDecorator
 */

import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';
import PropTypes from 'prop-types';

import Skinnable from '../Skinnable';
import PopupState from '../Popup/PopupState';

import componentCss from './Drawer.module.less';

const TransitionContainer = SpotlightContainerDecorator(
	{enterTo: 'default-element', preserveId: true},
	Transition
);

/**
 * A drawer component, without behaviors.
 *
 * @class DrawerBase
 * @memberof agate/Drawer
 * @extends ui/Transition.Transition
 * @ui
 * @public
 */
const DrawerBase = kind({
	name: 'Drawer',

	propTypes: /** @lends agate/Drawer.DrawerBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		* Components to be included under the primary content.
		*
		* @type {Node}
		* @public
		*/
		footer: PropTypes.node,

		/**
		 * Header for the drawer.
		 *
		 * @type {Node}
		 * @public
		 */
		header: PropTypes.node,

		/**
		 * Disables drawer transition animation.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		noAnimation: PropTypes.bool,

		// `onClose` is here for the future scenario where we'll want to have a local (to Drawer)
		// control that closes the Drawer; similar to how the old Moonstone Drawer worked with its
		// close-tab that was positioned on the edge of the drawer. This prop, the close icon below
		// and the .closeButton CSS in the LESS file all relate to this functionality.
		// /**
		//  * Called when the drawer is closed.
		//  *
		//  * @type {Function}
		//  * @public
		//  */
		// onClose: PropTypes.func,

		/**
		 * Called after the transition to hide the drawer has finished.
		 *
		 * @type {Function}
		 * @public
		 */
		onHide: PropTypes.func,

        /**
         * Called after the drawer's "show" transition finishes.
         *
         * @type {Function}
         * @public
         */
        onShow: PropTypes.func,

		/**
		 * Displays the drawer.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Orientation of the drawer.
		 *
		 * @type {('horizontal'|'vertical')}
		 * @default 'vertical'
		 * @private
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical'])

        /**
         * The container id for {@link spotlight/Spotlight}.
         *
         * @type {String}
         * @default null
         * @public
         */
        spotlightId: PropTypes.string,

        /**
         * Restricts or prioritizes spotlight navigation.
         *
         * Allowed values are:
         * * `'none'` - Spotlight can move freely within and beyond the drawer
         * * `'self-first'` - Spotlight should prefer components within the drawer over
         *   components beyond the drawer, or
         * * `'self-only'` - Spotlight can only be set within the drawer
         *
         * @type {('none'|'self-first'|'self-only')}
         * @default 'self-first'
         * @public
         */
        spotlightRestrict: PropTypes.oneOf(['none', 'self-first', 'self-only'])
    },

	defaultProps: {
		noAnimation: false,
		open: false,
		orientation: 'vertical'
	},

	styles: {
		css: componentCss,
		className: 'drawer'
	},

	render: ({children, css, footer, header, noAnimation, onHide, open, onShow, spotlightId, spotlightRestrict, ...rest}) => {
		return (
			<TransitionContainer
				className={css.drawerTransitionContainer}
				css={css}
				direction="left"
				duration="short"
				noAnimation={noAnimation}
				onHide={onHide}
				onShow={onShow}
				spotlightId={spotlightId}
				spotlightRestrict={spotlightRestrict}
				type="slide"
				visible={open}
			>
				<Layout
					{...rest}
					role="alert"
				>
					{/* <Icon size="small" onClick={onClose} className={css.closeButton}>closex</Icon>*/}
					{header ? <Cell className={css.header} shrink>{header}</Cell> : null}
					<Cell className={css.content}>
						{children}
					</Cell>
					{footer ? <Cell className={css.footer} shrink>{footer}</Cell> : null}
				</Layout>
			</TransitionContainer>
		);
	}
});

/**
 * Applies Agate specific behaviors to [DrawerBase]{@link agate/Drawer.DrawerBase}.
 *
 * @hoc
 * @memberof agate/Drawer
 * @mixes ui/Slottable.Slottable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const DrawerDecorator = compose(
	Slottable({slots: ['header', 'footer']}),
	Skinnable({prop: 'skin'}),
	PopupState
);

/**
 * A ready-to-use drawer component.
 *
 * Usage:
 * ```
 * <Drawer open>
 *   Hello Enact!
 * </Drawer>
 * ```
 *
 * @class Drawer
 * @memberof agate/Drawer
 * @extends agate/Drawer.DrawerBase
 * @mixes agate/Drawer.DrawerDecorator
 * @ui
 * @public
 */
const Drawer = DrawerDecorator(DrawerBase);

export default Drawer;
export {
	Drawer,
	DrawerBase,
	DrawerDecorator
};
