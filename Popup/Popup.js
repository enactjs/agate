import compose from 'ramda/src/compose';
import FloatingLayer from '@enact/ui/FloatingLayer';
import {forward} from '@enact/core/handle';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import React from 'react';
import Transition from '@enact/ui/Transition';

import Skinnable from '../Skinnable';

import componentCss from './Popup.less';
import {DividerBase, DividerDecorator} from "../Divider";

const forwardHide = forward('onHide');

const PopupBase = kind({
	name: 'Popup',
	propTypes: {
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
		className: 'popup'
	},
	render: ({children, css, noAnimation, onHide, open, ...rest}) => {
		delete rest.onCloseButtonClick;
		return (
			<Transition
				noAnimation={noAnimation}
				visible={open}
				direction="down"
				duration="short"
				type="fade"
				className={css.popupTransitionContainer}
				onHide={onHide}
			>
				<div
					{...rest}
				>
					<div className={css.body}>
						{children}
					</div>
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
	Skinnable
);

class PopupState extends React.Component {
	static propTypes = {
		noAnimation: PropTypes.bool,
		noAutoDismiss: PropTypes.bool,
		onClose: PropTypes.func,
		open: PropTypes.bool,
		scrimType: PropTypes.oneOf(['transparent', 'translucent', 'none']),
	}

	static defaultProps = {
		noAnimation: false,
		noAutoDismiss: false,
		open: false,
		scrimType: 'translucent'
	}

	constructor (props) {
		super(props);
		this.state = {
			floatLayerOpen: this.props.open,
			popupOpen: this.props.noAnimation
		};
	}

	componentWillReceiveProps (nextProps) {
		if (!this.props.open && nextProps.open) {
			this.setState({
				popupOpen: nextProps.noAnimation,
				floatLayerOpen: true
			});
		} else if (this.props.open && !nextProps.open) {
			this.setState({
				popupOpen: nextProps.noAnimation,
				floatLayerOpen: !nextProps.noAnimation
			});
		}
	}

	handleFloatingLayerOpen = () => {
		if (!this.props.noAnimation) {
			this.setState({
				popupOpen: true
			});
		}
	}


	handlePopupHide = () => {
		forwardHide(null, this.props);

		this.setState({
			floatLayerOpen: false,
			activator: null
		});
	}

	render () {
		const {noAutoDismiss, onClose, scrimType, ...rest} = this.props;
		delete rest.spotlightRestrict;

		return (
			<FloatingLayer
				noAutoDismiss={noAutoDismiss}
				open={this.state.floatLayerOpen}
				onOpen={this.handleFloatingLayerOpen}
				onDismiss={onClose}
				scrimType={scrimType}
			>
				<PopupBase
					{...rest}
					open={this.state.popupOpen}
					onHide={this.handlePopupHide}
				/>
			</FloatingLayer>
		);
	}
}

const Popup = PopupDecorator(PopupState);

export default Popup;
export {Popup, PopupBase};
