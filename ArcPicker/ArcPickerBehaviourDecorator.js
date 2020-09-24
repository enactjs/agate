import hoc from '@enact/core/hoc';
import {validateRangeOnce} from '@enact/ui/internal/validators';
import PropTypes from 'prop-types';
import React from 'react';

const validateRange = validateRangeOnce((props) => props, {'component': 'ArcPickerBehaviorDecorator'});

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
			 * The maximum size of ArcPicker. The number of arc segments to be rendered.
			 *
			 * @type {Number}
			 * @public
			 */
			max: PropTypes.number,

			/**
			 * Called when the path area is clicked.
			 *
			 * @type {Function}
			 * @param {Object} event
			 * @public
			 */
			onClick: PropTypes.func,

			/**
			 * Called to set the value of ArcPicker.
			 *
			 * @type {Function}
			 * @public
			 */
			setValue: PropTypes.func,

			/**
			 * Value of ArcPicker.
			 *
			 * @type {Number|String}
			 * @public
			 */
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		};

		constructor (props) {
			super(props);

			this.state = {
				currentValue: props.value || props.options[0],
				max: props.max
			};
		}

		handleClick = (option) => () => {
			this.setState({
				currentValue: option
			}, () => {
				this.props.setValue(this.state.currentValue);
			});
		};

		render () {
			const {handleClick, props, state} = this;
			const {setValue, max} = props;
			const {currentValue} = state;

			if (__DEV__) {
				const valueProps = {value: currentValue, max};

				validateRange(valueProps);
			}

			return (
				<Wrapped
					{...props}
					onClick={handleClick}
					setValue={setValue}
					value={currentValue}
				/>
			);
		}
	};
});

export default ArcPickerBehaviorDecorator;
export {
	ArcPickerBehaviorDecorator
};
