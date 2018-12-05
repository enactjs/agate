import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';

import Skinnable from '../Skinnable';
// import Icon from '../Icon';

import PopupState from '../Popup/PopupState';

import componentCss from './Drawer.less';

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
					{...rest}
				>
					{/* <Icon small onClick={onClose} className={css.closeButton}>closex</Icon>*/}
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
 * Applies Agate specific behaviors to [DividerBase]{@link agate/Divider.DividerBase}.
 *
 * @hoc
 * @memberof agate/Divider
 * @mixes agate/Skinnable.Skinnable
 * @public
 */

const DrawerDecorator = compose(
	Slottable({slots: ['header', 'footer']}),
	Skinnable({prop: 'skin'}),
	PopupState
);

const Drawer = DrawerDecorator(DrawerBase);

export default Drawer;
export {Drawer, DrawerBase};
