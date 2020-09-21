import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import React from 'react';

// Adds Agate-specific FanSpeedControl behaviors
const FanSpeedControlBehaviorDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'FanSpeedControlBehaviorDecorator';

		static propTypes = /** @lends agate/FanSpeedControl.FanSpeedControlBehaviorDecorator.prototype */ {
			/**
			 * Called when the path area is clicked.
			 *
			 * @type {Function}
			 * @param {Object} event
			 * @public
			 */
			onClick: PropTypes.func,

			/**
			 * Value of FanSpeedControl.
			 *
			 * @type {Number}
			 * @public
			 */
			value: PropTypes.number
		};

		constructor (props) {
			super(props);

			this.state = {
				currentValue: 4
			};
		}

		handleClick = (index) => () => {
			this.setState({
				currentValue: index + 1
			});
		}

		render () {
			return (
				<Wrapped
					{...this.props}
					onClick={this.handleClick}
					value={this.state.currentValue}
				/>
			);
		}
	};
});

export default FanSpeedControlBehaviorDecorator;
export {
	FanSpeedControlBehaviorDecorator
};
