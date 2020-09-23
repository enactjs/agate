import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import React from 'react';

// Adds Agate-specific ArcPicker behaviors
const ArcPickerBehaviorDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'ArcPickerBehaviorDecorator';

		static propTypes = /** @lends agate/ArcPicker.ArcPickerBehaviorDecorator.prototype */ {
			/**
			 * The value options of ArcPicker.
			 *
			 * @type {Array}
			 * @public
			 */
			options: PropTypes.array.isRequired,

			/**
			 * Called when the path area is clicked.
			 *
			 * @type {Function}
			 * @param {Object} event
			 * @public
			 */
			onClick: PropTypes.func,

			/**
			 * Value of ArcPicker.
			 *
			 * @type {Number}
			 * @public
			 */
			value: PropTypes.number
		};

		constructor (props) {
			super(props);

			this.state = {
				currentValue: props.options[0]
			};
		}

		handleClick = (option) => () => {
			this.setState({
				currentValue: option
			});
		};

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

export default ArcPickerBehaviorDecorator;
export {
	ArcPickerBehaviorDecorator
};
