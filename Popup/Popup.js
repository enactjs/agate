import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Layout, {Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';

import Skinnable from '../Skinnable';
import Divider from '../Divider';
import Button from '../Button';

import PopupState from './PopupState';

import componentCss from './Popup.module.less';

const PopupBase = kind({
	name: 'Popup',
	propTypes: {
		closeButton: PropTypes.bool,
		css: PropTypes.object,
		noAnimation: PropTypes.bool,
		onCloseButtonClick: PropTypes.func,
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
		className: 'popup'
	},
	computed: {
		className: ({closeButton, title, styler}) => styler.append({withCloseButton: closeButton, withTitle: title})
	},
	render: ({buttons, children, closeButton, css, noAnimation, onCloseButtonClick, onHide, open, skin, title, ...rest}) => {
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
						small
						onTap={onCloseButtonClick}
						className={componentCss.closeButton}
					/> : null}
					{title ? <Divider className={css.title}>{title}</Divider> : null}
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
 * Applies Agate specific behaviors to [DividerBase]{@link agate/Divider.DividerBase}.
 *
 * @hoc
 * @memberof agate/Divider
 * @mixes agate/Skinnable.Skinnable
 * @public
 */

const PopupDecorator = compose(
	Slottable({slots: ['closeButton', 'title', 'buttons']}),
	Skinnable({prop: 'skin'}),
	PopupState
);

const Popup = PopupDecorator(PopupBase);

export default Popup;
export {Popup, PopupBase};
