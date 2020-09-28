import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {validateRangeOnce} from '@enact/ui/internal/validators';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

const validateRange = validateRangeOnce((props) => props, {'component': 'ArcPickerBehaviorDecorator'});

/**
 * Adds Agate-specific ArcPicker behaviors.
 *
 * @class ArcPickerBehaviorDecorator
 * @memberof agate/ArcPicker
 * @hoc
 * @public
 */
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
			values: PropTypes.array.isRequired,

			/**
			 * The maximum value of ArcPicker.
			 *
			 * @type {Number}
			 * @public
			 */
			max: PropTypes.number,

			/**
			 * The min value of ArcPicker.
			 *
			 * @type {Number}
			 * @public
			 */
			min: PropTypes.number,

			/**
			 * Called when value is changed.
			 *
			 * @type {Function}
			 * @public
			 */
			onChange: PropTypes.func,

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
				currentValue: props.value || props.values[0]
			};
		}

		handleClick = (value) => (ev) => {
			this.setState({
				currentValue: value
			}, () => {
				forward('onChange', {value: this.state.currentValue}, this.props);
			});

			ev.stopPropagation();
		};

		render () {
			const {handleClick, props, state} = this;
			const {max, min, onChange} = props;
			const {currentValue} = state;

			if (__DEV__) {
				const valueProps = {value: currentValue, max, min};

				validateRange(valueProps);
			}

			return (
				<Wrapped
					{...props}
					onChange={onChange}
					onClick={handleClick}
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
