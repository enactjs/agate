import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Slottable from '@enact/ui/Slottable';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator, {spotlightDefaultClass} from '@enact/spotlight/SpotlightContainerDecorator';
import Spottable from '@enact/spotlight/Spottable';
import Transition from '@enact/ui/Transition';

import IconButton from '../IconButton';
import Item from '../Item';
import PopupState from '../Popup/PopupState';
import Skinnable from '../Skinnable';

import css from './PopupNavigation.less';

// TODO: Apply spottable div
const SpottableDiv = Spottable('div');

const PopupNavigationBase = kind({
	name: 'PopupNavigation',
	propTypes: {
		menuCallbacks: PropTypes.func,
		menuStrings: PropTypes.array,
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
		},
		spotOnRender: (node) => {
			console.dir(node);
			Spotlight.focus(node.props);
			// console.dir(this.querySelector(`.${css.innerCircle}`));
			// if (node) {
				// const {spotlightId} = node.dataset;
				// const config = {
				// 	enterTo: 'last-focused'
				// };

				// if (autoFocus !== 'last-focused') {
				// 	config.enterTo = 'default-element';

				// 	if (autoFocus !== 'default-element') {
				// 		config.defaultElement = autoFocus;
				// 	}
				// }

				// Spotlight.set(spotlightId, config);
				// Spotlight.focus(spotlightId);
			// }
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

	render: ({menuStrings, noAnimation, onClick, onClose, onHide, open, spotOnRender, styler, ...rest}) => {
		delete rest.menuCallbacks;

		return (
			<Transition
				noAnimation={noAnimation}
				visible={open}
				direction="down"
				duration="short"
				type="fade"
				onHide={onHide}
			>
				<div {...rest}>
					{menuStrings.map((menu, index) => {
						return (
							<SpottableDiv
								className={styler.join(css.part, `part${index}`)}
								key={index}
								onClick={onClick(index)}
							>
								<div className={css.menu}>
									{menu}
								</div>
							</SpottableDiv>
						);
					})}
					<IconButton
						className={css.innerCircle}
						onClick={onClose}
						ref={spotOnRender}
					>
						closex
					</IconButton>
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
