import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Slottable from '@enact/ui/Slottable';
import Spottable from '@enact/spotlight/Spottable';
import Transition from '@enact/ui/Transition';

import Icon from '../Icon';
import Item from '../Item';
import PopupState from '../Popup/PopupState';
import Skinnable from '../Skinnable';

import css from './PopupNavigation.less';

// TODO: Apply spottable div
// const SpottableDiv = Spottable('div');

const PopupNavigationBase = kind({
	name: 'PopupNavigation',
	propTypes: {
		menuStrings: PropTypes.array,
		menuCallbacks: PropTypes.func,
		noAnimation: PropTypes.bool,
		onClose: PropTypes.func,
		onHide: PropTypes.func,
		open: PropTypes.bool
	},

	defaultProps: {
		noAnimation: false,
		open: false
	},

	handlers: {
		onClick: (index, {menuCallbacks}) => () => {
			menuCallbacks(index);
		}
	},

	styles: {
		css,
		className: 'popupNavigation'
	},

	computed: {
		className: ({menuStrings, styler}) => {
			return styler.append(menuStrings.length > 1 ? 'menu' + menuStrings.length : '');
		}
	},

	render: ({menuStrings, noAnimation, onClick, onClose, onHide, open, ...rest}) => {
		delete rest.menuCallbacks;

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
				<div {...rest}>
					{menuStrings.map((menu, index) => {
						return (
							<div
								className={css[`part${index}`]}
								onClick={onClick(index)}
							>
								<Item className={css[`menu${index}`]}>
									{menu}
								</Item>
							</div>
						);
					})}
					<Icon
						className={css.innerCircle}
						onClick={onClose}
					>
						closex
					</Icon>
				</div>
			</Transition>
		);
	}
});

const PopupNavigationDecorator = compose(
	Skinnable({prop: 'skin'}),
	PopupState
);

const PopupNavigation = PopupNavigationDecorator(PopupNavigationBase);

export default PopupNavigation;
