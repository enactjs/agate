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
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';
import PropTypes from 'prop-types';

import Skinnable from '../Skinnable';
import PopupState from '../Popup/PopupState';

import componentCss from './Drawer.module.less';

/**
 * A drawer component, without behaviors.
 *
 * @class DrawerBase
 * @memberof agate/Drawer
 * @ui
 * @public
 */
const DrawerBase = kind({
	name: 'Drawer',

	propTypes: {
		css: PropTypes.object,
		footer: PropTypes.node,
		header: PropTypes.node,
		noAnimation: PropTypes.bool,
		// `onClose` is here for the future scenario where we'll want to have a local (to Drawer)
		// control that closes the Drawer; similar to how the old Moonstone Drawer worked with its
		// close-tab that was positioned on the edge of the drawer. This prop, the close icon below
		// and the .closeButton CSS in the LESS file all relate to this functionality.
		// onClose: PropTypes.func,
		onHide: PropTypes.func,
		open: PropTypes.bool
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

	render: ({footer, children, css, noAnimation, onHide, open, header, ...rest}) => {
		return (
			<Transition
				noAnimation={noAnimation}
				visible={open}
				direction="left"
				duration="short"
				type="slide"
				className={css.drawerTransitionContainer}
				onHide={onHide}
				css={css}
			>
				<Layout
					role="alert"
					{...rest}
				>
					{/* <Icon size="small" onClick={onClose} className={css.closeButton}>closex</Icon>*/}
					{header ? <Cell shrink className={css.header}>{header}</Cell> : null}
					<Cell className={css.content}>
						{children}
					</Cell>
					{footer ? <Cell shrink className={css.footer}>{footer}</Cell> : null}
				</Layout>
			</Transition>
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
