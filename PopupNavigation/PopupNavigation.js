import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Slottable from '@enact/ui/Slottable';
import Transition from '@enact/ui/Transition';

import Button from '../Button';
import PopupState from '../Popup/PopupState';
import Skinnable from '../Skinnable';

import css from './PopupNavigation.less';

const PopupNavigationBase = kind({
	name: 'PopupNavigation',
	propTypes: {
		buttons: PropTypes.oneOfType([
			PropTypes.element,
			PropTypes.arrayOf(PropTypes.element)
		]).isRequired,
		noAnimation: PropTypes.bool,
		onClose: PropTypes.func,
		onHide: PropTypes.func,
		open: PropTypes.bool
	},

	defaultProps: {
		noAnimation: false,
		open: false
	},

	styles: {
		css,
		className: 'popupNavigation'
	},

	computed: {
		className: ({buttons, styler}) => {
			return styler.append(buttons.length > 1 ? 'menu' + buttons.length : '');
		}
	},

	render: ({buttons, noAnimation, onClose, onHide, open, ...rest}) => {
		return (
			<Transition
				noAnimation={noAnimation}
				visible={open}
				direction="down"
				duration="short"
				type="fade"
				onHide={onHide}
				className={css.popupTransitionContainer}
				css={css}
			>
				<div
					{...rest}
				>
					<Button
						icon="closex"
						small
						onTap={onClose}
						className={css.closeButton}
					/>
					<div className={css.body}>
						<div className={css.buttons}>
							{buttons}
						</div>
					</div>
				</div>
			</Transition>
		);
	}
});

const PopupNavigationDecorator = compose(
	Slottable({slots: ['buttons']}),
	Skinnable({prop: 'skin'}),
	PopupState
);

const PopupNavigation = PopupNavigationDecorator(PopupNavigationBase);

export default PopupNavigation;
