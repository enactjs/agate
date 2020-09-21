import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import React from 'react';

// Adds Agate-specific WindDirectionControl behaviors
const WindDirectionControlBehaviourDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'WindDirectionControlBehaviourDecorator';

		static propTypes = /** @lends agate/WindDirectionControl.WindDirectionBehaviorDecorator.prototype */ {
			/**
			 * State of WindDirectionControl.
			 *
			 * @type {('airDown'|'airRight'|'airUp')}
			 * @public
			 */
			airDirection: PropTypes.oneOf(['airDown', 'airRight', 'airUp']),

			/**
			 * Called when the path area is clicked.
			 *
			 * @type {Function}
			 * @param {Object} event
			 * @public
			 */
			onClick: PropTypes.func
		};

		constructor (props) {
			super(props);

			this.state = {
				currentAirDirection: 'airDown'
			};
		}

		handleClick = (option) => () => {
			this.setState({
				currentAirDirection: option
			});
		};

		render () {
			const props = Object.assign({}, this.props);

			return (
				<Wrapped
					{...props}
					airDirection={this.state.currentAirDirection}
					onClick={this.handleClick}
				/>
			);
		}
	};
});

export default WindDirectionControlBehaviourDecorator;
export {
	WindDirectionControlBehaviourDecorator
};
