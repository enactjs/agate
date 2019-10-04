import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';

import Skinnable from '../Skinnable';
import Heading from '../Heading';
import LabeledIconButton from '../LabeledIconButton';

import PopupState from '../Popup/PopupState';

import componentCss from './PopupMenu.module.less';

const PopupMenuBase = kind({
	name: 'PopupMenu',
	propTypes: {
		closeButton: PropTypes.bool,
		css: PropTypes.object,
		noAnimation: PropTypes.bool,
		onClose: PropTypes.func,
		onHide: PropTypes.func,
		open: PropTypes.bool,
		title: PropTypes.string
	},

	defaultProps: {
		noAnimation: false,
		closeButton: false,
		open: false
	},

	styles: {
		css: componentCss,
		className: 'popupMenu'
	},

	render: ({children, closeButton, css, noAnimation, onClose, onHide, open, title, ...rest}) => {
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
				<Layout orientation="vertical" align="center center" {...rest}>
					<Cell className={css.title} shrink>
						<Heading size="title">{title}</Heading>
					</Cell>
					<Cell className={css.body} shrink>
						{children}
						{closeButton ? <LabeledIconButton
							inline
							icon="cancel"
							onClick={onClose}
							className={css.closeButton}
							size="huge"
						>cancel</LabeledIconButton> : null}
					</Cell>
				</Layout>
			</Transition>
		);
	}
});

/**
 * Applies Agate specific behaviors to [PopupMenuBase]{@link agate/PopupMenu.PopupMenuBase}.
 *
 * @hoc
 * @memberof agate/PopupMenu
 * @mixes agate/Skinnable.Skinnable
 * @public
 */

const PopupMenuDecorator = compose(
	Slottable({slots: ['title']}),
	Skinnable({prop: 'skin'}),
	PopupState
);

const PopupMenu = PopupMenuDecorator(PopupMenuBase);

export default PopupMenu;
export {PopupMenu, PopupMenuBase};
