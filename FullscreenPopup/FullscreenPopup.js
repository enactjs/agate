import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Transition from '@enact/ui/Transition';

import PopupState from '../Popup/PopupState';
import Skinnable from '../Skinnable';

import componentCss from './FullscreenPopup.less';

const FullscreenPopupBase = kind({
	name: 'FullscreenPopup',
	propTypes: {
		css: PropTypes.object,
		noAnimation: PropTypes.bool,
		onHide: PropTypes.func,
		open: PropTypes.bool
	},
	defaultProps: {
		noAnimation: false,
		open: false
	},
	styles: {
		css: componentCss,
		className: 'fullscreenPopup'
	},
	computed: {
		className: ({styler}) => styler.append('enact-fit')
	},
	render: ({children, className, css, noAnimation, onHide, open, ...rest}) => {

		return (
			<Transition
				noAnimation={noAnimation}
				visible={open}
				direction="down"
				duration="short"
				type="slide"
				className={className}
				onHide={onHide}
				css={css}
			>
				<div
					{...rest}
				>
					{children}
				</div>
			</Transition>
		);
	}
});

const FullscreenPopupDecorator = compose(
	Skinnable({prop: 'skin'}),
	PopupState
);

const FullscreenPopup = FullscreenPopupDecorator(FullscreenPopupBase);

export default FullscreenPopup;
export {FullscreenPopup, FullscreenPopupBase};
