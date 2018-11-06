import FloatingLayer from '@enact/ui/FloatingLayer';
import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import React from 'react';

const forwardHide = forward('onHide');

const PopupState = hoc((config, Wrapped) => {	// eslint-disable-line no-unused-vars
	return class extends React.Component {
		static displayName = 'PopupState'

		static propTypes = {
			noAnimation: PropTypes.bool,
			noAutoDismiss: PropTypes.bool,
			onClose: PropTypes.func,
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
					<Wrapped
						{...rest}
						open={this.state.popupOpen}
						onClose={onClose}
						onHide={this.handlePopupHide}
					/>
				</FloatingLayer>
			);
		}
	};
});

export default PopupState;
export {PopupState};
