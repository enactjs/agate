import FloatingLayer from '@enact/ui/FloatingLayer';
import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import React from 'react';

const OpenState = {
	CLOSED: 0,
	OPENING: 1,
	OPEN: 2
};

const forwardClose = forward('onClose');
const forwardCloseButtonClick = forward('onCloseButtonClick');
const forwardHide = forward('onHide');

const PopupState = hoc((config, Wrapped) => {	// eslint-disable-line no-unused-vars
	return class extends React.Component {
		static displayName = 'PopupState'

		static propTypes = {
			noAnimation: PropTypes.bool,
			noAutoDismiss: PropTypes.bool,
			onClose: PropTypes.func,
			onCloseButtonClick: PropTypes.func,
			open: PropTypes.bool,
			scrimType: PropTypes.oneOf(['transparent', 'translucent', 'none'])
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
				popupOpen: this.props.open ? OpenState.OPEN : OpenState.CLOSED,
				prevOpen: this.props.open
			};
		}

		static getDerivedStateFromProps (props, state) {
			if (props.open !== state.prevOpen) {
				if (props.open) {
					return {
						popupOpen: props.noAnimation || state.floatLayerOpen ? OpenState.OPEN : OpenState.CLOSED,
						floatLayerOpen: true,
						prevOpen: props.open
					};
				} else {
					return {
						popupOpen: OpenState.CLOSED,
						floatLayerOpen: state.popupOpen !== OpenState.CLOSED ? !props.noAnimation : false,
						prevOpen: props.open
					};
				}
			}
			return null;
		}

		handleFloatingLayerOpen = () => {
			if (!this.props.noAnimation && this.state.popupOpen !== OpenState.OPEN) {
				this.setState({
					popupOpen: OpenState.OPENING
				});
			}
		}

		handleCloseButtonClick = () => {
			if (!this.props.onCloseButtonClick) {
				forwardClose(null, this.props);
			} else {
				forwardCloseButtonClick(null, this.props);
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
			delete rest.onCloseButtonClick;
			delete rest.spotlightRestrict;

			return (
				<FloatingLayer
					noAutoDismiss={noAutoDismiss}
					open={this.state.floatLayerOpen}
					onOpen={this.handleFloatingLayerOpen}
					onDismiss={onClose}
					scrimType={scrimType}
				>
					<Wrapped
						{...rest}
						open={this.state.popupOpen >= OpenState.OPENING}
						onClose={onClose}
						onCloseButtonClick={this.handleCloseButtonClick}
						onHide={this.handlePopupHide}
					/>
				</FloatingLayer>
			);
		}
	};
});

export default PopupState;
export {PopupState};
